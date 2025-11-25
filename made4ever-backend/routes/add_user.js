const express=require('express');
const {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  updateUserProfile,
  deleteUserProfile,
  block_unblock
} =require('../controllers/UserProfile/add_user_profile');
const { getMatches } = require('../controllers/UserProfile/matching_profile');
const { saveAcceptedProfile, getAcceptedProfiles } = require('../controllers/AcceptMatches/accept_matches');

const router = express.Router();

router.post("/add-new-profile", createUserProfile);
router.get("/get-all-profile", getAllUserProfiles);
router.get("/get-profile-by-id/:_id", getUserProfileById);
router.put("/:_id", updateUserProfile);
router.put("/block-unblock/:_id", block_unblock);
router.delete("/delete-user/:_id", deleteUserProfile);

router.get("/matching-profile/:userId", getMatches);


router.post("/accept-profile", saveAcceptedProfile);
router.get("/accept-profile", getAcceptedProfiles);


module.exports= router;
