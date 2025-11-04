import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import api from '../../../api'
import Swal from "sweetalert2";
import { ClipboardPaste } from "lucide-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FormControl, CircularProgress, Select, MenuItem, Chip, Box,Checkbox } from "@mui/material";

export default function NewProfileForm() {
  const [step, setStep] = useState(1);

  const user = JSON.parse(localStorage.getItem('user'));

//======================== state for adding a user=========================================

  const[user_profile,setuser_profile]=useState({
    Bureau:user.id,
    PersonalDetails:{
    Name:"",
    DateOfBirth:"",
    TimeOfBirth:"",
    PlaceOfBirth:"",
    Age:"",
    MobileNumber:"",
    Complexion:"",
    Height:"",
    Weight:"",
    MotherTongue:"",
    Gender:"",
    Drinking:"",
    Smoking:"",
    Nri:"",
    NonVeg:"",
    Manglik:"",
    Living:"",
    AnyDisability:"",
    MaritalStatus:""
    },
    ReligiousDetails:{
      Community:"",
      Caste:"",
      Religion:"",
      Gothram:""
    },
     FamilyDetails:{
      FatherName:"",
      MotherName:"",
      FatherOccupation:"",
      MotherOccupation:"",
      NoOfSiblings:"",
      FamilyType:"",
      FamilyDescription:""
    },
      EducationDetails:{
      HighestEducation:"",
      EducationSpecialization:"",
      Occupation:"",
      AnnualFamilyIncome:"",
      EducationDetails:"",
      OccupationDetails:""
    },
      ContactDetails:{
      ParmanentAddress:"",
      Country:"",
      State:"",
      City:"",
      PostalCode:""
    },
      PartnerPrefrences:{
      AgeRange:{MinAge:"",MaxAge:""},
      HeightRange:{MinHeight:"",MaxHeight:""},
      MaritialStatus:"",
      NonVeg:"",
      Manglik:"",
      Nri:"",
      Community:"",
      Religion:"",
      Caste:"",
      MotherTongue:"",
      HeighstEducation:[],
      Occupation:[],
      Country:[],
      State:[],
      City:[]
    },
      Upload:{
      ProfilePhoto:[],
      IdentityType:"",
      IdentityNumber:"",
      IdentityImage:[],
      AudioVideo:[],
      Gallary:[]
    },
      PropertyDetails:{
      PropertyType:"",
      ResidentialType:"",
      PropertyDescription:"",
    },
  })



   const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ✅ Automatically update age whenever DateOfBirth changes
  useEffect(() => {
    const dob = user_profile.PersonalDetails.DateOfBirth;
    if (dob) {
      const age = calculateAge(dob);
      setuser_profile((prev) => ({
        ...prev,
        PersonalDetails: {
          ...prev.PersonalDetails,
          Age: age
        }
      }));
    } else {
      // Clear age if DOB is removed
      setuser_profile((prev) => ({
        ...prev,
        PersonalDetails: {
          ...prev.PersonalDetails,
          Age: ""
        }
      }));
    }
  }, [user_profile.PersonalDetails.DateOfBirth]);


// ===========================common onchange event=======================================

  const handleChange = (section, field, value, isArray = false) => {
  setuser_profile(prev => {
    const sectionData = prev[section] || {};

    // If the field is meant to store multiple values (array)
    if (isArray) {
      let updatedArray = Array.isArray(sectionData[field]) 
        ? [...sectionData[field]] 
        : [];

      if (updatedArray.includes(value)) {
        // Remove value if already selected (toggle behavior)
        updatedArray = updatedArray.filter(item => item !== value);
      } else {
        // Add value if not present
        updatedArray.push(value);
      }

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: updatedArray
        }
      };
    }

    // Otherwise, handle normal single-value field
    return {
      ...prev,
      [section]: {
        ...sectionData,
        [field]: value
      }
    };
  });
};


//=========================== handle image upload to cloudinary===========================

const[loading,setloading]=useState("")
// 🧩 Common upload handler
const handleFileChange = async (e, fieldName) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  setloading(fieldName);

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const res = await api.post("api/upload/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Update nested Upload field dynamically
    setuser_profile((prev) => ({
      ...prev,
      Upload: {
        ...prev.Upload,
        [fieldName]: res.data.urls, // Dynamic field update
      },
    }));
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed!");
  } finally {
    setloading("");
  }
};



