
const UserProfile =require( "../../models/AddProfile/add_new_profile.js");
const userProfileSchema =require( "../../Validation/user_profile.js"); 

// 🟢 Create new user profile
 const createUserProfile = async (req, res) => {
  try {
    // Validate request body with Joi
    const { error } = userProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const mobile = req.body?.PersonalDetails?.MobileNumber?.trim();

    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    // 🔍 Check for duplicate user by MobileNumber
    const existingUser = await UserProfile.findOne({
      "PersonalDetails.MobileNumber": mobile
    });

    if (existingUser) {
      return res.status(400).json({
        error: `A user with mobile number ${mobile} already exists`
      });
    }

    // ✅ Save new user to MongoDB
    const newUser = new UserProfile(req.body);
    await newUser.save();

    res
      .status(200)
      .json({ message: "User profile created successfully", data: newUser });
  } catch (err) {
    console.error("Error in createUserProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// 🟡 Get all user profiles
 const getAllUserProfiles = async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getAllUserProfiles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔵 Get user profile by ID
 const getUserProfileById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User profile not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUserProfileById:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🟣 Update user profile by ID
 const updateUserProfile = async (req, res) => {
  try {
    // Validate updated data
    const { error } = userProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedUser = await UserProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatedUser) return res.status(404).json({ error: "User profile not found" });

    res.status(200).json({ message: "User profile updated successfully", data: updatedUser });
  } catch (err) {
    console.error("Error in updateUserProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔴 Delete user profile by ID
 const deleteUserProfile = async (req, res) => {
  try {
    const deletedUser = await UserProfile.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User profile not found" });

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUserProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports=
{createUserProfile,
getAllUserProfiles,
getUserProfileById,
updateUserProfile,
deleteUserProfile
}