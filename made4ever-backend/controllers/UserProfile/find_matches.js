const UserProfile = require("../../models/AddProfile/add_new_profile");

// Convert height "5'6" → inches
const heightToInches = (h) => {
  if (!h) return 0;
  const [feet, inches] = h.split("'").map(Number);
  return feet * 12 + (inches || 0);
};

// Calculate match score for one direction (A → B OR B → A)
const calculateMatchScore = (prefs, person) => {
  if (!prefs) return 0;

  let score = 0;
  let total = 0;

  // --- AGE ---
  if (prefs?.AgeRange?.MinAge && prefs?.AgeRange?.MaxAge) {
    total++;
    if (
      person.PersonalDetails?.Age >= prefs.AgeRange.MinAge &&
      person.PersonalDetails?.Age <= prefs.AgeRange.MaxAge
    ) score++;
  }

  // --- HEIGHT ---
  if (prefs?.HeightRange?.MinHeight && prefs?.HeightRange?.MaxHeight) {
    total++;
    const pH = heightToInches(person.PersonalDetails?.Height);
    const minH = heightToInches(prefs.HeightRange.MinHeight);
    const maxH = heightToInches(prefs.HeightRange.MaxHeight);
    if (pH >= minH && pH <= maxH) score++;
  }

  // --- SIMPLE STRING FIELDS ---
  const stringMatches = [
    ["MaritialStatus", "PersonalDetails.MaritalStatus"],
    ["NonVeg", "PersonalDetails.NonVeg"],
    ["Manglik", "PersonalDetails.Manglik"],
    ["Nri", "PersonalDetails.Nri"],
    ["Community", "ReligiousDetails.Community"],
    ["Religion", "ReligiousDetails.Religion"],
    ["AnnualFamilyIncome", "EducationDetails.AnnualFamilyIncome"],
    ["PersonalIncome", "EducationDetails.PersonalIncome"],
    
  ];

  stringMatches.forEach(([prefField, path]) => {
    const value = path.split(".").reduce((o, k) => o?.[k], person);
    if (prefs[prefField]) {
      total++;
      if (value === prefs[prefField]) score++;
    }
  });

  // --- ARRAY FIELDS ---
  const arrayMatches = [
    ["HeighstEducation", "EducationDetails.HighestEducation"],
    ["Occupation", "EducationDetails.Occupation"],
    ["Country", "ContactDetails.Country"],
    ["State", "ContactDetails.State"],
    ["City", "ContactDetails.City"],
    ["PropertySize", "PropertyDetails.PropertySize"],
    ["Caste", "ReligiousDetails.Caste"],
    ["Gothram", "ReligiousDetails.Gothram"],
    ["MotherTongue", "PersonalDetails.MotherTongue"],
  ];

  arrayMatches.forEach(([prefField, path]) => {
    const value = path.split(".").reduce((o, k) => o?.[k], person);
    if (Array.isArray(prefs[prefField]) && prefs[prefField].length > 0) {
      total++;
      if (prefs[prefField].includes(value)) score++;
    }
  });

  return total > 0 ? Math.round((score / total) * 100) : 0;
};

// ----------------- MAIN MATCHING FUNCTION -----------------

const matchCache = new Map();

const findMatches = async (req, res) => {
  try {
    const id = req.query.uniqueId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "uniqueId is required",
      });
    }

    const userPrefs = req.body.PartnerPrefrences;
    const userGender = userPrefs?.Gender;

    if (!userGender) {
      return res.status(400).json({
        success: false,
        message: "User gender missing",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // =========================
    // CHECK CACHE FIRST
    // =========================
    let matches = matchCache.get(id);

    if (!matches) {
      const oppositeGender = userGender === "Male" ? "Female" : "Male";

      // Fetch candidates only once
      const candidates = await UserProfile.find({
        "PersonalDetails.Gender": oppositeGender,
        IsActive: true,
      })
        .populate("Bureau")
        .lean();

      // Calculate scores
      matches = candidates.map((candidate) => {
        const score = Number(calculateMatchScore(userPrefs, candidate)) || 0;

        return {
          candidateId: candidate,
          matchFromUserSide: score,
          matchPercentage: score,
        };
      });

      // Filter (>= 50%)
      matches = matches.filter((m) => m.matchPercentage >= 90);

      // Sort descending
      matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

      // Store in cache using uniqueId
      matchCache.set(id, matches);

      // Optional: auto-expire cache after 30 min
      setTimeout(() => matchCache.delete(id), 30 * 60 * 1000);
    }

    // =========================
    // PAGINATION (FROM CACHE)
    // =========================
    const total = matches.length;
    const startIndex = (page - 1) * limit;
    const paginatedMatches = matches.slice(startIndex, startIndex + limit);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalMatches: total,
      totalPages: Math.ceil(total / limit),
      matches: paginatedMatches,
    });

  } catch (err) {
    console.error("❌ Matchmaking error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { findMatches };
