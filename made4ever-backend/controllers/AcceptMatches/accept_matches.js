const AcceptProfile = require("../../models/AcceptMatches/accept_matches");
const UserProfile = require("../../models/AddProfile/add_new_profile");
const MSP = require("../../models/Msp/msp");
const axios =require('axios')

// 🟩 Save accepted profile (male/female logic)
exports.saveAcceptedProfile = async (req, res) => {
  try {
    const { candidateId, userId,MatchingPercentage,Status,MatchedBy } = req.body;

    if (!candidateId || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const candidate = await UserProfile.findById(candidateId);
    const user = await UserProfile.findById(userId);

    const candidate_bureau = candidate.Bureau;
    const user_bureau = user.Bureau;

    const candidate_bureau_details = await MSP.findById(candidate_bureau);
    const user_bureau_details = await MSP.findById(user_bureau);

   // Extract bureau names + phone numbers
const candidateBureauName = candidate_bureau_details.name;
const candidateBureauPhone = candidate_bureau_details.mobile_number;

const userBureauName = user_bureau_details.name;
const userBureauPhone = user_bureau_details.mobile_number;



    if (!candidate || !user) {
      return res.status(404).json({ success: false, message: "User or candidate not found" });
    }

    let maleProfileId, femaleProfileId;

    // 🧠 gender-based assignment
    if (user.PersonalDetails.Gender === "Male" && candidate.PersonalDetails.Gender === "Female") {
      maleProfileId = user._id;
      femaleProfileId = candidate._id;
    } else if (user.PersonalDetails.Gender === "Female" && candidate.PersonalDetails.Gender === "Male") {
      maleProfileId = candidate._id;
      femaleProfileId = user._id;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid gender combination for matching",
      });
    }

    // check if already exists
    const existing = await AcceptProfile.findOne({
      MaleProfile: maleProfileId,
      FemaleProfile: femaleProfileId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This match is already accepted",
      });
    }

    // save new match
    const newMatch = await AcceptProfile.create({
      MaleProfile: maleProfileId,
      FemaleProfile: femaleProfileId,
      MatchingPercentage,
      Status,
      MatchedBy
    });

const profileUrl="https://made4ever.in"

// Template payload generator
const getPayload = (receiverPhone, bureauName, bureauPhone) => ({
  to: `91${String(receiverPhone)}`,
  phoneNoId: "820798087793506",
  type: "template",
  name: "utility_tem",
  language: "en",
  bodyParams: [
    String(user.PersonalDetails.Name || ""),
    String(candidate.PersonalDetails.Name || ""),
    String(bureauName || ""),
    String(bureauPhone || "")
  ]
});



  // const payload1=getPayload(candidateBureauPhone, candidateBureauName, candidateBureauPhone)
  // const payload2=getPayload(userBureauPhone, userBureauName, userBureauPhone)
  // console.log(payload1);
  //  console.log(payload2);
  //    console.log(candidate_bureau);
  //  console.log(user_bureau);
  

// WhatsApp API Headers
const headers = {
  Authorization: `Bearer 9b758ea897b12e21785b50bd4e54a58f541ce7030d443c96cb21975b00a14e06`,
  "Content-Type": "application/json",
};
   
    
        // 🟢 Send to candidate bureau
const resp=await axios.post(
  "https://app.veblika.com/api/v2/whatsapp-business/messages",
  getPayload(candidateBureauPhone, userBureauName, userBureauPhone),
  { headers }
);
// console.log(resp);



