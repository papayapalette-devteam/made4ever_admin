const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "msp", required: true },
  txnid: { type: String, required: true },
  amount: { type: Number, required: true },
  plan_id: String,
  plan_name: String,
  credits: Number,
  validity: Number,
  productinfo: { type: String, required: true }, // <--- ADD THIS
  status: { type: String, enum: ["success", "pending", "failed"], default: "pending" },
  transaction_id: String, // PayU transaction ID (mihpayid)
  payment_response: Object, // Full response from PayU if you want to store it
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
