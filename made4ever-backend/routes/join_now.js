const express = require("express");
const { createJoinNow, getJoinNowList, deleteJoinNow } = require("../controllers/JoinNow/join_now");



const router = express.Router();

router.post("/save-join-now", createJoinNow);

router.get("/get-join-now", getJoinNowList);

router.delete("/delete-join-now/:id", deleteJoinNow);




module.exports = router;
