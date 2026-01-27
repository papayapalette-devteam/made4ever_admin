import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import api from "../../../api";
import Swal from "sweetalert2";
import { ClipboardPaste } from "lucide-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FormControl,
  CircularProgress,
  Select,
  MenuItem,
  Chip,
  Box,
  Checkbox,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function NewProfileForm() {
  const [step, setStep] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));

  const location=useLocation()
  const existing_user_profile=location?.state?.id


  //======================== state for adding a user=========================================

  const [user_profile, setuser_profile] = useState({
    Bureau: user._id,
    PersonalDetails: {
      Name: "",
      DateOfBirth: "",
      TimeOfBirth: "",
      PlaceOfBirth: "",
      Age: "",
      Complexion: "",
      Height: "",
      Weight: "",
      MotherTongue: "",
      Gender: "",
      Drinking: "",
      Smoking: "",
      Nri: "",
      PermanentResident:"",
      TemporaryResident:"",
      NonVeg: "",
      Manglik: "",
      Living: "",
      AnyDisability: "",
      MaritalStatus: "",
      HasChildren: false,     
      ChildrenCount: 0, 

    },
    ReligiousDetails: {
      Community: "",
      Caste: "",
      Religion: "",
      Gothram: "",
    },
    FamilyDetails: {
      FatherName: "",
      MotherName: "",
      FatherOccupation: "",
      MotherOccupation: "",
      NoOfSiblings: "",
      FamilyType: "",
      FamilyDescription: "",
    },
    EducationDetails: {
      HighestEducation: "",
      EducationSpecialization: "",
      Occupation: "",
      AnnualFamilyIncome: "",
      PersonalIncome: "",
      EducationDetails: "",
      OccupationDetails: "",
    },
    ContactDetails: {
      ParmanentAddress: "",
      Country: "",
      State: "",
      City: "",
      PostalCode: "",
    },
    PartnerPrefrences: {
      AgeRange: { MinAge: "", MaxAge: "" },
      HeightRange: { MinHeight: "", MaxHeight: "" },
      MaritialStatus: "",
      HasChildren: false,     
      ChildrenCount: 0,
      NonVeg: "",
      Manglik: "",
      Nri: "",
      PermanentResident:"",
      TemporaryResident:"",
      Community: "",
      Religion: "",
      Caste: "",
      MotherTongue: "",
      AnnualFamilyIncome: "",
      PersonalIncome: "",
      PropertySize:"",
      HeighstEducation: [],
      Occupation: [],
      Country: [],
      State: [],
      City: [],
    },
    Upload: {
      ProfilePhoto: [],
      IdentityType: "",
      IdentityNumber: "",
      IdentityImage: [],
      AudioVideo: [],
      Gallary: [],
    },
    PropertyDetails: {
      PropertyType: "",
      ResidentialType: "",
      PropertySize: "",
      PropertyDescription: "",
    },
  });



