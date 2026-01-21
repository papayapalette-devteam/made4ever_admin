const UserProfile =require( "../../models/AddProfile/add_new_profile.js");


const getRecycleBinUsers = async (req, res) => {
  try {
         const { bureau, page = 1, limit = 10,search="" } = req.query;
     
         // Build filter condition
         const filter = {};
         filter.IsDeleted=true
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
     
         res.status(200).json({
           success: true,
           total,
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

const restoreUserProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.IsDeleted = false;
    user.DeletedAt = null;

    await user.save();

    res.status(200).json({
      message: "User restored successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const permanentDeleteUser = async (req, res) => {
  try {
    const deletedUser = await UserProfile.findByIdAndDelete(req.params._id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User permanently deleted",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={getRecycleBinUsers,restoreUserProfile,permanentDeleteUser}