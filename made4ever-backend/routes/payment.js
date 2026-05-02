const express=require('express');
const { StartPayment, callback, getAllTransaction, remove_transaction,getTransactionsByUserPaginated } = require('../controllers/Payment/payment');



const router = express.Router();

router.post("/start-payment", StartPayment);

router.post("/status", callback);

router.get("/get-payment-details", getAllTransaction);

router.get("/transactions/:user_id", getTransactionsByUserPaginated);

router.delete("/remove-transaction", remove_transaction);




module.exports= router;
