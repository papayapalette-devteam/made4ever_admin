const MSP = require("../../models/Msp/msp");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')


const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

exports.loginMSP = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await MSP.findOne({ email:Email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
        registered_business_name: user.registered_business_name,
        address: user.address
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};