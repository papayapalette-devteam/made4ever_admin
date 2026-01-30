// const UserProfile = require("../../models/AddProfile/add_new_profile");

// const getMatches = async (req, res) => {
//   try {
//     const { userId } = req.params;
 
//     if (!userId)
//       return res.status(400).json({ success: false, message: "User ID required" });

//     // 1️⃣ Fetch current user
//     const user = await UserProfile.findById(userId)
//     .populate("Bureau")
//     .lean();

//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const userPrefs = user.PartnerPrefrences || {};
//     const userGender = user.PersonalDetails?.Gender;
    
//     if (!userGender)
//       return res.status(400).json({ success: false, message: "User gender missing" });

//     const oppositeGender = userGender === "Male" ? "Female" : "Male";

//     // 2️⃣ Fetch all opposite gender candidates (using .lean() for speed)
//     const candidates = await UserProfile.find(
//       { "PersonalDetails.Gender": oppositeGender }
//     )
//     .populate("Bureau")
//     .lean();


//     // 3️⃣ Helper: Convert height "5'6" to inches
//     const heightToInches = (h) => {
//       if (!h) return 0;
//       const [feet, inches] = h.split("'").map(Number);
//       return feet * 12 + (inches || 0);
//     };

//     // 4️⃣ Loop through all candidates
//     const matches = candidates.map((candidate) => {
//       let score = 0;
//       let total = 0;

//       // --- Age ---
//       if (userPrefs?.AgeRange?.MinAge && userPrefs?.AgeRange?.MaxAge) {
//         total++;
//         const age = candidate.PersonalDetails?.Age;
//         if (age >= userPrefs.AgeRange.MinAge && age <= userPrefs.AgeRange.MaxAge) score++;
//       }

//       // --- Height ---
//       if (userPrefs?.HeightRange?.MinHeight && userPrefs?.HeightRange?.MaxHeight) {
//         total++;
//         const candH = heightToInches(candidate.PersonalDetails?.Height);
//         const minH = heightToInches(userPrefs.HeightRange.MinHeight);
//         const maxH = heightToInches(userPrefs.HeightRange.MaxHeight);
//         if (candH >= minH && candH <= maxH) score++;
//       }

//       // --- Simple string fields ---
//       const stringMatches = [
//         ["MaritialStatus", "PersonalDetails.MaritalStatus"],
//         ["NonVeg", "PersonalDetails.NonVeg"],
//         ["Manglik", "PersonalDetails.Manglik"],
//         ["Nri", "PersonalDetails.Nri"],
//         ["Community", "ReligiousDetails.Community"],
//         ["Religion", "ReligiousDetails.Religion"],
//         ["Caste", "ReligiousDetails.Caste"],
//         ["MotherTongue", "PersonalDetails.MotherTongue"],
//       ];

//       stringMatches.forEach(([prefField, path]) => {
//         const value = path.split(".").reduce((o, k) => o?.[k], candidate);
//         if (userPrefs[prefField]) {
//           total++;
//           if (value === userPrefs[prefField]) score++;
//         }
//       });

//       // --- Array fields ---
//       const arrayMatches = [
//         ["HeighstEducation", "EducationDetails.HighestEducation"],
//         ["Occupation", "EducationDetails.Occupation"],
//         ["Country", "ContactDetails.Country"],
//         ["State", "ContactDetails.State"],
//         ["City", "ContactDetails.City"],
//       ];

//       arrayMatches.forEach(([prefField, path]) => {
//         const value = path.split(".").reduce((o, k) => o?.[k], candidate);
//         if (Array.isArray(userPrefs[prefField]) && userPrefs[prefField].length > 0) {
//           total++;
//           if (userPrefs[prefField].includes(value)) score++;
//         }
//       });

//       // ✅ Calculate percentage
//       const matchPercentage = total > 0 ? Math.round((score / total) * 100) : 0;

//       return {
//         candidateId: candidate,
//         userprofile:user,
//         // name: candidate.PersonalDetails?.Name,
//         // age: candidate.PersonalDetails?.Age,
//         // city: candidate.ContactDetails?.City,
//         // religion: candidate.ReligiousDetails?.Religion,
//         // caste: candidate.ReligiousDetails?.Caste,
//         matchPercentage,
//       };
//     });

//     // 5️⃣ Sort and respond
//     matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

//     return res.status(200).json({
//       success: true,
//       totalMatches: matches.length,
//       matches,
//     });
//   } catch (err) {
//     console.error("❌ Matchmaking error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { getMatches };


const UserProfile = require("../../models/AddProfile/add_new_profile");
const msp_data = require("../../models/Msp/msp");

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

const getMatches = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const bureau = req.query.bureau;



// Fetch MSP (Bureau)
let msp = null;
if (bureau) {
  msp = await msp_data.findById(bureau);
  

  if (!msp) {
    return res.status(404).json({
      success: false,
      message: "Bureau not found",
    });
  }

  // ❌ BLOCK MATCHES IF CREDITS < 5
  if (msp.credits < 5) {
    return res.status(400).json({
      success: true,
      matches: [],
      totalMatches: 0,
      message: "Insufficient credits to view matches",
      remainingCredits: msp.credits,
    });
  }
}



    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    const user = await UserProfile.findById(userId)
      .populate("Bureau")
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userGender = user.PersonalDetails?.Gender;
    if (!userGender) {
      return res.status(400).json({ success: false, message: "User gender missing" });
    }

    //  const userGothram = user?.ReligiousDetails?.Gothram;
    // if (!userGothram) {
    //   return res.status(400).json({ success: false, message: "User gothram missing" });
    // }

    const oppositeGender = userGender === "Male" ? "Female" : "Male";


    // ✅ TOTAL COUNT (for pagination)
    const totalCandidates = await UserProfile.countDocuments({
      "PersonalDetails.Gender": oppositeGender,
      IsActive: true,
      // "ReligiousDetails.Gothram": { $ne: userGothram }
    });

    // ✅ PAGINATED QUERY
    const candidates = await UserProfile.find({
      "PersonalDetails.Gender": oppositeGender,
      IsActive: true,
    })
      .populate("Bureau")
      .skip(skip)
      .limit(limit)
      .lean();

    const matches = candidates.map((candidate) => {
      const userToCandidate = calculateMatchScore(
        user.PartnerPrefrences,
        candidate
      );

      const candidateToUser = calculateMatchScore(
        candidate.PartnerPrefrences || {},
        user
      );

      return {
        candidateId: candidate,
        userprofile: user,
        matchPercentage: Math.round(
          (userToCandidate + candidateToUser) / 2
        ),
      };
    }) // ✅ FILTER MATCHES > 50%
  .filter(match => match.matchPercentage > 80);

    // sort only current page
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    const highMatchFound = matches.some(
  (m) => m.matchPercentage >= 80
);

if (msp && highMatchFound) {
  msp.credits -= 5;
  await msp.save();
}


    return res.status(200).json({
      success: true,
      page,
      limit,
      totalMatches: totalCandidates,
      totalPages: Math.ceil(totalCandidates / limit),
      matches,
    });
  } catch (err) {
    console.error("❌ Matchmaking error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = { getMatches };
