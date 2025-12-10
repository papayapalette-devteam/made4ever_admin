const axios =require('axios')
const MSP = require("../../models/Msp/msp");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

const otpStore = {}; // Temporary store (use DB in production)

 const sendOtp = async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;


const payload={
  to: `91${phone}`,
  phoneNoId: "820798087793506",
  type: "template",
  name: "login",
  language: "en_GB",
  bodyParams: [otp],
  buttons: [
    {
      type: "button",
      sub_type: "url",   // should match button type in template
      text: otp     // must match placeholder index for URL parameter
    }
  ]
}


  

  try {
    await axios.post(
      "https://app.veblika.com/api/v2/whatsapp-business/messages",
      payload,
      {
        headers: {
        Authorization: `Bearer 9b758ea897b12e21785b50bd4e54a58f541ce7030d443c96cb21975b00a14e06`,
        "Content-Type": "application/json"
        }

      }
    );

    res.json({ success: true, message: "OTP sent on WhatsApp" });
  } catch (error) {
    console.error(error.response?.data);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

  
    // Check if OTP was generated
    if (!otpStore[phone]) {
      return res.status(400).json({ success: false, message: "OTP not generated" });
    }

    // Verify OTP
    if (otpStore[phone] !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Remove OTP after successful verification
    delete otpStore[phone];

    // Find user
    const user = await MSP.findOne({ mobile_number: phone });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }



    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with user info & token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
        registered_business_name: user.registered_business_name,
        address: user.address,
        credit: user.credits,
      },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};


module.exports={sendOtp,verifyOtp}
