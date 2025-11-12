const AcceptProfile = require("../../models/AcceptMatches/accept_matches");
const UserProfile = require("../../models/AddProfile/add_new_profile");

// 🟩 Save accepted profile (male/female logic)
exports.saveAcceptedProfile = async (req, res) => {
  try {
    const { candidateId, userId,MatchingPercentage } = req.body;

    if (!candidateId || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const candidate = await UserProfile.findById(candidateId);
    const user = await UserProfile.findById(userId);

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