//============================== multiple value onchange =================================

    const options = {
    HeighstEducation: ["Bachelor’s", "Master’s", "Doctorate", "Diploma", "Other"],
    Occupation: ["Engineer", "Doctor", "Teacher", "Business", "Artist", "Other"],
    Country: ["India", "USA", "UK", "Canada", "Australia"],
    State: ["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Tamil Nadu"],
    City: ["Mumbai", "Pune", "Delhi", "Bengaluru", "Chennai", "Ahmedabad"],
  };
 
  const [selectedEducation, setselectedEducation] = useState([]);
  const [selectedOccupation, setselectedOccupation] = useState([]);
  const [selectedCountry, setselectedCountry] = useState([]);
  const [selectedState, setselectedState] = useState([]);
  const [selectedCity, setselectedCity] = useState([]);
  

const handleMultiSelectChange = (event, fieldName) => {
    const { value } = event.target;
    const newValues = typeof value === "string" ? value.split(",") : value;

    // Update user_profile directly
    setuser_profile((prev) => ({
      ...prev,
      PartnerPrefrences: {
        ...prev.PartnerPrefrences,
        [fieldName]: newValues,
      },
    }));
  };



//=============================== paste function=========================================

const handlePaste = async () => {
  try {
    const text = await navigator.clipboard.readText();

    // ✅ Extract Personal Details
    const personal = {
      Name: text.match(/Name:\s*(.*)/i)?.[1]?.trim() || "",
      DateOfBirth: text.match(/DOB:\s*([0-9\/\-]+)/i)?.[1]?.trim() || "",
      TimeOfBirth: text.match(/Time:\s*(.*)/i)?.[1]?.trim() || "",
      PlaceOfBirth: text.match(/Place of Birth:\s*(.*)/i)?.[1]?.trim() || "",
      Age: text.match(/Age:\s*(\d+)/i)?.[1]?.trim() || "",
      Height: text.match(/Height:\s*(.*)/i)?.[1]?.trim() || "",
      MobileNumber: text.match(/Contact\s*no:?\s*(\d+)/i)?.[1]?.trim() || "",
      Manglik: text.match(/non\s*mangalik/i)
        ? "No"
        : text.match(/mangalik/i)
        ? "Yes"
        : "",
    };

    // ✅ Extract Religious Details (if included)
    const religion = {
      Religion: text.match(/Religion:\s*(.*)/i)?.[1]?.trim() || "",
      Community: text.match(/Community:\s*(.*)/i)?.[1]?.trim() || "",
      Caste: text.match(/Caste:\s*(.*)/i)?.[1]?.trim() || "",
      Gothram: text.match(/Gothram:\s*(.*)/i)?.[1]?.trim() || "",
    };

    // ✅ Update both objects in state
    setuser_profile((prev) => ({
      ...prev,
      PersonalDetails: {
        ...prev.PersonalDetails,
        ...personal,
      },
      ReligiousDetails: {
        ...prev.ReligiousDetails,
        ...religion,
      },
    }));

    Swal.fire({
      icon: "success",
      title: "Data Pasted Successfully!",
      text: "WhatsApp message parsed and added to all sections.",
      timer: 2000,
      showConfirmButton: true,
    });
  } catch (err) {
    console.error("Error parsing data:", err);
    Swal.fire({
      icon: "error",
      title: "Invalid Data Format",
      text: "Please copy a valid WhatsApp message format.",
    });
  }
};


//========================= post method for adding new profile===============================

const add_new_profile=async()=>
{
  try {

      const resp=await api.post('api/user/add-new-profile',user_profile)

       if (resp.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Profile Created!",
        text: resp.data.message || "User profile created successfully",
        showConfirmButton: true,
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-confirm-btn"
        }, 
      }).then(() => {
        // Refresh the page after alert closes
        window.location.reload();
      });
    }
      
    
  } catch (error) {
    console.log(error);

     Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error.response?.data?.error ||
        "Something went wrong! Please try again.",
      showConfirmButton: true,
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "swal-confirm-btn"
      }, 
    });
    
  }
}




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


    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="paste-tooltip">Paste WhatsApp Data</Tooltip>}
    >
<button
  onClick={handlePaste}
  className="relative flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 mt-2 rounded-lg hover:bg-gray-100 transition group"
