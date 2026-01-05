
const crypto = require("crypto");
const Transaction = require("../../models/Payment/payment");
const User = require("../../models/Msp/msp");

// ======= PAYU CREDENTIALS =======
const MERCHANT_KEY = process.env.PAYU_KEY;
const MERCHANT_SALT = process.env.PAYU_SALT;
const PAYU_BASE_URL = "https://secure.payu.in";
const PAYU_LIVE_URL = "https://secure.payu.in/merchant/postservice.php?form=2";
// const PAYU_BASE_URL = "https://test.payu.in"; 

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Detect dynamic backend URL
function getBaseUrl(req) {
  return req.protocol + "://" + req.get("host");
}

// ===================================================
//              START PAYMENT  (STEP 1)
// ===================================================
const StartPayment = async (req, res) => {
  try {
    const {
      user_id,
      name,
      email,
      phone,
      plan_id,
      plan_name,
      price,
      credits,
      validity,
    } = req.body;

    const txnid = "ORDER" + Date.now();

    // Clean inputs
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim();
    const cleanPhone = String(phone || "").trim();
    const udf1 = String(user_id || "").trim();

    // Exact productinfo JSON string
    const productinfo = JSON.stringify({ plan_id, plan_name, credits, validity });

    // Format amount to 2 decimals
    const formattedPrice = parseFloat(price).toFixed(2);

    // ------------------ 🔥 HASH STRING ------------------
    const hashString = `${MERCHANT_KEY}|${txnid}|${formattedPrice}|${productinfo}|${cleanName}|${cleanEmail}|${udf1}||||||||||${MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // ------------------ SAVE TRANSACTION IN DB ------------------
    await Transaction.create({
      user_id,
      txnid,
      amount: formattedPrice,
      plan_id,
      plan_name,
      credits,
      validity,
      productinfo, // Save exact productinfo for hash verification
      status: "pending",
    });

    // CALLBACK URLs
    const BASE_URL = getBaseUrl(req);
    const surl = `${BASE_URL}/api/payu/status`; // success URL
    const furl = `${BASE_URL}/api/payu/status`; // failure URL

    // ------------------ 🔥 AUTOSUBMIT HTML FORM ------------------
    const html = `
      <html>
        <body onload="document.forms[0].submit()">
          <form method="post" action="${PAYU_BASE_URL}/_payment">
            <input type="hidden" name="key" value="${MERCHANT_KEY}" />
            <input type="hidden" name="txnid" value="${txnid}" />
            <input type="hidden" name="amount" value="${formattedPrice}" />
            <input type="hidden" name="productinfo" value='${productinfo}' />
            <input type="hidden" name="firstname" value="${cleanName}" />
            <input type="hidden" name="email" value="${cleanEmail}" />
            <input type="hidden" name="phone" value="${cleanPhone}" />
            <input type="hidden" name="surl" value="${surl}" />
            <input type="hidden" name="furl" value="${furl}" />
            <input type="hidden" name="hash" value="${hash}" />
            <input type="hidden" name="udf1" value="${udf1}" />
          </form>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (error) {
    console.error("PayU Payment Error:", error);
    res.status(500).json({ msg: "Payment creation failed", error });
  }
};

// ===================================================
//                    CALLBACK (STEP 2)
// ===================================================
const callback = async (req, res) => {
  try {
    const { txnid, status, mihpayid, udf1 } = req.body;

    // Fetch transaction from DB
    const transaction = await Transaction.findOne({ txnid });
    if (!transaction) {
      return res.send(`
        <script>
          alert("Transaction not found!");
          window.location.href = "/buerau-dashboard";
        </script>
      `);
    }

    // Update transaction with PayU response
    const updated = await Transaction.findOneAndUpdate(
      { txnid },
      {
        status,
        transaction_id: mihpayid,
        payment_response: req.body,
      },
      { new: true }
    );

    // Only add credits if payment succeeded
    if (status === "success") {
      await User.findByIdAndUpdate(udf1, { $inc: { credits: updated.credits } });

      // Send success message
      return res.send(`
        <script>
          alert("Payment Successful! Click OK to go to dashboard.");
          window.location.href = "${FRONTEND_URL}/buerau-dashboard";
        </script>
      `);
    } else {
      // Payment failed
      return res.send(`
        <script>
          alert("Payment Failed!");
          window.location.href = "${FRONTEND_URL}/buerau-dashboard";
        </script>
      `);
    }

  } catch (error) {
    console.error("PayU Callback Error:", error);
    return res.send(`
      <script>
        alert("Error validating payment. Please contact support.");
        window.location.href = "${FRONTEND_URL}/buerau-dashboard";
      </script>
    `);
  }
};


const getAllTransaction = async (req, res) => {
  try {
    const {  page = 1, limit = 10, search:"" } = req.query;


     // 🔍 Search filter
const filter = search
  ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { registered_business_name: { $regex: search, $options: "i" } },

        // 🔥 Partial mobile number search
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$mobile_number" },
              regex: search,
            },
          },
        },
      ],
    }
  : {};

    // Convert pagination values to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Fetch paginated data
    const payment = await Transaction.find(filter)
      .populate("user_id")
      .sort({ created_at: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Count total documents (for pagination info)
    const total = await Transaction.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      count: payment.length,
      data: payment,
    });
  } catch (err) {
    console.error("Error in get payment details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const remove_transaction = async (req, res) => {
  try {
    const  id = req.query.id;
 
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }



    // Fetch paginated data
    const payment_details = await Transaction.findByIdAndDelete(id)
    
    res.status(200).json({
      status: "success",
      data: payment_details,
    });
  } catch (error) {
    console.error("❌ Error deleting lookups:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// const callback = async (req, res) => {
//   try {
//     const { status, txnid, mihpayid, amount, firstname, email, udf1 } = req.body;

//     // Update transaction directly (skip hash check)
//     const updated = await Transaction.findOneAndUpdate(
//       { txnid },
//       { status, transaction_id: mihpayid, payment_response: req.body },
//       { new: true }
//     );

//     if (status === "success") {
//       await User.findByIdAndUpdate(udf1, {
//         $inc: { credits: updated.credits },
//       });
//       return res.send("<h2>✅ Payment Successful — Credits Added</h2>");
//     }

//     return res.send("<h2>❌ Payment Failed</h2>");
//   } catch (error) {
//     console.error(error);
//     res.send("<h2>Error validating payment</h2>");
//   }
// };



module.exports = { StartPayment, callback ,getAllTransaction,remove_transaction};
