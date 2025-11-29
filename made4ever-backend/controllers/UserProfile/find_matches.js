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
    ["Caste", "ReligiousDetails.Caste"],
    ["MotherTongue", "PersonalDetails.MotherTongue"],
    ["AnnualFamilyIncome", "EducationDetails.AnnualFamilyIncome"],
    ["PersonalIncome", "EducationDetails.PersonalIncome"],
    ["PropertySize", "PropertyDetails.PropertySize"],
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

const findMatches = async (req, res) => {
  try {

    const userPrefs = req.body.PartnerPrefrences;
    const userGender = req.body.PartnerPrefrences?.Gender;
    const userGothra = req.body.PartnerPrefrences?.Gothra;

    if (!userGender)
      return res.status(400).json({ success: false, message: "User gender missing" });

    const oppositeGender = userGender === "Male" ? "Female" : "Male";

    // Fetch candidates of opposite gender
    const candidates = await UserProfile.find({
      "PersonalDetails.Gender": oppositeGender,
      IsActive:true
    })
      .populate("Bureau")
      .lean();
      

    // Loop through candidates
    const matches = candidates.map((candidate) => {
 
      // One-way match (User → Candidate)
      const userToCandidate = calculateMatchScore(userPrefs, candidate);
    
      return {
        candidateId: candidate,
        matchFromUserSide: userToCandidate,
        matchPercentage:userToCandidate,
      };
    });

    // Sort by mutual match (highest first)
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return res.status(200).json({
      success: true,
      totalMatches: matches.length,
      matches,
    });
  } catch (err) {
    console.error("❌ Matchmaking error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { findMatches };
