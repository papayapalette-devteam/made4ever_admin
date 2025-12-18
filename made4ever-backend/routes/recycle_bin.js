const express = require("express");

const { getRecycleBinUsers, permanentDeleteUser, restoreUserProfile } = require("../controllers/RecycleBin/recycle_bin");


const router = express.Router();

router.post("/restore-profile/:_id", restoreUserProfile);

router.get("/recycle-bin-profile", getRecycleBinUsers);

router.delete("/permanent-delete-profile/:_id", permanentDeleteUser);




module.exports = router;
