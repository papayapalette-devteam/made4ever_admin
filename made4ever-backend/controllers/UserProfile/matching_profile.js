


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
      Bureau: { $ne: null }
      // "ReligiousDetails.Gothram": { $ne: userGothram }
    });



    // ✅ PAGINATED QUERY
    const candidates = await UserProfile.find({
      "PersonalDetails.Gender": oppositeGender,
      IsActive: true,
      Bureau: { $ne: null }
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
  .filter(match => match.matchPercentage > 0);

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





// async function deleteUsersWithNullBureau() {
//   try {
//     // Find users with Bureau null
//     const usersToDelete = await UserProfile.find({
//       Bureau: { $in: [null, undefined] } // matches null or undefined
//     }).lean();

//     if (usersToDelete.length === 0) {
//       console.log("No users with null Bureau found.");
//       return;
//     }

//     // Delete them
//     const result = await UserProfile.deleteMany({
//       _id: { $in: usersToDelete.map(u => u._id) }
//     });

//     console.log(`${result.deletedCount} users deleted whose Bureau was null.`);
//   } catch (error) {
//     console.error("Error deleting users:", error);
//   }
// }

// // Usage
// deleteUsersWithNullBureau();
