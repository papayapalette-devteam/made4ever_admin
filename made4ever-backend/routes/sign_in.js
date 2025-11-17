const express=require('express');
const { loginMSP, loginSubAdmin } = require('../controllers/SignIn/sign_in');


const router = express.Router();

router.post("/sign-in", loginMSP);

router.post("/sub-admin-sign-in", loginSubAdmin);


module.exports= router;
