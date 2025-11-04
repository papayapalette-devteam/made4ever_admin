import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../api";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("PersonalDetails");
  const location = useLocation();
  const user_id = location.state.id;

  const [user_profile, setuser_profile] = useState({});

const get_user_profile = async () => {
  try {
    const resp = await api.get(`api/user/get-profile-by-id/${user_id}`);

    const cleanData = Object.fromEntries(
      Object.entries(resp.data).map(([key, val]) => {
        if (val && typeof val === "object" && "_id" in val) {
          const { _id, ...rest } = val;
          return [key, rest];
        }
        return [key, val];
      })
    );

    setuser_profile(cleanData);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    get_user_profile();
  }, [user_id]);

  const tabs = [
    "PersonalDetails",
    "ReligiousDetails",
    "FamilyDetails",
    "EducationDetails",
    "ContactDetails",
    "PropertyDetails",
    "Upload",
  ];

  const renderDetails = (data, tabName) => {
    if (!data || typeof data !== "object") {
      return (
        <p className="text-gray-500 text-sm">
          No data available for this section.
        </p>
      );
    }

    if (tabName === "Upload") {
      return (
        <div className="space-y-6">
          {/* Profile Photo */}
          {data.ProfilePhoto?.length > 0 && (
            <div>
              <h4 className="font-semibold text-rose-700 mb-2">
                Profile Photo
              </h4>
              <div className="flex flex-wrap gap-3">
                {data.ProfilePhoto.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-xl border-2 border-rose-200 shadow-md hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Identity Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">Identity Type:</span>
              <p className="text-gray-900">{data.IdentityType || "—"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                Identity Number:
              </span>
              <p className="text-gray-900">{data.IdentityNumber || "—"}</p>
            </div>
          </div>

          {/* Identity Images */}
          {data.IdentityImage?.length > 0 && (
            <div>
              <h4 className="font-semibold text-rose-700 mb-2">
                Identity Images
              </h4>
              <div className="flex flex-wrap gap-3">
                {data.IdentityImage.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Identity"
                    className="w-24 h-24 object-cover rounded-xl border-2 border-rose-200 shadow-sm hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {data.Gallary?.length > 0 && (
            <div>
              <h4 className="font-semibold text-rose-700 mb-2">Gallery</h4>
              <div className="flex flex-wrap gap-3">
                {data.Gallary.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Gallery"
                    className="w-28 h-28 object-cover rounded-xl border-2 border-rose-200 shadow-sm hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Audio / Video */}
          {data.AudioVideo?.length > 0 && (
            <div>
              <h4 className="font-semibold text-rose-700 mb-2">Audio / Video</h4>
              <div className="flex flex-wrap gap-3">
                {data.AudioVideo.map((file, i) => (
                  <video
                    key={i}
                    src={file}
                    controls
                    className="w-48 h-32 rounded-xl border-2 border-rose-200 shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return Object.entries(data).map(([key, value]) => (
      <div
        key={key}
        className="flex justify-between border-b border-rose-100 py-2 hover:bg-rose-50 rounded-lg px-2"
      >
        <span className="font-medium text-gray-700">
          {key.replace(/([A-Z])/g, " $1")}
        </span>
        <span className="text-gray-900">
          {Array.isArray(value) ? value.join(", ") : String(value)}
        </span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 p-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-rose-200 shadow-xl rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={user_profile?.Upload?.ProfilePhoto?.[0]}
            alt="Profile"
            className="w-28 h-28 rounded-2xl object-cover border-2 border-rose-300 shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold text-rose-800">
              {user_profile?.PersonalDetails?.Name || "User Name"}
            </h2>
            <p className="text-gray-700 mt-1">
              {user_profile?.ContactDetails?.City},{" "}
              {user_profile?.ContactDetails?.Country}
            </p>
            <p className="text-gray-600">
              📞 {user_profile?.PersonalDetails?.MobileNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-col text-left text-gray-700 gap-2">
          <p>
            <span className="font-semibold">Height:</span>{" "}
            {user_profile?.PersonalDetails?.Height || "—"}
          </p>
          <p>
            <span className="font-semibold">Weight:</span>{" "}
            {user_profile?.PersonalDetails?.Weight || "—"} kg
          </p>
        </div>

        <div className="flex flex-col text-left text-gray-700 gap-2">
          <p>
            <span className="font-semibold">Age:</span>{" "}
            {user_profile?.PersonalDetails?.Age || "—"}
          </p>
          <p>
            <span className="font-semibold">Marital Status:</span>{" "}
            {user_profile?.PersonalDetails?.MaritalStatus || "—"}
          </p>
        </div>
      </div>

      <div className="flex gap-8 mt-8">
        {/* Sidebar */}
        <div className="w-1/4 bg-white/70 backdrop-blur-xl border border-rose-200 shadow-md rounded-2xl p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-rose-50"
                }`}
              >
                {tab.replace(/([A-Z])/g, " $1").trim()}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="w-3/4 bg-white/70 backdrop-blur-xl border border-rose-200 shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-5 text-rose-700 border-b pb-3 border-rose-200">
            {activeTab.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderDetails(user_profile[activeTab], activeTab)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
