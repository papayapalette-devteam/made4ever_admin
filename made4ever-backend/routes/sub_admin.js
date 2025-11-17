const express = require("express");
const { add_sub_admin, get_sub_admin } = require("../controllers/SubAdmin/sub_admin");

const router = express.Router();




router.post("/SaveSubAdmin", add_sub_admin);

router.get("/GetSubAdmin",  get_sub_admin);





module.exports = router;
