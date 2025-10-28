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
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p className="text-sm opacity-90 mt-1">
            Step {step} of 4 — Complete your details to get the best matches!
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          {["Basic Info", "Professional", "Partner Pref.", "Photos"].map(
            (label, index) => {
              const num = index + 1;
              return (
                <div key={num} className="flex flex-col items-center">
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
                  <p className="text-xs mt-1 text-gray-600 text-center w-20">
                    {label}
                  </p>
                </div>
              );
            }
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1 - Basic Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input
                  type="text"
                  placeholder="Religion"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Caste"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Marital Status"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
              </div>
            </div>
          )}

          {/* STEP 2 - Professional Info */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Professional & Location Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Education"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Occupation"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Income (e.g., 10 LPA)"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Height (e.g., 5'9)"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
              </div>
            </div>
          )}

          {/* STEP 3 - Partner Preference */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Partner Preferences
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Preferred Age Range (e.g., 25-30)"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Preferred Height Range (e.g., 5'5 - 6'0)"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
                  <option>Preferred Religion</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Sikh</option>
                  <option>Christian</option>
                </select>
                <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full">
                  <option>Preferred Education</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Doctorate</option>
                </select>
                <input
                  type="text"
                  placeholder="Preferred Occupation"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                />
                <textarea
                  placeholder="Additional Preferences (Optional)"
                  rows={3}
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full sm:col-span-2"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 4 - Upload Photos */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Upload Photos
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-3">
                  Drag and drop your images here or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm"
                  >
                    Preview {i}
                  </div>
                ))}
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

          {step < 4 ? (
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
