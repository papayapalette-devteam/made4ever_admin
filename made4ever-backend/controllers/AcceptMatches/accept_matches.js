const AcceptProfile = require("../../models/AcceptMatches/accept_matches");
const UserProfile = require("../../models/AddProfile/add_new_profile");
const MSP = require("../../models/Msp/msp");
const axios =require('axios')

// 🟩 Save accepted profile (male/female logic)
exports.saveAcceptedProfile = async (req, res) => {
  try {
    const { candidateId, userId,MatchingPercentage } = req.body;

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

// const userBureauName = user_bureau_details.name;
// const userBureauPhone = user_bureau_details.mobile_number;



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
      MatchingPercentage
    });

const profileUrl="https://made4ever.in"

// Template payload generator
const getPayload = (receiverPhone, bureauName, bureauPhone) => ({
  to: `91${String(receiverPhone)}`,
  phoneNoId: "820798087793506",
  type: "template",
  name: "match_found_utility",
  language: "en_US",
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
  getPayload(candidateBureauPhone, candidateBureauName, candidateBureauPhone),
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
exports.getAcceptedProfiles = async (req, res) => {
  try {
    const profiles = await AcceptProfile.find()
      .populate("MaleProfile")
      .populate("FemaleProfile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error("Error fetching accepted profiles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

