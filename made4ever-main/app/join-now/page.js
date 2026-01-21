'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Import } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Swal from "sweetalert2";
import api from "@/api"


export default function JoinNow() {
const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  interest: "",
  message: "",
});

const [captcha, setCaptcha] = useState(generateCaptcha());
const [captchaInput, setCaptchaInput] = useState("");
const [captchaError, setCaptchaError] = useState("");
const [agreed, setAgreed] = useState(false);
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // CAPTCHA validation
  if (captchaInput !== captcha) {
    setCaptchaError("Incorrect CAPTCHA");
    setCaptcha(generateCaptcha());
    setCaptchaInput("");

    Swal.fire({
      icon: "error",
      title: "Invalid CAPTCHA",
      text: "Please enter the correct CAPTCHA",
    });
    return;
  }

  if (!agreed) {
    Swal.fire({
      icon: "warning",
      title: "Agreement Required",
      text: "Please agree to receive communications",
    });
    return;
  }

  setCaptchaError("");
  setLoading(true);

  // 🔄 Show loader
  Swal.fire({
    title: "Submitting...",
    text: "Please wait",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    await api.post("api/join-now/save-join-now", formData);

    // ✅ Success
    Swal.fire({
      icon: "success",
      title: "Submitted Successfully!",
      text: "We will contact you shortly.",
    });

    // reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      interest: "",
      message: "",
    });
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setAgreed(false);

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: err?.response?.data?.message || "Something went wrong",
      timer:2000
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">

        <section className="py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            <span className="text-[#bf5281]">Join Our Movement</span>
          </h1>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of Made4ever's mission to empower 33,000 women through entrepreneurship and strengthen families across the nation.
          </p>
        </div>
      </section>

<div className="flex justify-center items-center  px-4 mb-8">

  {/* Join Now Form */}
 <div className="w-full max-w-3xl">
      <div className="rounded-lg border bg-white shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>

       <form onSubmit={handleSubmit} className="space-y-6">

  {/* Name + Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium mb-1">Full Name *</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border rounded px-3 py-2"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Email Address *</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full border rounded px-3 py-2"
        required
      />
    </div>
  </div>

  {/* Phone + Address */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium mb-1">Phone Number *</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border rounded px-3 py-2"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Address</label>
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border rounded px-3 py-2"
      />
    </div>
  </div>

  {/* Interest + Message */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium mb-1">Interest *</label>
      <select
        name="interest"
        value={formData.interest}
        onChange={handleChange}
        className="w-full border h-11 rounded px-3 bg-white"
        required
      >
        <option value="">I'm interested in</option>
        <option value="bureau">Starting a marriage bureau business</option>
        <option value="learn">Learning more about the initiative</option>
        <option value="partner">Partnership opportunities</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        placeholder="Why do you want to join?"
        className="w-full border rounded px-3 py-2 resize-none"
      />
    </div>
  </div>

  {/* CAPTCHA */}
  <div className="space-y-2">
    <label className="block text-sm font-medium">Enter the text shown *</label>
    <div className="flex items-center gap-4">
      <div className="h-12 w-32 bg-gray-200 flex items-center justify-center rounded font-bold tracking-widest">
        {captcha}
      </div>
      <button
        type="button"
        onClick={() => setCaptcha(generateCaptcha())}
        className="text-sm text-[#bf5281]"
      >
        Refresh
      </button>
    </div>
    <input
      value={captchaInput}
      onChange={(e) => setCaptchaInput(e.target.value)}
      className="w-full border rounded px-3 py-2"
      placeholder="Enter CAPTCHA"
    />
    {captchaError && (
      <p className="text-red-500 text-sm">{captchaError}</p>
    )}
  </div>

  {/* Agreement */}
  <div className="flex items-start gap-2">
    <input
      type="checkbox"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
      className="h-5 w-5 accent-[#bf5281]"
    />
    <label className="text-sm">
      I agree to receive communications from <strong>Made4ever</strong>
    </label>
  </div>

  <button
    disabled={loading}
    className="w-full bg-[#bf5281] hover:bg-[#c93877] text-white font-semibold py-3 rounded"
  >
    {loading ? "Submitting..." : "Send Message"}
  </button>

</form>

      </div>
    </div>

</div>

      </div>

      <Footer/>
    </div>
  );
}
