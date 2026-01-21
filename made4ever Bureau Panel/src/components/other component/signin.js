import React, { useState } from "react";
import image from "../images/M4E_bureau.jpg";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2";
import "./signin.css";
// import ChangePasswordModal from "./changepassworddoctor";
import logo from "../images/Made4Ever New Logo (600 x 300 px) (1).png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ eye icons
import CircularProgress from "@mui/material/CircularProgress";

function SignIn() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading("login");
      const resp = await api.post("api/msp/signin/sign-in", {
        Email,
        Password,
      });

      if (resp.status === 200) {
        // Success
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: resp.data.message || "Welcome!",
          showConfirmButton: true,
          customClass: {
            confirmButton: "my-swal-button",
          },
        });
      }

      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.user));

      navigate("/buerau-dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        showConfirmButton: true,
        customClass: {
          confirmButton: "my-swal-button",
        },
      });
    } finally {
      setLoading("");
    }
  };

  // OTP LOGIN STATES
  const [isOtpLogin, setIsOtpLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // 📌 Send OTP
  const sendOtp = async () => {
    if (!phone) return Swal.fire("Enter mobile number");

    try {
      setLoading("send-otp");
      const resp = await api.post("api/msp/signin/send-otp", { phone }); // Your backend OTP API
      setOtpSent(true);
      Swal.fire({
        icon: "success",
        text: "OTP sent on WhatsApp!",
        customClass: {
          confirmButton: "my-swal-button",
        },
      });
    } catch (err) {
      Swal.fire("Failed to send OTP!");
    } finally {
      setLoading("");
    }
  };

  // 📌 Verify OTP
  const verifyOtp = async () => {
    if (!otp) return Swal.fire("Enter OTP");

    try {
      setLoading("verify-otp");
      const resp = await api.post("/api/msp/signin/otp-sign-in", {
        phone,
        otp,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: resp.data.message,
        customClass: {
          confirmButton: "my-swal-button",
        },
      });

      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.user));

      navigate("/buerau-dashboard");
    } catch (err) {
      // Get message from server response or fallback
      const message = err.response?.data?.message || "Something went wrong";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        customClass: {
          confirmButton: "my-swal-button",
        },
      });
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="signin-container">
      <div className="visual-side">
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>

      <div className="form-side">
        <form className="signin-form">
          <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h2>Welcome Back MSP</h2>

          {/* 🔥 Login With Password Section */}
          {!isOtpLogin ? (
            <>
              <div className="nav-links">
                <p className="otp-switch cursor-pointer" onClick={() => setIsOtpLogin(true)}>
                Login with OTP?
              </p>
              </div>

              <div className="input-group">
                <label>Email Id</label>
                <input
                  type="text"
                  placeholder="Enter Your Email Id"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="options">
                <label>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: "10px",
                      transform: "scale(1.5)",
                      accentColor: "#4d7bf3",
                    }}
                  />
                  Remember me
                </label>
                <a href="/forgot">Forgot Password?</a>
              </div>

              <button className="login-btn" onClick={login}>
                {loading === "login" ? <CircularProgress size={20} /> : "Login"}
              </button>

             
            </>
          ) : (
            <>
              {/* 🔥 WhatsApp OTP Login Section */}
              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter WhatsApp Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {!otpSent ? (
                <button type="button" className="login-btn" onClick={sendOtp}>
                  {loading === "send-otp" ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              ) : (
                <>
                  <div className="input-group">
                    <label>Enter OTP</label>
                    <input
                      className="input-group"
                      type="text"
                      placeholder="6-digit OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="login-btn"
                    onClick={verifyOtp}
                  >
                    {loading === "verify-otp" ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </>
              )}

              <p className="otp-switch cursor-pointer" onClick={() => setIsOtpLogin(false)}>
                Login with Password?
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
