import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../UI/button";
import Card from "../../../UI/card";
import CardHeader from "../../../UI/card_header";
import CardContent from "../../../UI/card_contenet";
import Avatar from "../../../UI/avatar";
import { ArrowLeft } from "lucide-react";

const MatchDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, candidate } = state || {};

  if (!user || !candidate) {
    return (
      <div className="text-center mt-20 text-gray-500">
        ⚠️ No data found — please open from the Matches page.
      </div>
    );
  }

  const profilePhoto = (p) =>
    p?.Upload?.ProfilePhoto?.[0] || "https://via.placeholder.com/150";

  const renderImage = (src) =>
    src ? (
     <a
  href={src}
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>
  <img
    src={src}
    alt="Profile"
    className="w-20 h-20 object-cover rounded-lg border"
  />
</a>
    ) : (
      "-"
    );

  const renderSection = (title, fields) => (
    <div className="mb-10">
      <h4 className="font-semibold text-xl text-red-600 mb-4 border-b-2 border-red-200 pb-2">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map(([label, val1, val2], i) => (
          <div
            key={i}
            className="bg-gray-50 hover:bg-gray-100 transition-all rounded-lg p-3 border border-gray-100"
          >
            <div className="font-medium text-gray-800 mb-1">{label}</div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>
                👤 <b>User:</b>{" "}
                {typeof val1 === "string" && val1.startsWith("http")
                  ? renderImage(val1)
                  : val1 || "-"}
              </span>
              <span>
                💞 <b>Candidate:</b>{" "}
                {typeof val2 === "string" && val2.startsWith("http")
                  ? renderImage(val2)
                  : val2 || "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Header */}
        <div className="flex justify-between items-center mb-10">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center border border-red-400 text-red-600 hover:bg-red-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
            ❤️ Match Comparison
          </h1>
          <div />
        </div>

        {/* Top Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[user, candidate].map((profile, i) => (
            <Card
              key={i}
              className="p-6 bg-white shadow-lg border border-red-100 rounded-2xl hover:shadow-xl transition-all"
            >
             <CardHeader className="flex flex-col items-center text-center space-y-3 py-6">
                <div className="relative">
                  <a
                    href={profilePhoto(profile)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    >
                    <img
                        src={profilePhoto(profile)}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border-4 border-pink-300 shadow-lg object-cover mx-auto transition-transform hover:scale-105"
                    />
                    </a>
                    <div className="absolute -bottom-1 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>

                <h2 className="text-xl font-semibold text-gray-800">
                    {profile?.PersonalDetails?.Name || "Unknown"}
                </h2>

                <p className="text-gray-600 text-sm">
                    {profile?.PersonalDetails?.Age} yrs •{" "}
                    {profile?.PersonalDetails?.Gender}
                </p>

                <p className="text-gray-500 text-sm">
                    {profile?.ContactDetails?.City},{" "}
                    {profile?.ContactDetails?.State}
                </p>
                </CardHeader>

            </Card>
          ))}
        </div>

        {/* Comparison Card */}
        <Card className="bg-white shadow-md border border-gray-200 rounded-2xl p-8">
          <CardContent>
            {/* PERSONAL DETAILS */}
            {renderSection("Personal Details", [
              ["Name", user.PersonalDetails?.Name, candidate.PersonalDetails?.Name],
              ["Date of Birth", user.PersonalDetails?.DateOfBirth, candidate.PersonalDetails?.DateOfBirth],
              ["Age", user.PersonalDetails?.Age, candidate.PersonalDetails?.Age],
              ["Gender", user.PersonalDetails?.Gender, candidate.PersonalDetails?.Gender],
              ["Height", user.PersonalDetails?.Height, candidate.PersonalDetails?.Height],
              ["Weight", user.PersonalDetails?.Weight, candidate.PersonalDetails?.Weight],
              ["Complexion", user.PersonalDetails?.Complexion, candidate.PersonalDetails?.Complexion],
              ["Marital Status", user.PersonalDetails?.MaritalStatus, candidate.PersonalDetails?.MaritalStatus],
              ["Blood Group", user.PersonalDetails?.BloodGroup, candidate.PersonalDetails?.BloodGroup],
            ])}

            {/* CONTACT DETAILS */}
            {renderSection("Contact Details", [
              ["Address", user.ContactDetails?.ParmanentAddress, candidate.ContactDetails?.ParmanentAddress],
              ["City", user.ContactDetails?.City, candidate.ContactDetails?.City],
              ["State", user.ContactDetails?.State, candidate.ContactDetails?.State],
              ["Country", user.ContactDetails?.Country, candidate.ContactDetails?.Country],
              ["Postal Code", user.ContactDetails?.PostalCode, candidate.ContactDetails?.PostalCode],
            ])}

            {/* EDUCATION DETAILS */}
            {renderSection("Education & Occupation", [
              ["Highest Education", user.EducationDetails?.HighestEducation, candidate.EducationDetails?.HighestEducation],
              ["Specialization", user.EducationDetails?.EducationSpecialization, candidate.EducationDetails?.EducationSpecialization],
              ["Occupation", user.EducationDetails?.Occupation, candidate.EducationDetails?.Occupation],
              ["Annual Income", user.EducationDetails?.AnnualFamilyIncome, candidate.EducationDetails?.AnnualFamilyIncome],
              ["Education Details", user.EducationDetails?.EducationDetails, candidate.EducationDetails?.EducationDetails],
            ])}

            {/* FAMILY DETAILS */}
            {renderSection("Family Details", [
              ["Father's Name", user.FamilyDetails?.FatherName, candidate.FamilyDetails?.FatherName],
              ["Mother's Name", user.FamilyDetails?.MotherName, candidate.FamilyDetails?.MotherName],
              ["Father's Occupation", user.FamilyDetails?.FatherOccupation, candidate.FamilyDetails?.FatherOccupation],
              ["Mother's Occupation", user.FamilyDetails?.MotherOccupation, candidate.FamilyDetails?.MotherOccupation],
              ["No of Siblings", user.FamilyDetails?.NoOfSiblings, candidate.FamilyDetails?.NoOfSiblings],
            ])}

            {/* RELIGIOUS DETAILS */}
            {renderSection("Religious Details", [
              ["Religion", user.ReligiousDetails?.Religion, candidate.ReligiousDetails?.Religion],
              ["Community", user.ReligiousDetails?.Community, candidate.ReligiousDetails?.Community],
              ["Caste", user.ReligiousDetails?.Caste, candidate.ReligiousDetails?.Caste],
              ["Gothram", user.ReligiousDetails?.Gothram, candidate.ReligiousDetails?.Gothram],
            ])}

            {/* PROPERTY DETAILS */}
            {renderSection("Property Details", [
              ["Property Type", user.PropertyDetails?.PropertyType, candidate.PropertyDetails?.PropertyType],
              ["Residential Type", user.PropertyDetails?.ResidentialType, candidate.PropertyDetails?.ResidentialType],
              ["Property Description", user.PropertyDetails?.PropertyDescription, candidate.PropertyDetails?.PropertyDescription],
            ])}

            {/* UPLOAD DETAILS */}
            {renderSection("Upload Details", [
              ["Identity Type", user.Upload?.IdentityType, candidate.Upload?.IdentityType],
              ["Identity Number", user.Upload?.IdentityNumber, candidate.Upload?.IdentityNumber],
              ["Profile Photo", user.Upload?.ProfilePhoto?.[0], candidate.Upload?.ProfilePhoto?.[0]],
              ["Identity Image", user.Upload?.IdentityImage?.[0], candidate.Upload?.IdentityImage?.[0]],
              ["Audio / Video", user.Upload?.AudioVideo?.[0], candidate.Upload?.AudioVideo?.[0]],
            ])}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