>
  <ClipboardPaste size={18} color="black" />

  {/* Tooltip */}
  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2px] transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
    Paste WhatsApp Data
  </span>
</button>
</OverlayTrigger>


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
      name="Name"
      value={user_profile.PersonalDetails.Name}
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      placeholder="Enter your full name"
      onChange={(e) => handleChange("PersonalDetails", "Name", e.target.value)}
    />
  </div>

  {/* Date of Birth */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Date of Birth
    </label>
    <input
      type="date"
      name="DateOfBirth"
      value={user_profile?.PersonalDetails?.DateOfBirth? new Date(user_profile.PersonalDetails.DateOfBirth)
          .toISOString()
          .split("T")[0] // ✅ Converts to 'YYYY-MM-DD'
      : ""
  }
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      onChange={(e) => handleChange("PersonalDetails", "DateOfBirth", e.target.value)}
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
      name="TimeOfBirth"
      onChange={(e) => handleChange("PersonalDetails", "TimeOfBirth", e.target.value)}
      value={user_profile.PersonalDetails.TimeOfBirth}
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
      name="PlaceOfBirth"
      onChange={(e) => handleChange("PersonalDetails", "PlaceOfBirth", e.target.value)}
      value={user_profile.PersonalDetails.PlaceOfBirth}
    />
  </div>

  {/* Age */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Age
    </label>
    <input
      readOnly
      type="number"
      placeholder="Enter age"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="Age"
      onChange={(e) => handleChange("PersonalDetails", "Age", e.target.value)}
      value={user_profile.PersonalDetails.Age}
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
      name="MobileNumber"
      onChange={(e) => handleChange("PersonalDetails", "MobileNumber", e.target.value)}
      value={user_profile.PersonalDetails.MobileNumber}
    />
  </div>

  {/* Complexion */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Complexion
    </label>
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="Complexion"
      onChange={(e) => handleChange("PersonalDetails", "Complexion", e.target.value)}
    >
       <option value={user_profile?.PersonalDetails?.Complexion || ""}>
        {user_profile?.PersonalDetails?.Complexion || "Select Complexion"}
      </option>
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
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="Height"
      onChange={(e) => handleChange("PersonalDetails", "Height", e.target.value)}
    >
     <option value={user_profile?.PersonalDetails?.Height || ""}>
        {user_profile?.PersonalDetails?.Height || "Select height"}
      </option>

      {/* <option value="">Select height</option> */}
      <option>5 ft.0 inch</option>
      <option>5 ft.5 inch</option>
      <option>6 ft.0 inch</option>
      <option>6 ft.2 inch</option>
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
      name="Weight"
      onChange={(e) => handleChange("PersonalDetails", "Weight", e.target.value)}
      value={user_profile.PersonalDetails.Weight}
    />
  </div>

  {/* Mother Tongue */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Mother Tongue
    </label>
    <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="MotherTongue"
      onChange={(e) => handleChange("PersonalDetails", "MotherTongue", e.target.value)}
    >
       <option value={user_profile?.PersonalDetails?.MotherTongue || ""}>
        {user_profile?.PersonalDetails?.MotherTongue || "Select Mother Tongue"}
      </option>
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
        <input type="radio" name="Gender" value="Male" className="accent-red-600"
          checked={user_profile.PersonalDetails.Gender === "Male"}
          onChange={(e) => handleChange("PersonalDetails", "Gender", e.target.value)}
        />
        Male
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="Gender" value="Female" className="accent-red-600"
          checked={user_profile.PersonalDetails.Gender === "Female"}
          onChange={(e) => handleChange("PersonalDetails", "Gender", e.target.value)}
        />
        Female
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="Gender" value="Other" className="accent-red-600"
          checked={user_profile.PersonalDetails.Gender === "Other"}
          onChange={(e) => handleChange("PersonalDetails", "Gender", e.target.value)}
        />
        Other
      </label>
    </div>
  </div>

  {/* Lifestyle Choices */}
  {[
    "Drinking",
    "Smoking",
    "NonVeg",
    "Nri",
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
            checked={user_profile.PersonalDetails[label] === "Yes"}
            onChange={(e) => handleChange("PersonalDetails", label, e.target.value)}
          />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={label.toLowerCase().replace(/\s+/g, "")}
            value="No"
            className="accent-red-600"
            checked={user_profile.PersonalDetails[label] === "No"}
            onChange={(e) => handleChange("PersonalDetails", label, e.target.value)}
          />
          No
        </label>
      </div>
    </div>
  ))}

   {/* Living */}

      <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Living
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="Living" value="Single" className="accent-red-600"
            checked={user_profile.PersonalDetails.Living === "Single"}
            onChange={(e) => handleChange("PersonalDetails", "Living", e.target.value)}
        />
        Single
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="Living" value="With Parent/Family" className="accent-red-600" 
            checked={user_profile.PersonalDetails.Living === "With Parent/Family"}
            onChange={(e) => handleChange("PersonalDetails", "Living", e.target.value)}
        />
        With Parent/Family
      </label>
    </div>
  </div>

 {/* Any Disability */}
    <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Any Disability
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="AnyDisability" value="None" className="accent-red-600" 
            checked={user_profile.PersonalDetails.AnyDisability === "None"}
            onChange={(e) => handleChange("PersonalDetails", "AnyDisability", e.target.value)}
        />
        None
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="AnyDisability" value="Physical Disabled" className="accent-red-600" 
            checked={user_profile.PersonalDetails.AnyDisability === "Physical Disabled"}
            onChange={(e) => handleChange("PersonalDetails", "AnyDisability", e.target.value)}
        />
        Physical Disabled
      </label>
    </div>
  </div>

   {/* Maritial Status */}

   <div className="sm:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Marital Status
    </label>
    <div className="flex gap-6">
      <label className="flex items-center gap-2">
        <input type="radio" name="MaritalStatus" value="Single" className="accent-red-600" 
            checked={user_profile.PersonalDetails.MaritalStatus === "Single"}
            onChange={(e) => handleChange("PersonalDetails", "MaritalStatus", e.target.value)}
        />
        Single
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="MaritalStatus" value="Divorce" className="accent-red-600" 
            checked={user_profile.PersonalDetails.MaritalStatus === "Divorce"}
            onChange={(e) => handleChange("PersonalDetails", "MaritalStatus", e.target.value)}
        />
        Divorce
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="MaritalStatus" value="Widow/Widower" className="accent-red-600"
            checked={user_profile.PersonalDetails.MaritalStatus === "Widow/Widower"}
            onChange={(e) => handleChange("PersonalDetails", "MaritalStatus", e.target.value)}
        />
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

 {/* Community */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Community</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        onChange={(e) => handleChange("ReligiousDetails", "Community", e.target.value)}
      >
        <option value={user_profile?.ReligiousDetails?.Community || ""}>
        {user_profile?.ReligiousDetails?.Community || "Select Religion"}
        </option>
        <option>Hindu</option>
        <option>Muslim</option>
        <option>Christian</option>
        <option>Sikh</option>
        <option>Buddhist</option>
        <option>Jain</option>
        <option>Other</option>
      </select>
    </div>

 {/* Caste */}

    <div>
      <label className="block text-gray-700 font-medium mb-1">Caste</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      onChange={(e) => handleChange("ReligiousDetails", "Caste", e.target.value)}
      >
        <option value={user_profile?.ReligiousDetails?.Caste || ""}>
        {user_profile?.ReligiousDetails?.Caste || "Select Caste"}
        </option>
        <option value="brahmin">Brahmin</option>
        <option value="rajput">Rajput</option>
        <option value="yadav">Yadav</option>
        <option value="baniya">Baniya</option>
        <option value="kurmi">Kurmi</option>
        <option value="gupta">Gupta</option>
        <option value="other">Other</option>
      </select>
    </div>

 {/* Religion */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Religion</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      onChange={(e) => handleChange("ReligiousDetails", "Religion", e.target.value)}
      >
        <option value={user_profile?.ReligiousDetails?.Religion || ""}>
        {user_profile?.ReligiousDetails?.Religion || "Select Religion"}
        </option>
        <option value="sub1">Sub-caste 1</option>
        <option value="sub2">Sub-caste 2</option>
        <option value="sub3">Sub-caste 3</option>
        <option value="other">Other</option>
      </select>
    </div>

 {/* Gothram */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Gothram</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      onChange={(e) => handleChange("ReligiousDetails", "Gothram", e.target.value)}
      >
        <option value={user_profile?.ReligiousDetails?.Gothram || ""}>
        {user_profile?.ReligiousDetails?.Gothram || "Select Gotra"}
        </option>
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
        name="FatherName"
        value={user_profile.FamilyDetails.FatherName}
        onChange={(e) => handleChange("FamilyDetails", "FatherName", e.target.value)}
      />
    </div>

    {/* Mother’s Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Mother’s Name</label>
      <input
        type="text"
        placeholder="Enter Mother’s Name"
        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MotherName"
        value={user_profile.FamilyDetails.MotherName}
        onChange={(e) => handleChange("FamilyDetails", "MotherName", e.target.value)}
      />
    </div>

    {/* Father’s Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Father’s Occupation</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="FatherOccupation"
        onChange={(e) => handleChange("FamilyDetails", "FatherOccupation", e.target.value)}
      >
        <option value={user_profile?.FamilyDetails?.FatherOccupation || ""}>
          {user_profile?.FamilyDetails?.FatherOccupation || "Select Occupation"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MotherOccupation"
        onChange={(e) => handleChange("FamilyDetails", "MotherOccupation", e.target.value)}
      >
        <option value={user_profile?.FamilyDetails?.MotherOccupation || ""}>
          {user_profile?.FamilyDetails?.MotherOccupation || "Select Occupation"}
        </option>
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
        name="NoOfSiblings"
        value={user_profile.FamilyDetails.NoOfSiblings}
        onChange={(e) => handleChange("FamilyDetails", "NoOfSiblings", e.target.value)}
      />
    </div>

    {/* Family Type */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Family Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="FamilyType"
        onChange={(e) => handleChange("FamilyDetails", "FamilyType", e.target.value)}
      >
        <option value={user_profile?.FamilyDetails?.FamilyType || ""}>
          {user_profile?.FamilyDetails?.FamilyType || "Select Family Type"}
        </option>
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
      name="FamilyDescription"
      value={user_profile.FamilyDetails.FamilyDescription}
      onChange={(e) => handleChange("FamilyDetails", "FamilyDescription", e.target.value)}
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
        name="HighestEducation"
        value={user_profile.EducationDetails.HighestEducation}
        onChange={(e) => handleChange("EducationDetails", "HighestEducation", e.target.value)}
      />
    </div>

    {/* Education Specialization */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Education Specialization</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="EducationSpecialization"
        onChange={(e) => handleChange("EducationDetails", "EducationSpecialization", e.target.value)}
      >
        <option value={user_profile?.EducationDetails?.EducationSpecialization || ""}>
          {user_profile?.EducationDetails?.EducationSpecialization || "Select Specialization"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="Occupation"
      onChange={(e) => handleChange("EducationDetails", "Occupation", e.target.value)}
      >
        <option value={user_profile?.EducationDetails?.Occupation || ""}>
          {user_profile?.EducationDetails?.Occupation || "Select Occupation"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="AnnualFamilyIncome"
      onChange={(e) => handleChange("EducationDetails", "AnnualFamilyIncome", e.target.value)}
      >
         <option value={user_profile?.EducationDetails?.AnnualFamilyIncome || ""}>
          {user_profile?.EducationDetails?.AnnualFamilyIncome|| "Select Annual Family Income"}
        </option>
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
      name="EducationDetails"
      value={user_profile.EducationDetails.EducationDetails}
      onChange={(e) => handleChange("EducationDetails", "EducationDetails", e.target.value)}
    ></textarea>
  </div>

  {/* Occupation Details */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">Occupation Details</label>
    <textarea
      placeholder="Describe your occupation details"
      rows="4"
      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
      name="OccupationDetails"
      value={user_profile.EducationDetails.OccupationDetails}
      onChange={(e) => handleChange("EducationDetails", "OccupationDetails", e.target.value)}
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
        name="ParmanentAddress"
        value={user_profile.ContactDetails.ParmanentAddress}
        onChange={(e) => handleChange("ContactDetails", "ParmanentAddress", e.target.value)}
      ></textarea>
    </div>

    {/* Country */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Country</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="Country"
        onChange={(e) => handleChange("ContactDetails", "Country", e.target.value)}
      >
        <option value={user_profile?.ContactDetails?.Country || ""}>
          {user_profile?.ContactDetails?.Country|| "Select Country"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="State"
        onChange={(e) => handleChange("ContactDetails", "State", e.target.value)}
      >
        <option value={user_profile?.ContactDetails?.State || ""}>
          {user_profile?.ContactDetails?.State|| "Select State"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="City"
        onChange={(e) => handleChange("ContactDetails", "City", e.target.value)}
      >
        <option value={user_profile?.ContactDetails?.City || ""}>
          {user_profile?.ContactDetails?.City|| "Select City"}
        </option>
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
        name="PostalCode"
        value={user_profile.ContactDetails.PostalCode}
        onChange={(e) => handleChange("ContactDetails", "PostalCode", e.target.value)}
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
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MinAge"
        onChange={(e) => setuser_profile({ ...user_profile, PartnerPrefrences: { ...user_profile.PartnerPrefrences, AgeRange: { ...user_profile.PartnerPrefrences.AgeRange, MinAge: e.target.value } } })}
        >
          <option value={user_profile?.PartnerPrefrences?.AgeRange?.MinAge || ""}>
          {user_profile?.PartnerPrefrences?.AgeRange.MinAge|| "Min Age"}
        </option>
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i} value={i + 18}>{i + 18}</option>
          ))}
        </select>
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MaxAge"
        onChange={(e) => setuser_profile({ ...user_profile, PartnerPrefrences: { ...user_profile.PartnerPrefrences, AgeRange: { ...user_profile.PartnerPrefrences.AgeRange, MaxAge: e.target.value } } })}
        >
        <option value={user_profile?.PartnerPrefrences?.AgeRange?.MaxAge || ""}>
          {user_profile?.PartnerPrefrences?.AgeRange.MaxAge|| "Max Age"}
        </option>
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
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MinHeight"
        onChange={(e) => setuser_profile({ ...user_profile, PartnerPrefrences: { ...user_profile.PartnerPrefrences, HeightRange: { ...user_profile.PartnerPrefrences.HeightRange, MinHeight: e.target.value } } })}
        >
        <option value={user_profile?.PartnerPrefrences?.HeightRange?.MinHeight || ""}>
          {user_profile?.PartnerPrefrences?.HeightRange.MinHeight|| "Min Height"}
        </option>
          {["4'5", "4'8", "5'0", "5'2", "5'5", "5'8", "6'0", "6'2", "6'5"].map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
          name="MaxHeight"
          onChange={(e) => setuser_profile({ ...user_profile, PartnerPrefrences: { ...user_profile.PartnerPrefrences, HeightRange: { ...user_profile.PartnerPrefrences.HeightRange, MaxHeight: e.target.value } } })}
          >
          <option value={user_profile?.PartnerPrefrences?.HeightRange?.MaxHeight || ""}>
          {user_profile?.PartnerPrefrences?.HeightRange.MaxHeight|| "Max Height"}
        </option>
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
        <label>
          <input type="radio" name="MaritialStatus" value="Single"
            checked={user_profile.PartnerPrefrences.MaritialStatus === "Single"}
            onChange={(e) => handleChange("PartnerPrefrences", "MaritialStatus", e.target.value)}
          /> 
          Single
          </label>
        <label>
          <input type="radio" name="MaritialStatus" value="Divorced"
            checked={user_profile.PartnerPrefrences.MaritialStatus === "Divorced"}
            onChange={(e) => handleChange("PartnerPrefrences", "MaritialStatus", e.target.value)}
          /> Divorced
          </label>
        <label>
          <input type="radio" name="MaritialStatus" value="Widow/Widower"
            checked={user_profile.PartnerPrefrences.MaritialStatus === "Widow/Widower"}
            onChange={(e) => handleChange("PartnerPrefrences", "MaritialStatus", e.target.value)}
          /> 
          Widow/Widower
          </label>
      </div>
    </div>

    {/* Food Preference */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Non-Veg</label>
      <div className="flex gap-3">
        <label>
          <input type="radio" name="non-veg" value="Yes"
            checked={user_profile.PartnerPrefrences.NonVeg === "Yes"}
            onChange={(e) => handleChange("PartnerPrefrences", "NonVeg", e.target.value)}
          />
           Yes
          </label>
        <label><input type="radio" name="non-veg" value="No" 
            checked={user_profile.PartnerPrefrences.NonVeg === "No"}
            onChange={(e) => handleChange("PartnerPrefrences", "NonVeg", e.target.value)}
        /> 
          No
        </label>
      </div>
    </div>

    {/* Manglik */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Manglik</label>
      <div className="flex gap-3">
        <label><input type="radio" name="manglik" value="Yes"
            checked={user_profile.PartnerPrefrences.Manglik === "Yes"}
            onChange={(e) => handleChange("PartnerPrefrences", "Manglik", e.target.value)}
        /> Yes
        </label>
        <label>
          <input type="radio" name="manglik" value="No" 
            checked={user_profile.PartnerPrefrences.Manglik === "No"}
            onChange={(e) => handleChange("PartnerPrefrences", "Manglik", e.target.value)}
          /> 
          No
          </label>
      </div>
    </div>

    {/* NRI */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Nri</label>
      <div className="flex gap-3">
        <label><input type="radio" name="nri" value="Yes" 
            checked={user_profile.PartnerPrefrences.Nri === "Yes"}
            onChange={(e) => handleChange("PartnerPrefrences", "Nri", e.target.value)}
        /> Yes
        </label>
        <label><input type="radio" name="nri" value="No" 
            checked={user_profile.PartnerPrefrences.Nri === "No"}
            onChange={(e) => handleChange("PartnerPrefrences", "Nri", e.target.value)}
        /> No</label>
      </div>
    </div>

    {/* Community */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Community</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="Community"
        onChange={(e) => handleChange("PartnerPrefrences", "Community", e.target.value)}
      >
        <option value={user_profile?.PartnerPrefrences?.Community || ""}>
          {user_profile?.PartnerPrefrences?.Community|| "Select Community"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="Religion"
        onChange={(e) => handleChange("PartnerPrefrences", "Religion", e.target.value)}
      >
        <option value={user_profile?.PartnerPrefrences?.Religion || ""}>
          {user_profile?.PartnerPrefrences?.Religion|| "Select Religion"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="MotherTongue"
        onChange={(e) => handleChange("PartnerPrefrences", "MotherTongue", e.target.value)}
      >
        <option value={user_profile?.PartnerPrefrences?.MotherTongue || ""}>
          {user_profile?.PartnerPrefrences?.MotherTongue|| "Select Mother Tongue"}
        </option>
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
      <label className="block text-gray-700 font-medium mb-1">
        Highest Education
      </label>

      <FormControl fullWidth>
        <Select
          name="HeighstEducation"
          multiple
          value={selectedEducation}
          onChange={(e) => {
          const newValues = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
          setselectedEducation(newValues);
          handleMultiSelectChange(e, "HeighstEducation");
        }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#888" }}>Select Education</span>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
         
        >
          {options.HeighstEducation.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={selectedEducation.includes(option)}
                color="primary"
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    
    </div>


    {/* Occupation */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Occupation</label>
  <FormControl fullWidth>
        <Select
          name="Occupation"
          multiple
          value={selectedOccupation}
          onChange={(e) => {
          const newValues = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
          setselectedOccupation(newValues);
          handleMultiSelectChange(e, "Occupation");
        }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#888" }}>Select Occupation</span>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
         
        >
          {options.Occupation.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={selectedOccupation.includes(option)}
                color="primary"
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

    {/* Country */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Country</label>
      <FormControl fullWidth>
        <Select
          name="Country"
          multiple
          value={selectedCountry}
          onChange={(e) => {
          const newValues = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
          setselectedCountry(newValues);
          handleMultiSelectChange(e, "Country");
        }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#888" }}>Select Country</span>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
         
        >
          {options.Country.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={selectedCountry.includes(option)}
                color="primary"
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

    {/* State */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">State</label>
      <FormControl fullWidth>
        <Select
          name="State"
          multiple
          value={selectedState}
          onChange={(e) => {
          const newValues = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
          setselectedState(newValues);
          handleMultiSelectChange(e, "State");
        }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#888" }}>Select State</span>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
         
        >
          {options.State.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={selectedState.includes(option)}
                color="primary"
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

    {/* City */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">City</label>
  <FormControl fullWidth>
        <Select
          name="City"
          multiple
          value={selectedCity}
          onChange={(e) => {
          const newValues = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
          setselectedCity(newValues);
          handleMultiSelectChange(e, "City");
        }}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#888" }}>Select City</span>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
         
        >
          {options.City.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={selectedCity.includes(option)}
                color="primary"
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      <input type="file" accept="image/*" className="w-full cursor-pointer" 
      name="ProfilePhoto"
      onChange={(e)=>handleFileChange(e,"ProfilePhoto")}
      />
    </div>
    <div className="mt-3">
      <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
        {loading==="ProfilePhoto" && <CircularProgress size={24} />}
        {user_profile.Upload.ProfilePhoto && (
          <img
            src={user_profile.Upload.ProfilePhoto}
            alt="Profile Preview"
            className="mx-auto mt-3 w-24 h-24  object-cover "
          />
        )}
      </div>
    </div>
  </div>

  {/* Identity Type & Number */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Identity Type</label>
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="IdentityType"
        onChange={(e) => handleChange("Upload", "IdentityType", e.target.value)}
      >
        <option value={user_profile?.Upload?.IdentityType || ""}>
          {user_profile?.Upload?.IdentityType|| "Select Identity Type"}
        </option>
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
        name="IdentityNumber"
        value={user_profile.Upload.IdentityNumber}
        onChange={(e) => handleChange("Upload", "IdentityNumber", e.target.value)}
      />
    </div>
  </div>

  {/* Identity Image Upload */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Upload Identity Image</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 mb-3">Click to upload your ID image</p>
      <input type="file" accept="image/*" className="w-full cursor-pointer"
        name="IdentityImage"
        onChange={(e)=>handleFileChange(e,"IdentityImage")}
      />
    </div>
    <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
        {loading==="IdentityImage" && <CircularProgress size={24} />}
        {user_profile?.Upload?.IdentityImage && (
          <img
            src={user_profile.Upload.IdentityImage}
            alt="Identity Preview"
            className="mx-auto mt-3 w-24 h-24  object-cover "
          />
        )}
    </div>
  </div>

  {/* Audio / Video Upload */}
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Upload Audio / Video
  </label>

  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
    <p className="text-gray-600 mb-3">
      Click to upload an audio or video file
    </p>
    <input
      type="file"
      accept="audio/*,video/*"
      className="w-full cursor-pointer"
      name="AudioVideo"
      onChange={(e) => handleFileChange(e, "AudioVideo")}
    />
  </div>

  <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
    {loading==="AudioVideo" && <CircularProgress size={24} />}
    {Array.isArray(user_profile?.Upload?.AudioVideo) &&
      user_profile.Upload.AudioVideo.map((file, index) => (
        <div key={index} className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".webm") ? (
            <video
              src={file}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <audio
              src={file}
              controls
              className="w-full"
            />
          )}
        </div>
      ))}

    {/* fallback if no file uploaded */}
    {(!user_profile?.Upload?.AudioVideo ||
      user_profile.Upload.AudioVideo.length === 0) && (
      <div className="w-32 h-20  rounded-lg flex items-center justify-center text-gray-400 text-sm">
        Media Preview
      </div>
    )}
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
        name="Gallary"
        onChange={(e)=>handleFileChange(e,"Gallary")}
      />
    </div>
    <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
        {loading==="Gallary" && <CircularProgress size={24} />}
       {Array.isArray(user_profile?.Upload?.Gallary) &&
        user_profile.Upload.Gallary.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="Profile Preview"
            className="mx-auto mt-3 w-24 h-24 object-cover rounded-lg"
          />
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="PropertyType"
        onChange={(e) => handleChange("PropertyDetails", "PropertyType", e.target.value)}
      >
        <option value={user_profile?.PropertyDetails?.PropertyType || ""}>
          {user_profile?.PropertyDetails?.PropertyType|| "Select Property Type"}
        </option>
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
      <select className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
        name="ResidentialType"
        onChange={(e) => handleChange("PropertyDetails", "ResidentialType", e.target.value)}
      >
         <option value={user_profile?.PropertyDetails?.ResidentialType || ""}>
          {user_profile?.PropertyDetails?.ResidentialType|| "Select Residential Type"}
        </option>
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
      name="PropertyDescription"
      onChange={(e) => handleChange("PropertyDetails", "PropertyDescription", e.target.value)}
      value={user_profile.PropertyDetails.PropertyDescription}
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
              onClick={add_new_profile}
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
