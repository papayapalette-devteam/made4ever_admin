const express=require('express');
const { StartPayment, callback } = require('../controllers/Payment/payment');



const router = express.Router();

router.post("/start-payment", StartPayment);

router.post("/status", callback);




module.exports= router;
