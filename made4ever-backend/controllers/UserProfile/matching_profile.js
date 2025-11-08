const UserProfile = require("../../models/AddProfile/add_new_profile");

const getMatches = async (req, res) => {
  try {
    const { userId } = req.params;
 
    if (!userId)
      return res.status(400).json({ success: false, message: "User ID required" });

    // 1️⃣ Fetch current user
    const user = await UserProfile.findById(userId)
    .populate("Bureau")
    .lean();

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const userPrefs = user.PartnerPrefrences || {};
    const userGender = user.PersonalDetails?.Gender;
    
    if (!userGender)
      return res.status(400).json({ success: false, message: "User gender missing" });

    const oppositeGender = userGender === "Male" ? "Female" : "Male";

    // 2️⃣ Fetch all opposite gender candidates (using .lean() for speed)
    const candidates = await UserProfile.find(
      { "PersonalDetails.Gender": oppositeGender }
    )
    .populate("Bureau")
    .lean();


    // 3️⃣ Helper: Convert height "5'6" to inches
    const heightToInches = (h) => {
      if (!h) return 0;
      const [feet, inches] = h.split("'").map(Number);
      return feet * 12 + (inches || 0);
    };

    // 4️⃣ Loop through all candidates
    const matches = candidates.map((candidate) => {
      let score = 0;
      let total = 0;

      // --- Age ---
      if (userPrefs?.AgeRange?.MinAge && userPrefs?.AgeRange?.MaxAge) {
        total++;
        const age = candidate.PersonalDetails?.Age;
        if (age >= userPrefs.AgeRange.MinAge && age <= userPrefs.AgeRange.MaxAge) score++;
      }

      // --- Height ---
      if (userPrefs?.HeightRange?.MinHeight && userPrefs?.HeightRange?.MaxHeight) {
        total++;
        const candH = heightToInches(candidate.PersonalDetails?.Height);
        const minH = heightToInches(userPrefs.HeightRange.MinHeight);
        const maxH = heightToInches(userPrefs.HeightRange.MaxHeight);
        if (candH >= minH && candH <= maxH) score++;
      }

      // --- Simple string fields ---
      const stringMatches = [
        ["MaritialStatus", "PersonalDetails.MaritalStatus"],
        ["NonVeg", "PersonalDetails.NonVeg"],
        ["Manglik", "PersonalDetails.Manglik"],
        ["Nri", "PersonalDetails.Nri"],
        ["Community", "ReligiousDetails.Community"],
        ["Religion", "ReligiousDetails.Religion"],
        ["Caste", "ReligiousDetails.Caste"],
        ["MotherTongue", "PersonalDetails.MotherTongue"],
      ];

      stringMatches.forEach(([prefField, path]) => {
        const value = path.split(".").reduce((o, k) => o?.[k], candidate);
        if (userPrefs[prefField]) {
          total++;
          if (value === userPrefs[prefField]) score++;
        }
      });

      // --- Array fields ---
      const arrayMatches = [
        ["HeighstEducation", "EducationDetails.HighestEducation"],
        ["Occupation", "EducationDetails.Occupation"],
        ["Country", "ContactDetails.Country"],
        ["State", "ContactDetails.State"],
        ["City", "ContactDetails.City"],
      ];

      arrayMatches.forEach(([prefField, path]) => {
        const value = path.split(".").reduce((o, k) => o?.[k], candidate);
        if (Array.isArray(userPrefs[prefField]) && userPrefs[prefField].length > 0) {
          total++;
          if (userPrefs[prefField].includes(value)) score++;
        }
      });

      // ✅ Calculate percentage
      const matchPercentage = total > 0 ? Math.round((score / total) * 100) : 0;

      return {
        candidateId: candidate,
        userprofile:user,
        // name: candidate.PersonalDetails?.Name,
        // age: candidate.PersonalDetails?.Age,
        // city: candidate.ContactDetails?.City,
        // religion: candidate.ReligiousDetails?.Religion,
        // caste: candidate.ReligiousDetails?.Caste,
        matchPercentage,
      };
    });

    // 5️⃣ Sort and respond
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

module.exports = { getMatches };
