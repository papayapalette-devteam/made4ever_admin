
const UserProfile =require( "../../models/AddProfile/add_new_profile.js");
const userProfileSchema =require( "../../Validation/user_profile.js"); 

// 🟢 Create new user profile
const createUserProfile = async (req, res) => {
  try {
    // 🧩 Extract _id (if present)
    const { _id, ...profileData } = req.body;

    // ✅ Validate request body (without _id)
    const { error } = userProfileSchema.validate(profileData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }



    // 🧠 If _id is provided → Update existing profile
    if (_id) {
      const existingUser = await UserProfile.findById(_id);

      if (!existingUser) {
        return res.status(404).json({ error: "User not found for update" });
      }

      // Optional: Check if another user already has the same mobile
      // const duplicateUser = await UserProfile.findOne({
      //   "PersonalDetails.MobileNumber": mobile,
      //   _id: { $ne: _id },
      // });

      // if (duplicateUser) {
      //   return res.status(400).json({
      //     error: `A user with mobile number ${mobile} already exists`,
      //   });
      // }

      // ✅ Update the existing user
      const updatedUser = await UserProfile.findByIdAndUpdate(
        _id,
        { $set: profileData },
        { new: true }
      );

      return res.status(200).json({
        message: "User profile updated successfully",
        data: updatedUser,
        action: "updated",
      });
    }

    // 🧠 If no _id → Create new profile
    // const existingUser = await UserProfile.findOne({
    //   "PersonalDetails.MobileNumber": MobileNumber,
    // });

    // if (existingUser) {
    //   return res.status(400).json({
    //     error: `A user with mobile number ${mobile} already exists`,
    //   });
    // }

    // ✅ Create new user
    const newUser = new UserProfile(profileData);
    await newUser.save();

    res.status(200).json({
      message: "User profile created successfully",
      data: newUser,
      action: "created",
    });
  } catch (err) {
    console.error("Error in createUserProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// 🟡 Get all user profiles
const getAllUserProfiles = async (req, res) => {
  try {
    const { bureau, page = 1, limit = 10, search="" } = req.query;

    // Build filter condition
    const filter = {};
    filter.IsDeleted=false
    if (bureau) {
      filter.Bureau = bureau;
    }
if (search) {
  filter.$or = [
    {
      "PersonalDetails.Name": {
        $regex: search,
        $options: "i",
      },
    },
  ];
}


    // Convert pagination values to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Fetch paginated data
    const users = await UserProfile.find(filter)
      .populate("Bureau")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Count total documents (for pagination info)
  const total = await UserProfile.countDocuments(filter);

  filter.IsActive = "true";
  const active = await UserProfile.find(filter);




    res.status(200).json({
      success: true,
      total,
      active:active.length,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("Error in getAllUserProfiles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// 🔵 Get user profile by ID
 const getUserProfileById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params._id);
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
    const user = await UserProfile.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ error: "User profile not found" });
    }

    user.IsDeleted = true;
    user.DeletedAt = new Date();

    await user.save();

    res.status(200).json({
      message: "User moved to recycle bin successfully",
    });
  } catch (err) {
    console.error("Error in deleteUserProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const block_unblock= async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params._id);
   
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Toggle logic
    user.IsActive = !user.IsActive;

    await user.save();

    res.status(200).send({
      success: true,
      message: user.IsActive ? "Profile Unblocked" : "Profile Blocked",
      user
    });
  } catch (error) {
    console.error("Toggle error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



module.exports=
{createUserProfile,
getAllUserProfiles,
getUserProfileById,
updateUserProfile,
deleteUserProfile,
block_unblock
}