useEffect(() => {
  if (existing_user_profile) {
    // Clone the existing profile
    const updatedProfile = { ...existing_user_profile };

    // Convert Bureau object to its string ID
    if (updatedProfile.Bureau && typeof updatedProfile.Bureau === "object") {
      updatedProfile.Bureau = updatedProfile.Bureau._id || updatedProfile.Bureau.id || "";
    }

    // Remove top-level createdAt & updatedAt
    delete updatedProfile.createdAt;
    delete updatedProfile.updatedAt;
    delete updatedProfile.__v;

    // Recursive cleaner for nested objects
    const cleanObject = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      } else if (obj && typeof obj === "object") {
        const cleaned = {};
        for (const key in obj) {
          // Remove unwanted fields
          if (["_id", "createdAt", "updatedAt", "__v"].includes(key)) continue;
          cleaned[key] = cleanObject(obj[key]);
        }
        return cleaned;
      }
      return obj;
    };

    // Clean nested objects but keep top-level _id
    for (const key in updatedProfile) {
      if (key !== "_id" && key !== "Bureau") {
        updatedProfile[key] = cleanObject(updatedProfile[key]);
      }
    }

    // ✅ Set the cleaned profile to state
    setuser_profile(updatedProfile);

  }
}, [existing_user_profile]);



  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
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
          Age: age,
        },
      }));
    } else {
      // Clear age if DOB is removed
      setuser_profile((prev) => ({
        ...prev,
        PersonalDetails: {
          ...prev.PersonalDetails,
          Age: "",
        },
      }));
    }
  }, [user_profile.PersonalDetails.DateOfBirth]);


  // get mother tongue

  const[select_loading,setselect_loading]=useState("")

   const [All_Mother_Tongue, setAll_Mother_Tongue] = useState([]);
  const getall_mother_tongue = async () => {
    try {
      setselect_loading("mother_tongue");
      const params = new URLSearchParams();
      params.append("lookup_type", "mother_tongue");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Mother_Tongue(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

// get community

  const [All_Community_Group, setAll_Community_Group] = useState([]);

  const getall_community_group = async () => {
    try {
      setselect_loading("community");
      const params = new URLSearchParams();
      params.append("lookup_type", "community_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Community_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };


  

  // get religion

   const [All_Religion_Group, setAll_Religion_Group] = useState([]);

  const getall_religion_group = async () => {
    try {
      setselect_loading("religion");
      const params = new URLSearchParams();
      params.append("lookup_type", "religion_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Religion_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get cast

   const [All_Cast_Group, setAll_Cast_Group] = useState([]);
  const getall_cast_group = async () => {
    try {
      setselect_loading("cast");
      const params = new URLSearchParams();
      params.append("lookup_type", "cast_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Cast_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get gotra

   const [All_Gothra_Group, setAll_Gothra_Group] = useState([]);
  const getall_gothra_group = async () => {
    try {
      setselect_loading("gotra");
      const params = new URLSearchParams();
      params.append("lookup_type", "gothra_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Gothra_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get occupation 

    const [All_Occupation, setAll_Occupation] = useState([]);
  const getall_occupation = async () => {
    try {
      setselect_loading("occupation");
      const params = new URLSearchParams();
      params.append("lookup_type", "occupation");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Occupation(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get education

  const [All_Education_Group, setAll_Education_Group] = useState([]);
  const getAll_Education_Group = async () => {
    try {
      setselect_loading("education");
      const params = new URLSearchParams();
      params.append("lookup_type", "education_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Education_Group(resp.data.data)
    } catch (error) {
      console.error(error);
    } finally {
      setselect_loading("");
    }
  };

  // useEffect(()=>
  // {
  //   getAll_Education_Group()
  // },[])


  // get education specialization

  const [All_Education_Specialization, setAll_Education_Specialization] =useState([]);
  const getall_education_specialization = async () => {
    try {
      setselect_loading("education_specialization");
      const params = new URLSearchParams();
      params.append("lookup_type", "education_specialization");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Education_Specialization(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get income

  
  const [All_Income_Group, setAll_Income_Group] = useState([]);
  const getall_income_group = async () => {
    try {
      setselect_loading("income");
      const params = new URLSearchParams();
      params.append("lookup_type", "income_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Income_Group(resp.data.data);
  
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get country

    const [All_Country_Group, setAll_Country_Group] = useState([]);
  const getall_country_group = async () => {
    try {
      setselect_loading("country");
      const params = new URLSearchParams();
      params.append("lookup_type", "country_group");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Country_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get state

   const [All_State_Group, setAll_State_Group] = useState([]);
  const getall_state_group = async (selectedId) => {
    try {
      setselect_loading("state");
      const params = new URLSearchParams();
      params.append("lookup_type", "state_group");
      params.append("parent_lookup_id", selectedId);
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_State_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get city

    const [All_City_Group, setAll_City_Group] = useState([]);
  const getall_city_group = async (selectedId) => {
    try {
      setselect_loading("city");
      const params = new URLSearchParams();
      params.append("lookup_type", "city_group");
      params.append("parent_lookup_id", selectedId);
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_City_Group(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get property type

   const [All_Property_Type, setAll_Property_Type] = useState([]);

  const getall_property_type = async () => {
    try {
      setselect_loading("property_type");
      const params = new URLSearchParams();
      params.append("lookup_type", "property_type");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Property_Type(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

   // get property size

   const [All_Property_Size, setAll_Property_Size] = useState([]);

  const getall_property_size = async () => {
    try {
      setselect_loading("property_size");
      const params = new URLSearchParams();
      params.append("lookup_type", "property_size");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Property_Size(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get ResidentialType

  const [All_Residence_Type, setAll_Residence_Type] = useState([]);
  const getall_residence_type = async () => {
    try {
      setselect_loading("residence_type");
      const params = new URLSearchParams();
      params.append("lookup_type", "residence_type");
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_Residence_Type(resp.data.data)
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // ===========================common onchange event=======================================

  const handleChange = (section, field, value, isArray = false) => {
    setuser_profile((prev) => {
      const sectionData = prev[section] || {};

      // If the field is meant to store multiple values (array)
      if (isArray) {
        let updatedArray = Array.isArray(sectionData[field])
          ? [...sectionData[field]]
          : [];

        if (updatedArray.includes(value)) {
          // Remove value if already selected (toggle behavior)
          updatedArray = updatedArray.filter((item) => item !== value);
        } else {
          // Add value if not present
          updatedArray.push(value);
        }

        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: updatedArray,
          },
        };
      }

      // Otherwise, handle normal single-value field
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  };

  //=========================== handle image upload to cloudinary===========================

  const [loading, setloading] = useState("");
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

    // ✅ 1. Personal Details extraction
    const personal = {
      Name:
        text.match(
          /(Full Name|Name|Candidate Name|Bride Name|Groom Name|Boy Name|Girl Name|Person Name|Applicant Name|Member Name|User Name|Register Name)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      // DateOfBirth:
      //   text.match(
      //     /(Date of Birth|DOB|Birth Date|Born On|Birthday|D\.O\.B|Born Date|Birth Day|Date of Birth \(DD\/MM\/YYYY\)|Date of Birth \(MM\-DD\-YYYY\))\s*[:\-]?\s*([0-9\/\-\.\s]+)/i
      //   )?.[2]?.trim() || "",

      // TimeOfBirth:
      //   text.match(
      //     /(Time of Birth|Time|Birth Time|TOB|T\.O\.B|Born At \(Time\)|Birth Timing|Exact Birth Time|Time of Birth \(HH:MM\)|Birth Hour)\s*[:\-]?\s*(.*)/i
      //   )?.[2]?.trim() || "",

      PlaceOfBirth:
        text.match(
          /(Place of Birth|Birth Place|POB|P\.O\.B|Birthplace|Born At \(Place\)|Birth Location|Native Place|Birth City|Birth Town)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      Age:
        text.match(
          /(Age|Current Age|Years|Years Old|Present Age|Age \(Years\)|Age in Years)\s*[:\-]?\s*(\d+)/i
        )?.[2]?.trim() || "",

      Height:
        text.match(
          /(Height|Height \(cm\)|Height \(feet\)|Height in cm|Height in feet|Height \(ft\/inches\)|Body Height|Physical Height|Ht\.)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      Complexion:
        text.match(
          /(Complexion|Skin Tone|Skin Color|Skin Complexion|Color|Appearance|Fair\/Wheatish\/Dark|Body Complexion|Complexion Type)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      MobileNumber:
        text.match(
          /(Mobile|Contact|Phone|WhatsApp|Cell)\s*(Number|No|#)?\s*[:\-]?\s*(\d{10,})/i
        )?.[3]?.trim() || "",

      Manglik: text.match(/(non\s*mangalik|not\s*manglik)/i)
        ? "No"
        : text.match(
            /(manglik|mangal dosha|chevvai dosham|mars effect|mangal|mangalik dosha)/i
          )
        ? "Yes"
        : "",
    };

    // ✅ 2. Religious Details
    const religion = {
      Religion:
        text.match(/(Religion)\s*[:\-]?\s*(.*)/i)?.[2]?.trim() || "",
      Community:
        text.match(/(Community)\s*[:\-]?\s*(.*)/i)?.[2]?.trim() || "",
      Caste:
        text.match(
          /(Caste|Sub-Caste|Subcaste|Caste\/Sub-Caste|Sect|Varna|Ethnic Group|Religion & Caste)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",
      Gothram:
        text.match(/(Gotra|Gothra|Gothram)\s*[:\-]?\s*(.*)/i)?.[2]?.trim() || "",
    };

    // ✅ 3. Family Details
    const family = {
      FatherName:
        text.match(
          /(Father Name|Father's Full Name|Father|Dad's Name|Parent Name \(Father\)|Paternal Name)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      FatherOccupation:
        text.match(
          /(Father's Occupation|Father's Job|Father Work|Father's Business|Dad's Profession|Father's Employment|Father Occupation Details|Father's Career)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      MotherName:
        text.match(
          /(Mother Name|Mother's Full Name|Mother|Mom's Name|Parent Name \(Mother\)|Maternal Name)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",

      MotherOccupation:
        text.match(
          /(Mother's Occupation|Mother's Job|Mother Work|Mother's Business|Mom's Profession|Mother's Employment|Mother Occupation Details|Mother's Career)\s*[:\-]?\s*(.*)/i
        )?.[2]?.trim() || "",
    };

    // ✅ Update the entire user_profile state
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
      FamilyDetails: {
        ...prev.FamilyDetails,
        ...family,
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

  const add_new_profile = async () => {
    try {
      const resp = await api.post("api/user/add-new-profile", user_profile);
     
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: user_profile._id?"Profile Update":"Profile Created!",
          text: resp.data.message || "User profile created successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn",
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
          confirmButton: "swal-confirm-btn",
        },
      });
    }
  };



  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6 px-6 text-center">
          <h1 className="text-3xl font-bold">
              {existing_user_profile ? "Update New Profile" : "Create New Profile"}
            </h1>

            <p className="text-sm opacity-90 mt-1">
              Step {step} of 8 — Complete your details to get the best matches!
            </p>
          </div>
<label className="md:hidden">Paste WhatsApp Data</label>
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
                <div
                  key={num}
                  className="flex flex-col items-center min-w-[80px]"
                >
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
                      onChange={(e) =>
                        handleChange("PersonalDetails", "Name", e.target.value)
                      }
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
                      value={
                        user_profile?.PersonalDetails?.DateOfBirth
                          ? new Date(user_profile.PersonalDetails.DateOfBirth)
                              .toISOString()
                              .split("T")[0] // ✅ Converts to 'YYYY-MM-DD'
                          : ""
                      }
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "DateOfBirth",
                          e.target.value
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "TimeOfBirth",
                          e.target.value
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "PlaceOfBirth",
                          e.target.value
                        )
                      }
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
                      onChange={(e) =>
                        handleChange("PersonalDetails", "Age", e.target.value)
                      }
                      value={user_profile.PersonalDetails.Age}
                    />
                  </div>

            

                  {/* Complexion */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complexion
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="Complexion"
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "Complexion",
                          e.target.value
                        )
                      }
                    >
                      <option
                        value={user_profile?.PersonalDetails?.Complexion || ""}
                      >
                        {user_profile?.PersonalDetails?.Complexion ||
                          "Select Complexion"}
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
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="Height"
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "Height",
                          e.target.value
                        )
                      }
                    >
                      <option
                        value={user_profile?.PersonalDetails?.Height || ""}
                      >
                        {user_profile?.PersonalDetails?.Height ||
                          "Select height"}
                      </option>

                      {/* <option value="">Select height</option> */}
                    <option>4'8"</option>
                    <option>4'9"</option>
                    <option>4'10"</option>
                    <option>4'11"</option>

                    <option>5'0"</option>
                    <option>5'1"</option>
                    <option>5'2"</option>
                    <option>5'3"</option>
                    <option>5'4"</option>
                    <option>5'5"</option>
                    <option>5'6"</option>
                    <option>5'7"</option>
                    <option>5'8"</option>
                    <option>5'9"</option>
                    <option>5'10"</option>
                    <option>5'11"</option>

                    <option>6'0"</option>
                    <option>6'1"</option>
                    <option>6'2"</option>
                    <option>6'3"</option>
                    <option>6'4"</option>
                    <option>6'5"</option>
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
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "Weight",
                          e.target.value
                        )
                      }
                      value={user_profile.PersonalDetails.Weight}
                    />
                  </div>

                  {/* Mother Tongue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mother Tongue
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="MotherTongue"
                      onChange={(e) =>
                        handleChange(
                          "PersonalDetails",
                          "MotherTongue",
                          e.target.value
                        )
                      }
                       onClick={() => {
                          if (All_Mother_Tongue.length === 0) getall_mother_tongue(); 
                        }}
                    >
                      <option
                        value={
                          user_profile?.PersonalDetails?.MotherTongue || ""
                        }
                      >
                        {user_profile?.PersonalDetails?.MotherTongue ||
                          "Select Mother Tongue"}
                      </option>
                      {/* Show loader while fetching */}
                        {select_loading==="mother_tongue" && (
                          <option disabled>Loading...</option>
                        )}
                      {All_Mother_Tongue.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Gender"
                          value="Male"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.Gender === "Male"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "Gender",
                              e.target.value
                            )
                          }
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Gender"
                          value="Female"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.Gender === "Female"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "Gender",
                              e.target.value
                            )
                          }
                        />
                        Female
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Gender"
                          value="Other"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.Gender === "Other"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "Gender",
                              e.target.value
                            )
                          }
                        />
                        Other
                      </label>
                    </div>
                  </div>

                  {/* Lifestyle Choices */}
                  {["Drinking", "Smoking", "NonVeg", "Nri", "Manglik"].map(
                    (label, i) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label === "Nri" ? "NRI" : label}
                          
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={label.toLowerCase().replace(/\s+/g, "")}
                              value="Yes"
                              className="accent-red-600"
                              checked={
                                user_profile.PersonalDetails[label] === "Yes"
                              }
                              onChange={(e) =>
                                handleChange(
                                  "PersonalDetails",
                                  label,
                                  e.target.value
                                )
                              }
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={label.toLowerCase().replace(/\s+/g, "")}
                              value="No"
                              className="accent-red-600"
                              checked={
                                user_profile.PersonalDetails[label] === "No"
                              }
                              onChange={(e) =>
                                handleChange(
                                  "PersonalDetails",
                                  label,
                                  e.target.value
                                )
                              }
                            />
                            No
                          </label>
                        </div>
                      </div>
                    )
                  )}

                       {/* ✅ If user nri */}
{user_profile?.PersonalDetails?.Nri==="Yes" && (
  <div className="flex flex-col gap-2 ml-6">
    <label className="text-sm text-gray-700 font-medium">
      Resident Status
    </label>

    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        name="PermanentResident"
        className="w-4 h-4"
        checked={user_profile.PersonalDetails.PermanentResident}
        onChange={(e) =>
          setuser_profile((prev) => ({
            ...prev,
            PersonalDetails: {
              ...prev.PersonalDetails,
              PermanentResident: e.target.checked,
              TemporaryResident: false,
            },
          }))
        }
      />
      Permanent Resident
    </label>

    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        name="TemporaryResident"
        className="w-4 h-4"
        checked={user_profile.PersonalDetails.TemporaryResident}
        onChange={(e) =>
          setuser_profile((prev) => ({
            ...prev,
            PersonalDetails: {
              ...prev.PersonalDetails,
              TemporaryResident: e.target.checked,
              PermanentResident: false,
            },
          }))
        }
      />
      Temporary Resident
    </label>
  </div>
)}

                  {/* Living */}

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Living
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Living"
                          value="Single"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.Living === "Single"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "Living",
                              e.target.value
                            )
                          }
                        />
                        Single
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="Living"
                          value="With Parent/Family"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.Living ===
                            "With Parent/Family"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "Living",
                              e.target.value
                            )
                          }
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
                        <input
                          type="radio"
                          name="AnyDisability"
                          value="None"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.AnyDisability ===
                            "None"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "AnyDisability",
                              e.target.value
                            )
                          }
                        />
                        None
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="AnyDisability"
                          value="Physical Disabled"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.AnyDisability ===
                            "Physical Disabled"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "AnyDisability",
                              e.target.value
                            )
                          }
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
                        <input
                          type="radio"
                          name="MaritalStatus"
                          value="Single"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.MaritalStatus ===
                            "Single"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "MaritalStatus",
                              e.target.value
                            )
                          }
                        />
                        Single
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="MaritalStatus"
                          value="Divorce"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.MaritalStatus ===
                            "Divorce"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "MaritalStatus",
                              e.target.value
                            )
                          }
                        />
                        Divorce
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="MaritalStatus"
                          value="Widow/Widower"
                          className="accent-red-600"
                          checked={
                            user_profile.PersonalDetails.MaritalStatus ===
                            "Widow/Widower"
                          }
                          onChange={(e) =>
                            handleChange(
                              "PersonalDetails",
                              "MaritalStatus",
                              e.target.value
                            )
                          }
                        />
                        Widow/Widower
                      </label>
                    </div>
                  </div>

                   {/* ✅ Show extra fields if Divorce is selected */}
  {(user_profile.PersonalDetails.MaritalStatus === "Divorce" || 
  user_profile.PersonalDetails.MaritalStatus === "Widow/Widower")  && (
    <div className="mt-3 ml-4 space-y-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-red-600"
          checked={user_profile.PersonalDetails.HasChildren || false}
          onChange={(e) =>
            handleChange(
              "PersonalDetails",
              "HasChildren",
              e.target.checked
            )
          }
        />
        Do you have children?
      </label>

      {/* ✅ If user has children, show number input */}
      {user_profile.PersonalDetails.HasChildren && (
        <div className="flex items-center gap-2 ml-6">
          <label className="text-sm text-gray-700">
            How many children?
          </label>
          <input
            type="number"
            min="1"
            className="border rounded-md p-2 w-24 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={user_profile.PersonalDetails.ChildrenCount || 0}
            onChange={(e) =>
              handleChange(
                "PersonalDetails",
                "ChildrenCount",
                e.target.value
              )
            }
          />
        </div>
      )}
    </div>
  )}


                </div>
              </div>
            )}

            {/*====================== STEP 2 - Religious Details =====================================*/}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Religious Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                 {/* Religion */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Religion
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "ReligiousDetails",
                          "Religion",
                          e.target.value
                        )
                      }
                        onClick={() => {
                            if (All_Religion_Group.length === 0) getall_religion_group();
                          }
                        }
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Religion || ""}
                      >
                        {user_profile?.ReligiousDetails?.Religion ||
                          "Select Religion"}
                      </option>
                      {select_loading==="religion" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Religion_Group.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                  {/* Community */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Community
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "ReligiousDetails",
                          "Community",
                          e.target.value
                        )
                      }
                          onClick={() => {
                            if (All_Community_Group.length === 0) getall_community_group();
                          }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Community || ""}
                      >
                        {user_profile?.ReligiousDetails?.Community ||
                          "Select Community"}
                      </option>
                            {/* Show loader while fetching */}
                        {select_loading==="community" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Community_Group.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                  {/* Caste */}

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Caste
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "ReligiousDetails",
                          "Caste",
                          e.target.value
                        )
                      }
                      onClick={() => {
                        if (All_Cast_Group.length === 0) getall_cast_group();
                      }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Caste || ""}
                      >
                        {user_profile?.ReligiousDetails?.Caste ||
                          "Select Caste"}
                      </option>
                      {select_loading==="cast" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Cast_Group.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

   

                  {/* Gothram */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Gothram
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "ReligiousDetails",
                          "Gothram",
                          e.target.value
                        )
                      }
                      onClick={() => {
                        if (All_Gothra_Group.length === 0) getall_gothra_group();
                      }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Gothram || ""}
                      >
                        {user_profile?.ReligiousDetails?.Gothram ||
                          "Select Gotra"}
                      </option>
                      {select_loading==="gotra" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Gothra_Group.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/*======================= STEP 3 - Family Details===================================== */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Family Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Father’s Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Father’s Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Father’s Name"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="FatherName"
                      value={user_profile.FamilyDetails.FatherName}
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "FatherName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Mother’s Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Mother’s Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Mother’s Name"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="MotherName"
                      value={user_profile.FamilyDetails.MotherName}
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "MotherName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Father’s Occupation */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Father’s Occupation
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="FatherOccupation"
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "FatherOccupation",
                          e.target.value
                        )
                      }
                       onClick={() => {
                          if (All_Occupation.length === 0) getall_occupation();
                        }}
                    >
                      <option
                        value={
                          user_profile?.FamilyDetails?.FatherOccupation || ""
                        }
                      >
                        {user_profile?.FamilyDetails?.FatherOccupation ||
                          "Select Occupation"}
                      </option>
                      {loading==="occupation" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Occupation.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                  {/* Mother’s Occupation */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Mother’s Occupation
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="MotherOccupation"
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "MotherOccupation",
                          e.target.value
                        )
                      }
                    >
                      <option
                        value={
                          user_profile?.FamilyDetails?.MotherOccupation || ""
                        }
                      >
                        {user_profile?.FamilyDetails?.MotherOccupation ||
                          "Select Occupation"}
                      </option>
                        {
                          All_Occupation.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                  {/* No. of Siblings */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      No. of Siblings
                    </label>
                    <input
                      type="number"
                      placeholder="Enter No. of Siblings"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="NoOfSiblings"
                      value={user_profile.FamilyDetails.NoOfSiblings}
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "NoOfSiblings",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Family Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Family Type
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="FamilyType"
                      onChange={(e) =>
                        handleChange(
                          "FamilyDetails",
                          "FamilyType",
                          e.target.value
                        )
                      }
                    >
                      <option
                        value={user_profile?.FamilyDetails?.FamilyType || ""}
                      >
                        {user_profile?.FamilyDetails?.FamilyType ||
                          "Select Family Type"}
                      </option>
                      <option value="joint">Joint</option>
                      <option value="nuclear">Nuclear</option>
                    </select>
                  </div>
                </div>

                {/* Family Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Family Description
                  </label>
                  <textarea
                    placeholder="Describe your family background"
                    rows="4"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                    name="FamilyDescription"
                    value={user_profile.FamilyDetails.FamilyDescription}
                    onChange={(e) =>
                      handleChange(
                        "FamilyDetails",
                        "FamilyDescription",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              </div>
            )}

            {/*================================== STEP 4 - Education / Income========================= */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Education & Income
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Highest Education */}
              

                   <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Highest Education
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="HighestEducation"
                      onChange={(e) =>
                        handleChange(
                          "EducationDetails",
                          "HighestEducation",
                          e.target.value
                        )
                      }
                      onClick={() => {
                        if (All_Education_Group.length === 0) getAll_Education_Group();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails
                            ?.HighestEducation || ""
                        }
                      >
                        {user_profile?.EducationDetails
                          ?.HighestEducation || "Select Education"}
                      </option>
                      {loading==="education" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_Education_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>


                  {/* Education Specialization */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Education Specialization
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="EducationSpecialization"
                      onChange={(e) =>
                        handleChange(
                          "EducationDetails",
                          "EducationSpecialization",
                          e.target.value
                        )
                      }
                      onClick={() => {
                        if (All_Education_Specialization.length === 0) getall_education_specialization();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails
                            ?.EducationSpecialization || ""
                        }
                      >
                        {user_profile?.EducationDetails
                          ?.EducationSpecialization || "Select Specialization"}
                      </option>
                      {loading==="education_specialization" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_Education_Specialization.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Occupation
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="Occupation"
                      onChange={(e) =>
                        handleChange(
                          "EducationDetails",
                          "Occupation",
                          e.target.value
                        )
                      }
                    >
                      <option
                        value={user_profile?.EducationDetails?.Occupation || ""}
                      >
                        {user_profile?.EducationDetails?.Occupation ||
                          "Select Occupation"}
                      </option>
                      {
                        All_Occupation.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* Annual Family Income */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Annual Family Income (in Lakh)
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="AnnualFamilyIncome"
                      onChange={(e) =>
                        handleChange(
                          "EducationDetails",
                          "AnnualFamilyIncome",
                          e.target.value
                        )
                      }
                       onClick={() => {
                        if (All_Income_Group.length === 0) getall_income_group();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails?.AnnualFamilyIncome ||
                          ""
                        }
                      >
                        {user_profile?.EducationDetails?.AnnualFamilyIncome ||
                          "Select Annual Family Income"}
                      </option>
                        {loading==="income" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* Personal Income */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Personal Income (in Package)
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="PersonalIncome"
                      onChange={(e) =>
                        handleChange(
                          "EducationDetails",
                          "PersonalIncome",
                          e.target.value
                        )
                      }
                       onClick={() => {
                        if (All_Income_Group.length === 0) getall_income_group();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails?.PersonalIncome ||
                          ""
                        }
                      >
                        {user_profile?.EducationDetails?.PersonalIncome ||
                          "Select Personal Income"}
                      </option>
                        {loading==="income" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>


                </div>

                {/* Education Details */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Education Details
                  </label>
                  <textarea
                    placeholder="Describe your education background"
                    rows="4"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                    name="EducationDetails"
                    value={user_profile.EducationDetails.EducationDetails}
                    onChange={(e) =>
                      handleChange(
                        "EducationDetails",
                        "EducationDetails",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>

                {/* Occupation Details */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Occupation Details
                  </label>
                  <textarea
                    placeholder="Describe your occupation details"
                    rows="4"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                    name="OccupationDetails"
                    value={user_profile.EducationDetails.OccupationDetails}
                    onChange={(e) =>
                      handleChange(
                        "EducationDetails",
                        "OccupationDetails",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              </div>
            )}

            {/*============================ STEP 5 - Contact Details================================ */}
            {step === 5 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Contact Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Permanent Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Permanent Address
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Enter your current or permanent address"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full resize-none"
                      name="ParmanentAddress"
                      value={user_profile.ContactDetails.ParmanentAddress}
                      onChange={(e) =>
                        handleChange(
                          "ContactDetails",
                          "ParmanentAddress",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Country
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="Country"
                      onChange={(e) =>
                      {
                        const selectedId =e.target.selectedOptions[0].getAttribute("data-id");
                        handleChange(
                          "ContactDetails",
                          "Country",
                          e.target.value
                        )
                         getall_state_group(selectedId);
                      }
                      }
                       onClick={() => {
                        if (All_Country_Group.length === 0) getall_country_group();
                      }}
                    >
                      <option
                        value={user_profile?.ContactDetails?.Country || ""}
                      >
                        {user_profile?.ContactDetails?.Country ||
                          "Select Country"}
                      </option>
                     {loading==="country" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_Country_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value} data-id={item._id}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      State
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="State"
                      onChange={(e) =>
                      {
                        const selectedId =e.target.selectedOptions[0].getAttribute("data-id")
                        handleChange("ContactDetails", "State", e.target.value)
                        getall_city_group(selectedId);
                      }
                      }
                    
                    >
                      <option value={user_profile?.ContactDetails?.State || ""}>
                        {user_profile?.ContactDetails?.State || "Select State"}
                      </option>
                      {loading==="state" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_State_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value} data-id={item._id}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      City
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="City"
                      onChange={(e) =>
                        handleChange("ContactDetails", "City", e.target.value)
                      }
                    
                    >
                      <option value={user_profile?.ContactDetails?.City || ""}>
                        {user_profile?.ContactDetails?.City || "Select City"}
                      </option>
                       {loading==="city" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {
                        All_City_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter postal/ZIP code"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="PostalCode"
                      value={user_profile.ContactDetails.PostalCode}
                      onChange={(e) =>
                        handleChange(
                          "ContactDetails",
                          "PostalCode",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/*================================ STEP 6 - Partner Preferences========================= */}
            {step === 6 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Partner Preferences
                </h2>
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Preferred Partner Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Age Range */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Preferred Age Range
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                          name="MinAge"
                          onChange={(e) =>
                            setuser_profile({
                              ...user_profile,
                              PartnerPrefrences: {
                                ...user_profile.PartnerPrefrences,
                                AgeRange: {
                                  ...user_profile.PartnerPrefrences.AgeRange,
                                  MinAge: e.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option
                            value={
                              user_profile?.PartnerPrefrences?.AgeRange
                                ?.MinAge || ""
                            }
                          >
                            {user_profile?.PartnerPrefrences?.AgeRange.MinAge ||
                              "Min Age"}
                          </option>
                          {Array.from({ length: 30 }, (_, i) => (
                            <option key={i} value={i + 18}>
                              {i + 18}
                            </option>
                          ))}
                        </select>
                        <select
                          className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                          name="MaxAge"
                          onChange={(e) =>
                            setuser_profile({
                              ...user_profile,
                              PartnerPrefrences: {
                                ...user_profile.PartnerPrefrences,
                                AgeRange: {
                                  ...user_profile.PartnerPrefrences.AgeRange,
                                  MaxAge: e.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option
                            value={
                              user_profile?.PartnerPrefrences?.AgeRange
                                ?.MaxAge || ""
                            }
                          >
                            {user_profile?.PartnerPrefrences?.AgeRange.MaxAge ||
                              "Max Age"}
                          </option>
                          {Array.from({ length: 30 }, (_, i) => (
                            <option key={i} value={i + 18}>
                              {i + 18}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Height Range */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Preferred Height Range
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                          name="MinHeight"
                          onChange={(e) =>
                            setuser_profile({
                              ...user_profile,
                              PartnerPrefrences: {
                                ...user_profile.PartnerPrefrences,
                                HeightRange: {
                                  ...user_profile.PartnerPrefrences.HeightRange,
                                  MinHeight: e.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option
                            value={
                              user_profile?.PartnerPrefrences?.HeightRange
                                ?.MinHeight || ""
                            }
                          >
                            {user_profile?.PartnerPrefrences?.HeightRange
                              .MinHeight || "Min Height"}
                          </option>
                         {[
                          "4'8\"",
                          "4'9\"",
                          "4'10\"",
                          "4'11\"",
                          "5'0\"",
                          "5'1\"",
                          "5'2\"",
                          "5'3\"",
                          "5'4\"",
                          "5'5\"",
                          "5'6\"",
                          "5'7\"",
                          "5'8\"",
                          "5'9\"",
                          "5'10\"",
                          "5'11\"",
                          "6'0\"",
                          "6'1\"",
                          "6'2\"",
                          "6'3\"",
                          "6'4\"",
                          "6'5\"",
                        ].map(h => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}

                        </select>
                        <select
                          className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                          name="MaxHeight"
                          onChange={(e) =>
                            setuser_profile({
                              ...user_profile,
                              PartnerPrefrences: {
                                ...user_profile.PartnerPrefrences,
                                HeightRange: {
                                  ...user_profile.PartnerPrefrences.HeightRange,
                                  MaxHeight: e.target.value,
                                },
                              },
                            })
                          }
                        >
                          <option
                            value={
                              user_profile?.PartnerPrefrences?.HeightRange
                                ?.MaxHeight || ""
                            }
                          >
                            {user_profile?.PartnerPrefrences?.HeightRange
                              .MaxHeight || "Max Height"}
                          </option>
                          {[
                              "4'8\"",
                              "4'9\"",
                              "4'10\"",
                              "4'11\"",
                              "5'0\"",
                              "5'1\"",
                              "5'2\"",
                              "5'3\"",
                              "5'4\"",
                              "5'5\"",
                              "5'6\"",
                              "5'7\"",
                              "5'8\"",
                              "5'9\"",
                              "5'10\"",
                              "5'11\"",
                              "6'0\"",
                              "6'1\"",
                              "6'2\"",
                              "6'3\"",
                              "6'4\"",
                              "6'5\"",
                          ].map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Marital Status */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Marital Status
                      </label>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="MaritialStatus"
                            value="Single"
                            checked={
                              user_profile.PartnerPrefrences.MaritialStatus ===
                              "Single"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "MaritialStatus",
                                e.target.value
                              )
                            }
                          />
                          Single
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="MaritialStatus"
                            value="Divorced"
                            checked={
                              user_profile.PartnerPrefrences.MaritialStatus ===
                              "Divorced"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "MaritialStatus",
                                e.target.value
                              )
                            }
                          />{" "}
                          Divorced
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="MaritialStatus"
                            value="Widow/Widower"
                            checked={
                              user_profile.PartnerPrefrences.MaritialStatus ===
                              "Widow/Widower"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "MaritialStatus",
                                e.target.value
                              )
                            }
                          />
                          Widow/Widower
                        </label>
                      </div>
                    </div>

                                       {/* ✅ Show extra fields if Divorce is selected */}
  {(user_profile.PartnerPrefrences.MaritialStatus === "Divorced" || 
  user_profile.PartnerPrefrences.MaritialStatus === "Widow/Widower")  && (
    <div className="mt-3 ml-4 space-y-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-red-600"
          checked={user_profile.PartnerPrefrences.HasChildren || false}
          onChange={(e) =>
            handleChange(
              "PartnerPrefrences",
              "HasChildren",
              e.target.checked
            )
          }
        />
        Do you have children?
      </label>

      {/* ✅ If user has children, show number input */}
      {user_profile.PartnerPrefrences.HasChildren && (
        <div className="flex items-center gap-2 ml-6">
          <label className="text-sm text-gray-700">
            How many children?
          </label>
          <input
            type="number"
            min="1"
            className="border rounded-md p-2 w-24 focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={user_profile.PartnerPrefrences.ChildrenCount || 0}
            onChange={(e) =>
              handleChange(
                "PartnerPrefrences",
                "ChildrenCount",
                e.target.value
              )
            }
          />
        </div>
      )}
    </div>
  )}

                    {/* Food Preference */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Non-Veg
                      </label>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="non-veg"
                            value="Yes"
                            checked={
                              user_profile.PartnerPrefrences.NonVeg === "Yes"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "NonVeg",
                                e.target.value
                              )
                            }
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="non-veg"
                            value="No"
                            checked={
                              user_profile.PartnerPrefrences.NonVeg === "No"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "NonVeg",
                                e.target.value
                              )
                            }
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* Manglik */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Manglik
                      </label>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="manglik"
                            value="Yes"
                            checked={
                              user_profile.PartnerPrefrences.Manglik === "Yes"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "Manglik",
                                e.target.value
                              )
                            }
                          />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="manglik"
                            value="No"
                            checked={
                              user_profile.PartnerPrefrences.Manglik === "No"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "Manglik",
                                e.target.value
                              )
                            }
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* NRI */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        NRI
                      </label>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            name="nri"
                            value="Yes"
                            checked={
                              user_profile.PartnerPrefrences.Nri === "Yes"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "Nri",
                                e.target.value
                              )
                            }
                          />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="nri"
                            value="No"
                            checked={
                              user_profile.PartnerPrefrences.Nri === "No"
                            }
                            onChange={(e) =>
                              handleChange(
                                "PartnerPrefrences",
                                "Nri",
                                e.target.value
                              )
                            }
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>

                       {/* ✅ If user nri */}
{user_profile?.PartnerPrefrences?.Nri==="Yes" && (
  <div className="flex flex-col gap-2 ml-6">
    <label className="text-sm text-gray-700 font-medium">
      Resident Status
    </label>

    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        name="PermanentResident"
        className="w-4 h-4"
        checked={user_profile.PartnerPrefrences.PermanentResident}
        onChange={(e) =>
          setuser_profile((prev) => ({
            ...prev,
            PartnerPrefrences: {
              ...prev.PartnerPrefrences,
              PermanentResident: e.target.checked,
              TemporaryResident: false,
            },
          }))
        }
      />
      Permanent Resident
    </label>

    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        name="TemporaryResident"
        className="w-4 h-4"
        checked={user_profile.PartnerPrefrences.TemporaryResident}
        onChange={(e) =>
          setuser_profile((prev) => ({
            ...prev,
            PartnerPrefrences: {
              ...prev.PartnerPrefrences,
              TemporaryResident: e.target.checked,
              PermanentResident: false,
            },
          }))
        }
      />
      Temporary Resident
    </label>
  </div>
)}


             {/* Religion */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Religion
                      </label>
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="Religion"
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "Religion",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_religion_group()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.Religion || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.Religion ||
                            "Select Religion"}
                        </option>
                          {
                        All_Religion_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

                    {/* Community */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Community
                      </label>
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="Community"
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "Community",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_community_group()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.Community || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.Community ||
                            "Select Community"}
                        </option>
                          {
                        All_Community_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

       

               {/* Caste */}

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Caste
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      onChange={(e) =>
                        handleChange(
                          "PartnerPrefrences",
                          "Caste",
                          e.target.value
                        )
                      }
                      onClick={() => {
                        if (All_Cast_Group.length === 0) getall_cast_group();
                      }}
                    >
                      <option
                        value={user_profile?.PartnerPrefrences?.Caste || ""}
                      >
                        {user_profile?.PartnerPrefrences?.Caste ||
                          "Select Caste"}
                      </option>
                      {select_loading==="cast" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Cast_Group.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                    {/* Mother Tongue */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Mother Tongue
                      </label>
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="MotherTongue"
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "MotherTongue",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_mother_tongue()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.MotherTongue || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.MotherTongue ||
                            "Select Mother Tongue"}
                        </option>
                          {
                        All_Mother_Tongue.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

                    {/* Annual Family Income */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Annual Family Income
                      </label>
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="AnnualFamilyIncome"
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "AnnualFamilyIncome",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_income_group()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.AnnualFamilyIncome || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.AnnualFamilyIncome ||
                            "Select Annual Family Income"}
                        </option>
                          {
                        All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

                {/* Personal Income */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                         Personal Income
                      </label>
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="PersonalIncome"
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "PersonalIncome",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_income_group()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.PersonalIncome || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.PersonalIncome ||
                            "Select Personal Income"}
                        </option>
                          {
                        All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

                      {/* Property Size */}
                             <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Property Size
                      </label>

                      <FormControl fullWidth>
                        <Select
                          name="PropertySize"
                          multiple
                          value={user_profile?.PartnerPrefrences?.PropertySize || []}
                          onOpen={() => {getall_property_size()}}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "PropertySize");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Property Size
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_Property_Size.map((option) => (
                            <MenuItem key={option._id} value={option.lookup_value}>
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.PropertySize.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                          value={user_profile?.PartnerPrefrences?.HeighstEducation || []}
                          onOpen={() => {getAll_Education_Group()}}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "HeighstEducation");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Education
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_Education_Group.map((option) => (
                            <MenuItem key={option._id} value={option.lookup_value}>
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.HeighstEducation.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Occupation */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Occupation
                      </label>
                      <FormControl fullWidth>
                        <Select
                          name="Occupation"
                          multiple
                          value={user_profile?.PartnerPrefrences?.Occupation || []}
                          onOpen={() => {getall_occupation()}}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "Occupation");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Occupation
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_Occupation.map((option) => (
                            <MenuItem key={option._id} value={option.lookup_value}>
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Occupation.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Country
                      </label>
                      <FormControl fullWidth>
                        <Select
                          name="Country"
                          multiple
                          value={user_profile?.PartnerPrefrences?.Country || []}
                          onOpen={() => {getall_country_group()}}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "Country");
                       
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Country
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_Country_Group.map((option) => (
                            <MenuItem
                             key={option._id}
                              value={option.lookup_value}
                              data-id={option._id}
                              onClick={() => getall_state_group(option._id)}>
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Country.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        State
                      </label>
                      <FormControl fullWidth>
                        <Select
                          name="State"
                          multiple
                          value={user_profile?.PartnerPrefrences?.State || []}
                          onOpen={() => {getall_state_group()}}
                          
                          onChange={(e) => {
                            handleMultiSelectChange(e, "State");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select State
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_State_Group.map((option) => (
                            <MenuItem
                             key={option._id}
                              value={option.lookup_value}
                              data-id={option._id}
                              onClick={() => getall_city_group(option._id)}
                              >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.State.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        City
                      </label>
                      <FormControl fullWidth>
                        <Select
                          name="City"
                          multiple
                          value={user_profile?.PartnerPrefrences?.City || []}
                          onOpen={() => {getall_city_group()}}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "City");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select City
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
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
                          {All_City_Group.map((option) => (
                            <MenuItem
                             key={option._id} 
                             value={option.lookup_value}
                             >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.City.includes(option.lookup_value)}
                                color="primary"
                              />
                              {option.lookup_value}
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Upload Photos & Media
                </h2>

                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Profile Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-3">
                      Click to upload your profile photo
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full cursor-pointer"
                      name="ProfilePhoto"
                      onChange={(e) => handleFileChange(e, "ProfilePhoto")}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
                      {loading === "ProfilePhoto" && (
                        <CircularProgress size={24} />
                      )}
                      {user_profile?.Upload?.ProfilePhoto && (
                        <img
                          src={user_profile?.Upload?.ProfilePhoto}
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
                    <label className="block text-gray-700 font-medium mb-2">
                      Identity Type
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="IdentityType"
                      onChange={(e) =>
                        handleChange("Upload", "IdentityType", e.target.value)
                      }
                    >
                      <option value={user_profile?.Upload?.IdentityType || ""}>
                        {user_profile?.Upload?.IdentityType ||
                          "Select Identity Type"}
                      </option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Identity Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter ID Number"
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="IdentityNumber"
                      value={user_profile?.Upload?.IdentityNumber}
                      onChange={(e) =>
                        handleChange("Upload", "IdentityNumber", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Identity Image Upload */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Identity Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-3">
                      Click to upload your ID image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full cursor-pointer"
                      name="IdentityImage"
                      onChange={(e) => handleFileChange(e, "IdentityImage")}
                    />
                  </div>
                  <div className="w-28 h-28  flex items-center justify-center text-gray-400 text-sm">
                    {loading === "IdentityImage" && (
                      <CircularProgress size={24} />
                    )}
                    {user_profile?.Upload?.IdentityImage && (
                      <img
                        src={user_profile?.Upload?.IdentityImage}
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
                    {loading === "AudioVideo" && <CircularProgress size={24} />}
                    {Array.isArray(user_profile?.Upload?.AudioVideo) &&
                      user_profile.Upload.AudioVideo.map((file, index) => (
                        <div
                          key={index}
                          className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                        >
                          {file.endsWith(".mp4") ||
                          file.endsWith(".mov") ||
                          file.endsWith(".webm") ? (
                            <video
                              src={file}
                              controls
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <audio src={file} controls className="w-full" />
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
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Gallery Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-3">
                      Upload multiple gallery images
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full cursor-pointer"
                      name="Gallary"
                      onChange={(e) => handleFileChange(e, "Gallary")}
                    />
                  </div>
                 <div className="w-full min-h-28 flex flex-wrap gap-3 items-center justify-start text-gray-400 text-sm">
                    {loading === "Gallary" && (
                      <div className="flex justify-center items-center w-full">
                        <CircularProgress size={24} />
                      </div>
                    )}

                    {Array.isArray(user_profile?.Upload?.Gallary) &&
                      user_profile.Upload.Gallary.map((item, index) => (
                        <img
                          key={index}
                          src={item}
                          alt={`Gallery ${index}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                      ))}
                  </div>

                </div>
              </div>
            )}

            {/* STEP 8 - Property Details */}

            {step === 8 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Property Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Property Type
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="PropertyType"
                      onChange={(e) =>
                      {
                 
                        handleChange(
                          "PropertyDetails",
                          "PropertyType",
                          e.target.value
                        )
                       
                      }
                      }
                       onClick={() => {
                          if (All_Property_Type.length === 0) getall_property_type();
                        }}
                    >
                      <option
                        value={
                          user_profile?.PropertyDetails?.PropertyType || ""
                        }
                      >
                        {user_profile?.PropertyDetails?.PropertyType ||
                          "Select Property Type"}
                      </option>
                       {loading==="property_type" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Property_Type.map((item) => (
                            <option key={item._id} value={item.lookup_value} data-id={item._id} >
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                  {/* Residential Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Residential Type
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="ResidentialType"
                      onChange={(e) =>
                      {
                        handleChange(
                          "PropertyDetails",
                          "ResidentialType",
                          e.target.value
                        )
                      }
                      }
                      onClick={() => {
                          if (All_Residence_Type.length === 0) getall_residence_type();
                        }}
                     
                    >
                      <option
                        value={
                          user_profile?.PropertyDetails?.ResidentialType || ""
                        }
                      >
                        {user_profile?.PropertyDetails?.ResidentialType ||
                          "Select Residential Type"}
                      </option>
                      {loading==="residence_type" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Residence_Type.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>

                     {/* Property Size */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Property Size
                    </label>
                    <select
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                      name="PropertySize"
                      onChange={(e) =>
                      {
                        handleChange(
                          "PropertyDetails",
                          "PropertySize",
                          e.target.value
                        )
                      }
                      }
                      onClick={() => {
                          if (All_Property_Size.length === 0) getall_property_size();
                        }}
                    >
                      <option
                        value={
                          user_profile?.PropertyDetails?.PropertySize || ""
                        }
                      >
                        {user_profile?.PropertyDetails?.PropertySize ||
                          "Select Property Size"}
                      </option>
                      {loading==="residence_type" && (
                          <option disabled>Loading...</option>
                        )}

                        {/* Show fetched values */}
                        {
                          All_Property_Size.map((item) => (
                            <option key={item._id} value={item.lookup_value}>
                              {item.lookup_value}
                            </option>
                          ))
                        }
                    </select>
                  </div>


                </div>

                {/* Property Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Property Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter property details (location, size, value, etc.)"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full resize-none"
                    name="PropertyDescription"
                    onChange={(e) =>
                      handleChange(
                        "PropertyDetails",
                        "PropertyDescription",
                        e.target.value
                      )
                    }
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

      <Footer />
    </div>
  );
}
