const express=require('express');
const { loginMSP, loginSubAdmin } = require('../controllers/SignIn/sign_in');
const { verifyOtp, sendOtp } = require('../controllers/SignIn/otp_sign_in');


const router = express.Router();

router.post("/sign-in", loginMSP);

router.post("/sub-admin-sign-in", loginSubAdmin);

router.post("/send-otp", sendOtp);

router.post("/otp-sign-in", verifyOtp);


module.exports= router;