// 🟡 If both bureaus are different → send message to user bureau

  // await axios.post(
  //   "https://app.veblika.com/api/v2/whatsapp-business/messages",
  //   getPayload(userBureauPhone, userBureauName, userBureauPhone),
  //   { headers }
  // );



    return res.status(200).json({
      success: true,
      message: "Profile accepted successfully",
      data: newMatch,
    });
  } catch (error) {
    console.error("Error saving accepted profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🟦 Get all accepted profiles (with populated data)
// exports.getAcceptedProfiles = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const pageNumber = parseInt(page);
//     const limitNumber = parseInt(limit);

//     const skip = (pageNumber - 1) * limitNumber;

//     // Get total count
//     const total = await AcceptProfile.countDocuments();

//     // Fetch paginated data
//     const profiles = await AcceptProfile.find()
//       .populate("MaleProfile")
//       .populate("FemaleProfile")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limitNumber)
//       .lean(); // 🔥 faster

//     res.status(200).json({
//       success: true,
//       total,
//       page: pageNumber,
//       limit: limitNumber,
//       totalPages: Math.ceil(total / limitNumber),
//       data: profiles,
//     });

//   } catch (error) {
//     console.error("Error fetching accepted profiles:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



exports.getAcceptedProfiles = async (req, res) => {
  try {
    const { page = 1, limit = 10, bureau } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // ✅ Step 1: Get all profile IDs of this bureau
    const bureauProfiles = await UserProfile.find({ Bureau: bureau })
      .select("_id");

    const profileIds = bureauProfiles.map(p => p._id);

    // ✅ Step 2: Find AcceptProfile where
    // MaleProfile OR FemaleProfile is in those IDs
    const total = await AcceptProfile.countDocuments({
      $or: [
        { MaleProfile: { $in: profileIds } },
        { FemaleProfile: { $in: profileIds } }
      ]
    });

const profiles = await AcceptProfile.find({
  $or: [
    { MaleProfile: { $in: profileIds } },
    { FemaleProfile: { $in: profileIds } }
  ]
})
  .populate({
    path: "MaleProfile",
    populate: {
      path: "Bureau", // 👈 populate bureau inside male
      model: "msp"
    }
  })
  .populate({
    path: "FemaleProfile",
    populate: {
      path: "Bureau", // 👈 populate bureau inside female
      model: "msp"
    }
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limitNumber)
  .lean();

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: profiles,
    });

  } catch (error) {
    console.error("Error fetching accepted profiles:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




exports.deleteAcceptedProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await AcceptProfile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Accepted profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Accepted profile deleted successfully",
      data: deletedProfile,
    });

  } catch (error) {
    console.error("Error deleting accepted profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




exports.ApprovedacceptMatch = async (req, res) => {
  try {
    const matchId = req.params.id;;


    

    // ✅ Step 1: Find match
    const match = await AcceptProfile.findById(matchId)
      .populate("MaleProfile")
      .populate("FemaleProfile");

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.Status === "Accepted") {
      return res.status(400).json({ message: "Match already accepted" });
    }

    // ✅ Step 2: Get bureau IDs
    const maleBureauId = match.MaleProfile?.Bureau;
    const femaleBureauId = match.FemaleProfile?.Bureau;

    if (!maleBureauId || !femaleBureauId) {
      return res.status(400).json({ message: "Invalid bureau data" });
    }

    const CREDIT_COST = 5;

    // ✅ Step 3: Fetch bureau data
    const [maleBureau, femaleBureau] = await Promise.all([
      MSP.findById(maleBureauId),
      MSP.findById(femaleBureauId),
    ]);

    if (!maleBureau || !femaleBureau) {
      return res.status(404).json({ message: "Bureau not found" });
    }

    // ✅ Step 4: Check credits BEFORE updating status

    // SAME BUREAU
    if (maleBureauId.toString() === femaleBureauId.toString()) {
      if (maleBureau.credits < CREDIT_COST) {
        return res.status(400).json({
          message: "Insufficient credits",
        });
      }
    }

    // DIFFERENT BUREAU
    else {
      if (
        maleBureau.credits < CREDIT_COST ||
        femaleBureau.credits < CREDIT_COST
      ) {
        return res.status(400).json({
          message: "One or both bureaus have insufficient credits",
        });
      }
    }

    // ✅ Step 5: Update status
    match.Status = "Accepted";
    await match.save();

    // ✅ Step 6: Deduct credits

    if (maleBureauId.toString() === femaleBureauId.toString()) {
      // SAME → deduct once
      await MSP.findByIdAndUpdate(maleBureauId, {
        $inc: { credits: -CREDIT_COST },
      });
    } else {
      // DIFFERENT → deduct from both
      await Promise.all([
        MSP.findByIdAndUpdate(maleBureauId, {
          $inc: { credits: -CREDIT_COST },
        }),
        MSP.findByIdAndUpdate(femaleBureauId, {
          $inc: { credits: -CREDIT_COST },
        }),
      ]);
    }

    res.json({
      message: "Match accepted and credits deducted",
      match,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


