const express=require('express');
const {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  updateUserProfile,
  deleteUserProfile
} =require('../controllers/UserProfile/add_user_profile')

const router = express.Router();

router.post("/add-new-profile", createUserProfile);
router.get("/get-all-profile", getAllUserProfiles);
router.get("/get-profile-by-id/:_id", getUserProfileById);
router.put("/:_id", updateUserProfile);
router.delete("/:_id", deleteUserProfile);

module.exports= router;
