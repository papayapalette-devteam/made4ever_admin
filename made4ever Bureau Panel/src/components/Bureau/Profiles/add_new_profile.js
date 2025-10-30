import React, { useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

export default function NewProfileForm() {
  const [step, setStep] = useState(1);

  return (
    <div>
        <Header/>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6 px-6 text-center">
          <h1 className="text-3xl font-bold">Create New Profile</h1>
          <p className="text-sm opacity-90 mt-1">
            Step {step} of 8 — Complete your details to get the best matches!
          </p>
        </div>

   {/* Step Indicators */}
<div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50 overflow-x-auto">
  {[
    "Personal",
    "Religious",
    "Family",
    "Edu/Income",
    "Contact",
    "Partner Pref.",
    "Uploads",
    "Property",
  ].map((label, index) => {
    const num = index + 1;
    return (
      <div key={num} className="flex flex-col items-center min-w-[80px]">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
            step === num
              ? "bg-red-600 text-white"
              : step > num
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {num}
        </div>
        <p className="text-xs mt-1 text-gray-600 text-center w-20">{label}</p>
      </div>
    );
  })}
</div>

{/* Form Body */}
<div className="p-6 sm:p-8 space-y-6">
  {/* STEP 1 - Personal Details */}
  {step === 1 && (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Personal Details
      </h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Full Name
    </label>
    <input
      type="text"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      placeholder="Enter your full name"
    />
  </div>

  {/* Date of Birth */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Date of Birth
    </label>
    <input
      type="date"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Time of Birth */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Time of Birth
    </label>
    <input
      type="time"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Place of Birth */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Place of Birth
    </label>
    <input
      type="text"
      placeholder="Enter city/place"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Age */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Age
    </label>
    <input
      type="number"
      placeholder="Enter age"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Mobile */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Mobile Number
    </label>
    <input
      type="tel"
      placeholder="Enter mobile number"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Complexion */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Complexion
    </label>
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
      <option value="">Select complexion</option>
      <option>Fair</option>
      <option>Wheatish</option>
      <option>Dark</option>
    </select>
  </div>

  {/* Height */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Height
    </label>
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
      <option value="">Select height</option>
      <option>5'0"</option>
      <option>5'5"</option>
      <option>6'0"</option>
      <option>6'2"</option>
    </select>
  </div>

  {/* Weight */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Weight (kg)
    </label>
    <input
      type="number"
      placeholder="Enter weight"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    />
  </div>

  {/* Mother Tongue */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Mother Tongue
    </label>
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
      <option value="">Select language</option>
      <option>Hindi</option>
      <option>English</option>
      <option>Tamil</option>
      <option>Telugu</option>
      <option>Bengali</option>
    </select>
  </div>

  {/* Gender */}
  <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Gender
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Male" className="accent-red-600" />
        Male
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Female" className="accent-red-600" />
        Female
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Other" className="accent-red-600" />
        Other
      </label>
    </div>
  </div>

  {/* Lifestyle Choices */}
  {[
    "Drinking",
    "Smoking",
    "Non-Veg",
    "NRI",
    "Manglik",
  ].map((label, i) => (
    <div key={i}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={label.toLowerCase().replace(/\s+/g, "")}
            value="Yes"
            className="accent-red-600"
          />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={label.toLowerCase().replace(/\s+/g, "")}
            value="No"
            className="accent-red-600"
          />
          No
        </label>
      </div>
    </div>
  ))}

      <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Living
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Male" className="accent-red-600" />
        Single
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Female" className="accent-red-600" />
        With Parent/Family
      </label>
    </div>
  </div>

    <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Any Disability
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Male" className="accent-red-600" />
        None
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Female" className="accent-red-600" />
        Physical Disabled
      </label>
    </div>
  </div>

   <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Marital Status
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Male" className="accent-red-600" />
        Single
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Female" className="accent-red-600" />
        Divorce
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="gender" value="Other" className="accent-red-600" />
        Widow/Widower
      </label>
    </div>
  </div>

</div>

    </div>
  )}

{/*====================== STEP 2 - Religious Details =====================================*/}
  {step === 2 && (
   <div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Religious Details</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <div>
      <label className="block text-gray-700 font-medium mb-1">Community</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Religion</option>
        <option value="hindu">Hindu</option>
        <option value="muslim">Muslim</option>
        <option value="christian">Christian</option>
        <option value="sikh">Sikh</option>
        <option value="buddhist">Buddhist</option>
        <option value="jain">Jain</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Caste</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Caste</option>
        <option value="brahmin">Brahmin</option>
        <option value="rajput">Rajput</option>
        <option value="yadav">Yadav</option>
        <option value="baniya">Baniya</option>
        <option value="kurmi">Kurmi</option>
        <option value="gupta">Gupta</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Religion</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Sub-caste</option>
        <option value="sub1">Sub-caste 1</option>
        <option value="sub2">Sub-caste 2</option>
        <option value="sub3">Sub-caste 3</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Gothram</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Gotra</option>
        <option value="bharadwaj">Bharadwaj</option>
        <option value="kashyap">Kashyap</option>
        <option value="gautam">Gautam</option>
        <option value="vashishtha">Vashishtha</option>
        <option value="agastya">Agastya</option>
        <option value="other">Other</option>
      </select>
    </div>

  </div>
</div>

  )}

  {/*======================= STEP 3 - Family Details===================================== */}
  {step === 3 && (
   <div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Family Details</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Father’s Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Father’s Name</label>
      <input
        type="text"
        placeholder="Enter Father’s Name"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>

    {/* Mother’s Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Mother’s Name</label>
      <input
        type="text"
        placeholder="Enter Mother’s Name"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>

    {/* Father’s Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Father’s Occupation</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Occupation</option>
        <option value="business">Business</option>
        <option value="government_job">Government Job</option>
        <option value="private_job">Private Job</option>
        <option value="retired">Retired</option>
        <option value="farmer">Farmer</option>
        <option value="self_employed">Self Employed</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Mother’s Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Mother’s Occupation</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Occupation</option>
        <option value="homemaker">Homemaker</option>
        <option value="business">Business</option>
        <option value="government_job">Government Job</option>
        <option value="private_job">Private Job</option>
        <option value="retired">Retired</option>
        <option value="self_employed">Self Employed</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* No. of Siblings */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">No. of Siblings</label>
      <input
        type="number"
        placeholder="Enter No. of Siblings"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>

    {/* Family Type */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Family Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Family Type</option>
        <option value="joint">Joint</option>
        <option value="nuclear">Nuclear</option>
      </select>
    </div>
  </div>

  {/* Family Description */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">Family Description</label>
    <textarea
      placeholder="Describe your family background"
      rows="4"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    ></textarea>
  </div>
</div>

  )}

  {/*================================== STEP 4 - Education / Income========================= */}
  {step === 4 && (
<div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Education & Income</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Highest Education */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Highest Education</label>
      <input
        type="text"
        placeholder="Enter Highest Education"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>

    {/* Education Specialization */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Education Specialization</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Specialization</option>
        <option value="engineering">Engineering</option>
        <option value="medical">Medical</option>
        <option value="commerce">Commerce</option>
        <option value="arts">Arts</option>
        <option value="science">Science</option>
        <option value="law">Law</option>
        <option value="management">Management</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Occupation</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Occupation</option>
        <option value="business">Business</option>
        <option value="government_job">Government Job</option>
        <option value="private_job">Private Job</option>
        <option value="self_employed">Self Employed</option>
        <option value="retired">Retired</option>
        <option value="student">Student</option>
        <option value="homemaker">Homemaker</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Annual Family Income */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Annual Family Income (in Lakh)</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Income Range</option>
        <option value="0-2">0 - 2 Lakh</option>
        <option value="2-5">2 - 5 Lakh</option>
        <option value="5-10">5 - 10 Lakh</option>
        <option value="10-20">10 - 20 Lakh</option>
        <option value="20+">Above 20 Lakh</option>
      </select>
    </div>
  </div>

  {/* Education Details */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">Education Details</label>
    <textarea
      placeholder="Describe your education background"
      rows="4"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    ></textarea>
  </div>

  {/* Occupation Details */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">Occupation Details</label>
    <textarea
      placeholder="Describe your occupation details"
      rows="4"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
    ></textarea>
  </div>
</div>

  )}

  {/*============================ STEP 5 - Contact Details================================ */}
  {step === 5 && (
<div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Details</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Permanent Address */}
    <div className="sm:col-span-2">
      <label className="block text-gray-700 font-medium mb-1">Permanent Address</label>
      <textarea
        rows="3"
        placeholder="Enter your current or permanent address"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full resize-none"
      ></textarea>
    </div>

    {/* Country */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Country</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Country</option>
        <option>India</option>
        <option>USA</option>
        <option>Canada</option>
        <option>Australia</option>
        <option>United Kingdom</option>
      </select>
    </div>

    {/* State */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">State</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select State</option>
        <option>Maharashtra</option>
        <option>Delhi</option>
        <option>Uttar Pradesh</option>
        <option>Karnataka</option>
        <option>Tamil Nadu</option>
      </select>
    </div>

    {/* City */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">City</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select City</option>
        <option>Mumbai</option>
        <option>Delhi</option>
        <option>Bengaluru</option>
        <option>Chennai</option>
        <option>Lucknow</option>
      </select>
    </div>

    {/* Postal Code */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
      <input
        type="text"
        placeholder="Enter postal/ZIP code"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>
  </div>
</div>


  )}

  {/*================================ STEP 6 - Partner Preferences========================= */}
  {step === 6 && (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Partner Preferences</h2>
   <div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Preferred Partner Details</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Preferred Age Range */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Preferred Age Range</label>
      <div className="flex gap-2">
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
          <option value="">Min Age</option>
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i} value={i + 18}>{i + 18}</option>
          ))}
        </select>
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
          <option value="">Max Age</option>
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i} value={i + 18}>{i + 18}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Preferred Height Range */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Preferred Height Range</label>
      <div className="flex gap-2">
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
          <option value="">Min Height</option>
          {["4'5", "4'8", "5'0", "5'2", "5'5", "5'8", "6'0", "6'2", "6'5"].map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
          <option value="">Max Height</option>
          {["4'5", "4'8", "5'0", "5'2", "5'5", "5'8", "6'0", "6'2", "6'5"].map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Marital Status */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Marital Status</label>
      <div className="flex gap-3">
        <label><input type="radio" name="marital" /> Single</label>
        <label><input type="radio" name="marital" /> Divorced</label>
        <label><input type="radio" name="marital" /> Widow/Widower</label>
      </div>
    </div>

    {/* Food Preference */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Non-Veg</label>
      <div className="flex gap-3">
        <label><input type="radio" name="non-veg" /> Yes</label>
        <label><input type="radio" name="non-veg" /> No</label>
      </div>
    </div>

    {/* Manglik */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Manglik</label>
      <div className="flex gap-3">
        <label><input type="radio" name="manglik" /> Yes</label>
        <label><input type="radio" name="manglik" /> No</label>
      </div>
    </div>

    {/* NRI */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">NRI</label>
      <div className="flex gap-3">
        <label><input type="radio" name="nri" /> Yes</label>
        <label><input type="radio" name="nri" /> No</label>
      </div>
    </div>

    {/* Community */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Community</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Brahmin</option>
        <option>Kshatriya</option>
        <option>Vaishya</option>
        <option>Shudra</option>
        <option>Other</option>
      </select>
    </div>

    {/* Religion */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Religion</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Hindu</option>
        <option>Muslim</option>
        <option>Sikh</option>
        <option>Christian</option>
        <option>Jain</option>
        <option>Buddhist</option>
      </select>
    </div>

    {/* Caste */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Caste</label>
      <input type="text" placeholder="Caste" className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full" />
    </div>

    {/* Mother Tongue */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Mother Tongue</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Hindi</option>
        <option>English</option>
        <option>Tamil</option>
        <option>Telugu</option>
        <option>Marathi</option>
        <option>Gujarati</option>
      </select>
    </div>

    {/* Education */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Highest Education</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Bachelor’s</option>
        <option>Master’s</option>
        <option>Doctorate</option>
        <option>Diploma</option>
        <option>Other</option>
      </select>
    </div>

    {/* Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Occupation</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Engineer</option>
        <option>Doctor</option>
        <option>Teacher</option>
        <option>Business</option>
        <option>Government Job</option>
        <option>Private Job</option>
        <option>Self Employed</option>
      </select>
    </div>

    {/* Country */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Country</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>India</option>
        <option>USA</option>
        <option>Canada</option>
        <option>UK</option>
        <option>Australia</option>
      </select>
    </div>

    {/* State */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">State</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Maharashtra</option>
        <option>Delhi</option>
        <option>Karnataka</option>
        <option>Tamil Nadu</option>
        <option>Uttar Pradesh</option>
      </select>
    </div>

    {/* City */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">City</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option>Mumbai</option>
        <option>Delhi</option>
        <option>Bangalore</option>
        <option>Chennai</option>
        <option>Hyderabad</option>
      </select>
    </div>
  </div>
</div>

    </div>
  )}

  {/*============================== STEP 7 - Upload Photos=============================== */}
  {step === 7 && (
<div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload Photos & Media</h2>

  {/* Profile Photo Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Profile Photo</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 mb-3">Click to upload your profile photo</p>
      <input type="file" accept="image/*" className="w-full cursor-pointer" />
    </div>
    <div className="mt-3">
      <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        Profile Preview
      </div>
    </div>
  </div>

  {/* Identity Type & Number */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Identity Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select</option>
        <option value="Aadhar Card">Aadhar Card</option>
        <option value="PAN Card">PAN Card</option>
        <option value="Passport">Passport</option>
        <option value="Driving License">Driving License</option>
        <option value="Voter ID">Voter ID</option>
      </select>
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-2">Identity Number</label>
      <input
        type="text"
        placeholder="Enter ID Number"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      />
    </div>
  </div>

  {/* Identity Image Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Upload Identity Image</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 mb-3">Click to upload your ID image</p>
      <input type="file" accept="image/*" className="w-full cursor-pointer" />
    </div>
    <div className="mt-3 flex gap-3 flex-wrap">
      {[1].map((i) => (
        <div
          key={i}
          className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm"
        >
          ID Preview
        </div>
      ))}
    </div>
  </div>

  {/* Audio / Video Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Upload Audio / Video</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 mb-3">Click to upload an audio or video file</p>
      <input
        type="file"
        accept="audio/*,video/*"
        className="w-full cursor-pointer"
      />
    </div>
    <div className="mt-3 flex gap-3 flex-wrap">
      <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        Media Preview
      </div>
    </div>
  </div>

  {/* Gallery Photos Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Upload Gallery Photos</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 mb-3">Upload multiple gallery images</p>
      <input
        type="file"
        multiple
        accept="image/*"
        className="w-full cursor-pointer"
      />
    </div>
    <div className="mt-3 flex gap-3 flex-wrap">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm"
        >
          Gallery {i}
        </div>
      ))}
    </div>
  </div>
</div>

  )}

  {/* STEP 8 - Property Details */}
  {step === 8 && (
  <div className="space-y-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Property Details</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Property Type */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Property Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Property Type</option>
        <option value="Flat">Flat</option>
        <option value="Villa">Villa</option>
        <option value="Plot">Plot</option>
        <option value="Bungalow">Bungalow</option>
        <option value="Farmhouse">Farmhouse</option>
      </select>
    </div>

    {/* Residential Type */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Residential Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
        <option value="">Select Residential Type</option>
        <option value="Owned">Owned</option>
        <option value="Rented">Rented</option>
        <option value="Leased">Leased</option>
        <option value="Family Property">Family Property</option>
      </select>
    </div>
  </div>

  {/* Property Description */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">Property Description</label>
    <textarea
      rows="3"
      placeholder="Enter property details (location, size, value, etc.)"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full resize-none"
    ></textarea>
  </div>
</div>

  )}
</div>


        {/* Navigation Buttons */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className={`px-5 py-2 rounded-lg border ${
              step === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Back
          </button>

          {step < 8 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:opacity-90"
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>

    <Footer/>

    </div>
  );
}
