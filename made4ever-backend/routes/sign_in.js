const express=require('express');
const { loginMSP } = require('../controllers/SignIn/sign_in');


const router = express.Router();

router.post("/sign-in", loginMSP);


module.exports= router;
