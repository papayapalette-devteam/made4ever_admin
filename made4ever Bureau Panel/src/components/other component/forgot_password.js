import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPasswordModal = ({ onClose }) => {

    const swalConfig = {
  customClass: {
    confirmButton: "my-swal-button",
  },
};

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendOtp = async () => {
    if (!phone)
      return Swal.fire({
        title: "Required",
        text: "Enter mobile number",
        icon: "warning",
        ...swalConfig,
      });

    try {
      setLoading("send-otp");
      await api.post("/api/msp/signin/send-otp", { phone });
      setOtpSent(true);

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "OTP has been sent to your WhatsApp",
        ...swalConfig,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to send OTP",
        ...swalConfig,
      });
    } finally {
      setLoading("");
    }
  };

  const submitPasswordReset = async () => {
    if (!otp || !newPassword || !confirmPassword)
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
        ...swalConfig,
      });

    if (newPassword !== confirmPassword)
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        ...swalConfig,
      });

    try {
      setLoading("submit");
      await api.post("/api/msp/signin/reset-password", {
        phone,
        otp,
        newPassword,
      });

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been updated successfully",
        ...swalConfig,
      });

      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to reset password",
        ...swalConfig,
      });
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-fadeIn">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Reset your password securely using OTP
        </p>

        {/* Mobile */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter WhatsApp number"
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Send OTP */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            className="login-btn w-full"
          >
            {loading === "send-otp" ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Send OTP"
            )}
          </button>
        )}

        {/* OTP + Password */}
        {otpSent && (
          <>
            <div className="mb-4 mt-4">
              <label className="text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* New Password */}
            <div className="mb-4 relative">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit */}
            <button
              onClick={submitPasswordReset}
              className="w-full rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
            >
              {loading === "submit" ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Update Password"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
