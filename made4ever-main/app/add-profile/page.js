"use client";

import React, { useEffect, useState } from "react";
import api from '@/api'
import Swal from "sweetalert2";
import { ClipboardPaste, Download } from "lucide-react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FormControl,
  CircularProgress,
  Select,
  MenuItem,
  Chip,
  Box,
  Checkbox,
  Autocomplete,
  TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Header from "@/components/layout/header";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/layout/footer";

export default function NewProfileForm() {

  const navigate = useRouter()

  const [step, setStep] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));



  const location = usePathname();
  const existing_user_profile = location?.state?.id;

  //======================== state for adding a user=========================================

  const [user_profile, setuser_profile] = useState({
    Bureau: "",
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
      PermanentResident: false,
      TemporaryResident: false,
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
      // PostalCode: "",
    },
    PartnerPrefrences: {
      AgeRange: { MinAge: null, MaxAge: null },
      HeightRange: { MinHeight: null, MaxHeight: null },
      MaritialStatus: "",
      HasChildren: false,
      ChildrenCount: 0,
      NonVeg: "",
      Manglik: "",
      Nri: "",
      PermanentResident: false,
      TemporaryResident: false,
      Community: "",
      Religion: "",
      Caste: [],
      Gothram: [],
      MotherTongue: [],
      AnnualFamilyIncome: "",
      PersonalIncome: "",
      PropertySize: [],
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
      AcceptTerms: false
    },
  });


  
  const [openSelect, setOpenSelect] = useState("");

  const [bureauOptions, setBureauOptions] = useState([]);

  let searchTimeout;

  const [Loading, setLoading] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState(null);
  const fetchBureaus = async (query) => {
    if (!query || query.length < 1) {
      setBureauOptions([]);
      return;
    }

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(`api/msp/Getmsp?search=${query}`);
        console.log(res);

        setBureauOptions(
          Array.isArray(res.data) ? res.data.msp : res.data.msp || [],
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce
  };


  useEffect(() => {
    if (existing_user_profile) {
      // Clone the existing profile
      const updatedProfile = { ...existing_user_profile };

      // Convert Bureau object to its string ID
      if (updatedProfile.Bureau && typeof updatedProfile.Bureau === "object") {
        updatedProfile.Bureau =
          updatedProfile.Bureau._id || updatedProfile.Bureau.id || "";
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
            if (["_id", "createdAt", "updatedAt", "__v"].includes(key))
              continue;
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

  const [select_loading, setselect_loading] = useState("");

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
  const getall_cast_group = async (selectedId) => {
    try {

      setselect_loading("cast");
      const params = new URLSearchParams();
      params.append("lookup_type", "cast_group");
      params.append("parent_lookup_id", selectedId);
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
      setAll_Education_Group(resp.data.data);
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

  const [All_Education_Specialization, setAll_Education_Specialization] = useState([]);
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

      const resp = await api.get(
        `api/admin/LookupList?${params.toString()}`
      );

      const sortedIncome = resp.data.data.sort((a, b) => {
        const getValue = (str = "") => {
          str = str.trim(); // remove extra spaces

          const match = str.match(/(\d+)\s*(Lakh|Crore)/i);
          if (!match) return 0;

          let value = parseInt(match[1]);

          // Convert Crore → Lakh
          if (match[2].toLowerCase() === "crore") {
            value *= 100;
          }

          return value;
        };

        return getValue(a.lookup_value) - getValue(b.lookup_value);
        // 🔼 Small income first
        // For small income last use reverse
        // return getValue(b.lookup_value) - getValue(a.lookup_value);
      });

      setAll_Income_Group(sortedIncome);

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

  useEffect(() => {
    getall_country_group()
  }, [])
  // get state

  const [All_State_Group, setAll_State_Group] = useState([]);
  const [loadedCountries, setLoadedCountries] = useState([]);

  const getall_state_group = async (selectedId) => {
    try {
      setselect_loading("state");

      // 🔥 If already loaded, don't call API again
      if (loadedCountries.includes(selectedId)) {
        return;
      }

      const params = new URLSearchParams();
      params.append("lookup_type", "state_group");
      params.append("parent_lookup_id", selectedId);
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);
      setAll_State_Group((prev) => [
        ...prev,
        ...resp.data.data,
      ]);
      setLoadedCountries((prev) => [...prev, selectedId]);
    } catch (error) {
      console.log(error);
    } finally {
      setselect_loading("");
    }
  };

  // get city

  const [All_City_Group, setAll_City_Group] = useState([]);
  const [loadedStatesForCity, setLoadedStatesForCity] = useState([]);

  const getall_city_group = async (selectedId) => {
    try {
      setselect_loading("city");
      if (loadedStatesForCity.includes(selectedId)) {
        return;
      }
      const params = new URLSearchParams();
      params.append("lookup_type", "city_group");
      params.append("parent_lookup_id", selectedId);
      const resp = await api.get(`api/admin/LookupList?${params.toString()}`);

      setAll_City_Group((prev) => [
        ...prev,
        ...resp.data.data,
      ]);
      setLoadedStatesForCity((prev) => [...prev, selectedId]);

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

      const sortedProperty = resp.data.data.sort((a, b) => {
        const getValue = (str = "") => {
          str = str.trim(); // remove extra spaces

          const match = str.match(/(\d+)\s*(GAJ)/i);
          if (!match) return 0;

          let value = parseInt(match[1]);

          // Convert Crore → Lakh
          if (match[2].toLowerCase() === "crore") {
            value *= 100;
          }

          return value;
        };

        return getValue(a.lookup_value) - getValue(b.lookup_value);
        // 🔼 Small income first
        // For small income last use reverse
        // return getValue(b.lookup_value) - getValue(a.lookup_value);
      });

      setAll_Property_Size(sortedProperty);
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
      setAll_Residence_Type(resp.data.data);
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

      const getValue = (label) => {
        const regex = new RegExp(`(${label})\\s*[:\\-]?\\s*(.+)`, "i");
        const match = text.match(regex);
        return match ? match[2].trim() : "";
      };


      const getNumber = (label) => {
        const regex = new RegExp(`${label}\\s*[:\\-]?\\s*(\\d+)`, "i");
        return text.match(regex)?.[1]
          ? Number(text.match(regex)[1])
          : 0;
      };

      const getBoolean = (label) => {
        const value = getValue(label).toLowerCase();
        return value === "yes" || value === "true";
      };

      const getArray = (label) => {
        const value = getValue(label);
        return value ? value.split(",").map((v) => v.trim()) : [];
      };

      // ✅ Convert time into HH:MM format for input type="time"
      //   const formatTime = (timeString) => {
      //   if (!timeString) return "";

      //   // If already HH:MM format
      //   if (/^\d{2}:\d{2}$/.test(timeString)) return timeString;

      //   // Convert 10:30 AM → 10:30
      //   const date = new Date(`1970-01-01 ${timeString}`);
      //   if (isNaN(date)) return "";

      //   return date.toTimeString().slice(0, 5);
      // };



      setuser_profile((prev) => ({
        ...prev,

        PersonalDetails: {
          ...prev.PersonalDetails,
          Name: getValue("Name|Full Name|Candidate Name"),
          // DateOfBirth: getValue("Date of Birth|DOB"),
          // TimeOfBirth: formatTime(getValue("Time of Birth|TOB")),

          PlaceOfBirth: getValue("Place of Birth"),
          Age: getNumber("Age"),
          Complexion: getValue("Complexion"),
          Height: getValue("Height"),
          Weight: getValue("Weight"),
          MotherTongue: getValue("Mother Tongue"),
          Gender: getValue("Gender"),
          Drinking: getValue("Drinking"),
          Smoking: getValue("Smoking"),
          Nri: getValue("NRI"),
          PermanentResident: getBoolean("Permanent Resident"),
          TemporaryResident: getBoolean("Temporary Resident"),
          NonVeg: getValue("Food Habit|NonVeg"),
          Manglik: getValue("Manglik"),
          Living: getValue("Living"),
          AnyDisability: getValue("Disability"),
          MaritalStatus: getValue("Marital Status"),
          HasChildren: getBoolean("Has Children"),
          ChildrenCount: getNumber("Children Count"),
        },

        ReligiousDetails: {
          ...prev.ReligiousDetails,
          Community: getValue("Community"),
          Caste: getValue("Caste"),
          Religion: getValue("Religion"),
          Gothram: getValue("Gotra|Gothram"),
        },

        FamilyDetails: {
          ...prev.FamilyDetails,
          FatherName: getValue("Father Name"),
          MotherName: getValue("Mother Name"),
          FatherOccupation: getValue("Father Occupation"),
          MotherOccupation: getValue("Mother Occupation"),
          NoOfSiblings: getNumber("Siblings"),
          FamilyType: getValue("Family Type"),
          FamilyDescription: getValue("Family Description"),
        },

        EducationDetails: {
          ...prev.EducationDetails,
          HighestEducation: getValue("Highest Education|Education"),
          EducationSpecialization: getValue("Specialization"),
          Occupation: getValue("Occupation"),
          AnnualFamilyIncome: getValue("Family Income"),
          PersonalIncome: getValue("Personal Income"),
          EducationDetails: getValue("Education Details"),
          OccupationDetails: getValue("Occupation Details"),
        },

        ContactDetails: {
          ...prev.ContactDetails,
          ParmanentAddress: getValue("Address"),
          Country: getValue("Country"),
          State: getValue("State"),
          City: getValue("City"),
        },

        PartnerPrefrences: {
          ...prev.PartnerPrefrences,
          MaritialStatus: getValue("Preferred Marital Status"),
          HasChildren: getBoolean("Preferred Has Children"),
          ChildrenCount: getNumber("Preferred Children Count"),
          NonVeg: getValue("Preferred Food Habit"),
          Manglik: getValue("Preferred Manglik"),
          Nri: getValue("Preferred NRI"),
          PermanentResident: getBoolean("Preferred Permanent Resident"),
          TemporaryResident: getBoolean("Preferred Temporary Resident"),
          Community: getValue("Preferred Community"),
          Religion: getValue("Preferred Religion"),
          Caste: getArray("Preferred Caste"),
          Gothram: getArray("Preferred Gothram"),
          MotherTongue: getArray("Preferred Mother Tongue"),
          AnnualFamilyIncome: getValue("Preferred Family Income"),
          PersonalIncome: getValue("Preferred Personal Income"),
          PropertySize: getArray("Preferred Property Size"),
          HeighstEducation: getArray("Preferred Education"),
          Occupation: getArray("Preferred Occupation"),
          Country: getArray("Preferred Country"),
          State: getArray("Preferred State"),
          City: getArray("Preferred City"),
        },

        PropertyDetails: {
          ...prev.PropertyDetails,
          PropertyType: getValue("Property Type"),
          ResidentialType: getValue("Residential Type"),
          PropertySize: getValue("Property Size"),
          PropertyDescription: getValue("Property Description"),
          AcceptTerms: getBoolean("Accept Terms"),
        },
      }));

      Swal.fire({
        icon: "success",
        title: "Full Biodata Imported Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Invalid Format",
        text: "Please paste correct WhatsApp biodata format.",
      });
    }
  };


  //========================= post method for adding new profile===============================

  const add_new_profile = async () => {
    try {
      if (user_profile.PropertyDetails.AcceptTerms === false) {
        return Swal.fire({
          icon: "error",
          title: "Terms & Conditions!",
          text: "Please accept terms & conditions!",
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn",
          },
        })
      }

      const resp = await api.post("api/user/add-new-profile", user_profile);

      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: user_profile._id ? "Profile Update" : "Profile Created!",
          text: resp.data.message || "User profile created successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-confirm-btn",
          },
        }).then(() => {
          // Refresh the page after alert closes
          // navigate('/profiles')
          window.location.reload()
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

  //============================ sample data ============

  //================== sample data=====================================
  const handleDownloadSample = () => {
    const sampleText = `
----- MATRIMONY BIODATA SAMPLE FORMAT -----

Name: Rahul Sharma
Date of Birth: 15-08-1995
Time of Birth: 10:30 AM
Place of Birth: Jaipur
Age: 29
Complexion: Fair
Height: 5.10
Weight: 72
Mother Tongue: Hindi
Gender: Male
Drinking: No
Smoking: No
NRI: No
Permanent Resident: Yes
Temporary Resident: No
Food Habit: Veg
Manglik: No
Living: With Family
Disability: No
Marital Status: Unmarried
Has Children: No
Children Count: 0

Religion: Hindu
Community: Brahmin
Caste: Sharma
Gotra: Bhardwaj

Father Name: Ramesh Sharma
Father Occupation: Business
Mother Name: Sushma Sharma
Mother Occupation: Homemaker
Siblings: 1
Family Type: Joint
Family Description: Well settled family

Highest Education: B.Tech
Specialization: Computer Science
Occupation: Software Engineer
Family Income: INR 4Lakh To 7 Lakh
Personal Income: INR 4Lakh To 7 Lakh
Education Details: Engineering from IIT
Occupation Details: Working in MNC

Address: Vaishali Nagar
Country: India
State: Rajasthan
City: Jaipur

Preferred Marital Status: Unmarried
Preferred Has Children: No
Preferred Children Count: 0
Preferred Food Habit: Veg
Preferred Manglik: No
Preferred NRI: No
Preferred Permanent Resident: Yes
Preferred Temporary Resident: No
Preferred Community: Brahmin
Preferred Religion: Hindu
Preferred Caste: Sharma, Pandit
Preferred Gothram: Bhardwaj
Preferred Mother Tongue: Hindi, English
Preferred Family Income: INR 4Lakh To 7 Lakh
Preferred Personal Income: INR 4Lakh To 7 Lakh
Preferred Property Size: 2BHK, 3BHK
Preferred Education: B.Tech, MBA
Preferred Occupation: Engineer, Doctor
Preferred Country: India
Preferred State: Rajasthan
Preferred City: Jaipur

Property Type: Own House
Residential Type: Apartment
Property Size: 3BHK
Property Description: Well maintained flat
Accept Terms: Yes

--------------------------------------------
Copy this format and edit values before pasting.
`;

    const blob = new Blob([sampleText], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Matrimony_Biodata_Sample.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6 px-6 text-center">
            <h1 className="text-3xl font-bold">
              {existing_user_profile
                ? "Update New Profile"
                : "Create New Profile"}
            </h1>

            <p className="text-sm opacity-90 mt-1">
              Step {step} of 8 — Complete your details to get the best matches!
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">

            {/* LEFT SIDE - Paste Button */}
            <div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="paste-tooltip">Paste WhatsApp Data</Tooltip>}
              >
                <button
                  onClick={handlePaste}
                  className="relative flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition group shadow-sm"
                >
                  <ClipboardPaste size={18} />



                  {/* Tooltip (Optional if using bootstrap tooltip) */}
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
                    Paste WhatsApp Data
                  </span>
                </button>
              </OverlayTrigger>
            </div>

            {/* RIGHT SIDE - Download Sample Button */}
            <div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="paste-tooltip">Download Biodata Sample</Tooltip>}
              >
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="relative flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition group shadow-sm"
                >
                  <Download size={18} />
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
                    Download Biodata Sample
                  </span>
                </button>
              </OverlayTrigger>
            </div>

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
                <div
                  key={num}
                  className="flex flex-col items-center min-w-[80px]"
                >
                  <div
                    onClick={() => setStep(num)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer ${step === num
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
          {/* ================= STEP NAVIGATION ================= */}
          {/* <div className="flex flex-wrap gap-2 mb-6">
  {[1,2,3,4,5,6,7,8].map((s) => (
    <button
      key={s}
      type="button"
      onClick={() => setStep(s)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${
          step === s
            ? "bg-red-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      Step {s}
    </button>
  ))}
</div> */}

          <div className="p-6 sm:p-8 space-y-6">
            {/* STEP 1 - Personal Details */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Personal Details
                </h2>
                {/* bureau */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Bureau
                    </label>
                 

<Autocomplete
  options={bureauOptions}
  loading={Loading}
  value={selectedBureau}
  getOptionLabel={(option) =>
    option
      ? `${option.registered_business_name} - ${option.mobile_number}`
      : ""
  }
  isOptionEqualToValue={(option, value) =>
    option._id === value?._id
  }
  onInputChange={(event, value) => fetchBureaus(value)}
  onChange={(event, newValue) => {
    setSelectedBureau(newValue);
    setuser_profile({
      ...user_profile,
      Bureau: newValue?._id || "",
    });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      placeholder="Type bureau name..."
      InputProps={{
        ...params.InputProps,
        disableUnderline: true,
        className:
          "h-[49.28px] border rounded-lg h-[48px] px-3 flex items-center focus-within:ring-2 focus-within:ring-red-500 w-full",
        endAdornment: (
          <>
            {Loading && <CircularProgress size={18} />}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
      inputProps={{
        ...params.inputProps,
        className: "py-0",  // 🔥 removes extra top-bottom padding
      }}
    />
  )}
/>
                   
                  </div>
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Mother_Tongue.length === 0)
                          getall_mother_tongue();
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
                      {select_loading === "mother_tongue" && (
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
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
                                  e.target.value,
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
                                  e.target.value,
                                )
                              }
                            />
                            No
                          </label>
                        </div>
                      </div>
                    ),
                  )}

                  {/* ✅ If user nri */}
                  {user_profile?.PersonalDetails?.Nri === "Yes" && (
                    <div className="flex flex-col gap-2 ml-6">
                      <label className="text-sm text-gray-700 font-medium">
                        Resident Status
                      </label>

                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          name="PermanentResident"
                          className="w-4 h-4"
                          checked={
                            user_profile.PersonalDetails.PermanentResident
                          }
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
                          checked={
                            user_profile.PersonalDetails.TemporaryResident
                          }
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
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
                              e.target.value,
                            )
                          }
                        />
                        Widow/Widower
                      </label>
                    </div>
                  </div>

                  {/* ✅ Show extra fields if Divorce is selected */}
                  {(user_profile.PersonalDetails.MaritalStatus === "Divorce" ||
                    user_profile.PersonalDetails.MaritalStatus ===
                    "Widow/Widower") && (
                      <div className="mt-3 ml-4 space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="accent-red-600"
                            checked={
                              user_profile.PersonalDetails.HasChildren || false
                            }
                            onChange={(e) =>
                              handleChange(
                                "PersonalDetails",
                                "HasChildren",
                                e.target.checked,
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
                              value={
                                user_profile.PersonalDetails.ChildrenCount || 0
                              }
                              onChange={(e) =>
                                handleChange(
                                  "PersonalDetails",
                                  "ChildrenCount",
                                  e.target.value,
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
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute("data-id");
                        handleChange(
                          "ReligiousDetails",
                          "Religion",
                          e.target.value,
                        )
                        getall_cast_group(selectedId);
                      }
                      }

                      onClick={() => {
                        if (All_Religion_Group.length === 0)
                          getall_religion_group();
                      }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Religion || ""}
                      >
                        {user_profile?.ReligiousDetails?.Religion ||
                          "Select Religion"}
                      </option>
                      {select_loading === "religion" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Religion_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value} data-id={item._id}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Community_Group.length === 0)
                          getall_community_group();
                      }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Community || ""}
                      >
                        {user_profile?.ReligiousDetails?.Community ||
                          "Select Community"}
                      </option>
                      {/* Show loader while fetching */}
                      {select_loading === "community" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Community_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                    // onClick={() => {
                    //    getall_cast_group();
                    // }}
                    >
                      <option
                        value={user_profile?.ReligiousDetails?.Caste || ""}
                      >
                        {user_profile?.ReligiousDetails?.Caste ||
                          "Select Caste"}
                      </option>
                      {select_loading === "cast" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Cast_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Gothra_Group.length === 0)
                          getall_gothra_group();
                      }}
                    >

                      <option
                        value={user_profile?.ReligiousDetails?.Gothram || ""}
                      >
                        {user_profile?.ReligiousDetails?.Gothram ||
                          "Select Gotra"}
                      </option>
                      {select_loading === "gotra" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Gothra_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
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
                          e.target.value,
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
                          e.target.value,
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
                      {select_loading === "occupation" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Occupation.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
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
                      {All_Occupation.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
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
                          e.target.value,
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
                        e.target.value,
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Education_Group.length === 0)
                          getAll_Education_Group();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails?.HighestEducation || ""
                        }
                      >
                        {user_profile?.EducationDetails?.HighestEducation ||
                          "Select Education"}
                      </option>
                      {select_loading === "education" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Education_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Education_Specialization.length === 0)
                          getall_education_specialization();
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
                      {select_loading === "education_specialization" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Education_Specialization.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Occupation.length === 0)
                          getall_occupation();
                      }}
                    >
                      <option
                        value={user_profile?.EducationDetails?.Occupation || ""}
                      >
                        {user_profile?.EducationDetails?.Occupation ||
                          "Select Occupation"}
                      </option>
                      {select_loading === "occupation" && (
                        <option disabled>Loading...</option>
                      )}
                      {All_Occupation.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Income_Group.length === 0)
                          getall_income_group();
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
                      {select_loading === "income" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Income_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                          e.target.value,
                        )
                      }
                      onClick={() => {
                        if (All_Income_Group.length === 0)
                          getall_income_group();
                      }}
                    >
                      <option
                        value={
                          user_profile?.EducationDetails?.PersonalIncome || ""
                        }
                      >
                        {user_profile?.EducationDetails?.PersonalIncome ||
                          "Select Personal Income"}
                      </option>
                      {select_loading === "income" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Income_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                        e.target.value,
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
                        e.target.value,
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
                          e.target.value,
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
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute("data-id");
                        handleChange(
                          "ContactDetails",
                          "Country",
                          e.target.value,
                        );
                        getall_state_group(selectedId);
                      }}
                    // onClick={() => {
                    //   if (All_Country_Group.length === 0)
                    //     getall_country_group();
                    // }}
                    >
                      <option
                        value={user_profile?.ContactDetails?.Country || ""}
                      >
                        {user_profile?.ContactDetails?.Country ||
                          "Select Country"}
                      </option>
                      {select_loading === "country" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Country_Group.map((item) => (
                        <option
                          key={item._id}
                          value={item.lookup_value}
                          data-id={item._id}
                        >
                          {item.lookup_value}
                        </option>
                      ))}
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
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute("data-id");
                        handleChange("ContactDetails", "State", e.target.value);
                        getall_city_group(selectedId);
                      }}
                    >
                      <option value={user_profile?.ContactDetails?.State || ""}>
                        {user_profile?.ContactDetails?.State || "Select State"}
                      </option>
                      {select_loading === "state" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_State_Group.map((item) => (
                        <option
                          key={item._id}
                          value={item.lookup_value}
                          data-id={item._id}
                        >
                          {item.lookup_value}
                        </option>
                      ))}
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
                      {select_loading === "city" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_City_Group.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Postal Code */}
                  {/* <div>
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
                  </div> */}
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
                          ].map((h) => (
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
                                e.target.value,
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
                                e.target.value,
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
                                e.target.value,
                              )
                            }
                          />
                          Widow/Widower
                        </label>
                      </div>
                    </div>

                    {/* ✅ Show extra fields if Divorce is selected */}
                    {(user_profile.PartnerPrefrences.MaritialStatus ===
                      "Divorced" ||
                      user_profile.PartnerPrefrences.MaritialStatus ===
                      "Widow/Widower") && (
                        <div className="mt-3 ml-4 space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="accent-red-600"
                              checked={
                                user_profile.PartnerPrefrences.HasChildren ||
                                false
                              }
                              onChange={(e) =>
                                handleChange(
                                  "PartnerPrefrences",
                                  "HasChildren",
                                  e.target.checked,
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
                                value={
                                  user_profile.PartnerPrefrences.ChildrenCount ||
                                  0
                                }
                                onChange={(e) =>
                                  handleChange(
                                    "PartnerPrefrences",
                                    "ChildrenCount",
                                    e.target.value,
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
                                e.target.value,
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
                                e.target.value,
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
                                e.target.value,
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
                                e.target.value,
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
                                e.target.value,
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
                                e.target.value,
                              )
                            }
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>

                    {/* ✅ If user nri */}
                    {user_profile?.PartnerPrefrences?.Nri === "Yes" && (
                      <div className="flex flex-col gap-2 ml-6">
                        <label className="text-sm text-gray-700 font-medium">
                          Resident Status
                        </label>

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            name="PermanentResident"
                            className="w-4 h-4"
                            checked={
                              user_profile.PartnerPrefrences.PermanentResident
                            }
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
                            checked={
                              user_profile.PartnerPrefrences.TemporaryResident
                            }
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
                        onChange={(e) => {
                          const selectedId =
                            e.target.selectedOptions[0].getAttribute("data-id");
                          handleChange(
                            "PartnerPrefrences",
                            "Religion",
                            e.target.value,
                          )
                          getall_cast_group(selectedId);
                        }
                        }

                        onClick={() => {
                          getall_religion_group();
                        }}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.Religion || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.Religion ||
                            "Select Religion"}
                        </option>
                        {select_loading === "religion" && (
                          <option disabled>Loading...</option>
                        )}
                        {All_Religion_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value} data-id={item._id}>
                            {item.lookup_value}
                          </option>
                        ))}
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
                            e.target.value,
                          )
                        }
                        onClick={() => {
                          getall_community_group();
                        }}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.Community || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.Community ||
                            "Select Community"}
                        </option>
                        {select_loading === "community" && (
                          <option disabled>Loading...</option>
                        )}
                        {All_Community_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Caste */}

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Caste
                      </label>

                      <FormControl fullWidth>
                        <Select
                          name="Caste"
                          multiple
                          value={user_profile?.PartnerPrefrences?.Caste || []}
                          open={openSelect === "Caste"}
                          onOpen={() => setOpenSelect("Caste")}
                          onClose={() => setOpenSelect("")}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "Caste");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Caste
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                  maxHeight: "40px",
                                  overflowY: "auto",
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
                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "cast" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Cast_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Caste.includes(
                                  option.lookup_value,
                                )}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Gothram */}

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Gothram
                      </label>

                      <FormControl fullWidth>
                        <Select
                          name="Caste"
                          multiple
                          value={user_profile?.PartnerPrefrences?.Gothram || []}
                          onOpen={() => {
                            getall_gothra_group();
                            setOpenSelect("Gothram");
                          }}
                          open={openSelect === "Gothram"}
                          onClose={() => setOpenSelect("")}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "Gothram");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Gothram
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                  maxHeight: "40px",
                                  overflowY: "auto",
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
                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "gotra" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Gothra_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Gothram.includes(
                                  option.lookup_value,
                                )}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Mother Tongue */}

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Mother Tongue
                      </label>

                      <FormControl fullWidth>
                        <Select
                          name="MotherTongue"
                          multiple
                          value={
                            user_profile?.PartnerPrefrences?.MotherTongue || []
                          }

                          onOpen={() => {
                            getall_mother_tongue();
                            setOpenSelect("MotherTongue");
                          }}
                          open={openSelect === "MotherTongue"}
                          onClose={() => setOpenSelect("")}
                          onChange={(e) => {
                            handleMultiSelectChange(e, "MotherTongue");
                          }}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return (
                                <span style={{ color: "#888" }}>
                                  Select Mother Tounge
                                </span>
                              );
                            }
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                  maxHeight: "40px",
                                  overflowY: "auto",
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

                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "mother_tongue" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Mother_Tongue.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.MotherTongue.includes(
                                  option.lookup_value,
                                )}
                                color="primary"
                              />
                              {option.lookup_value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                            e.target.value,
                          )
                        }
                        onClick={() => {
                          getall_income_group();
                        }}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences
                              ?.AnnualFamilyIncome || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences
                            ?.AnnualFamilyIncome ||
                            "Select Annual Family Income"}
                        </option>
                        {select_loading === "income" && (
                          <option disabled>Loading...</option>
                        )}
                        {All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))}
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
                            e.target.value,
                          )
                        }
                        onClick={() => {
                          getall_income_group();
                        }}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.PersonalIncome ||
                            ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.PersonalIncome ||
                            "Select Personal Income"}
                        </option>
                        b
                        {All_Income_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))}
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
                          value={
                            user_profile?.PartnerPrefrences?.PropertySize || []
                          }

                          onOpen={() => {
                            getall_property_size();
                            setOpenSelect("PropertySize");
                          }}
                          open={openSelect === "PropertySize"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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
                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "property_size" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Property_Size.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.PropertySize.includes(
                                  option.lookup_value,
                                )}
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
                          value={
                            user_profile?.PartnerPrefrences?.HeighstEducation ||
                            []
                          }

                          onOpen={() => {
                            getAll_Education_Group();
                            setOpenSelect("Education");
                          }}
                          open={openSelect === "Education"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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

                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "education" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Education_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.HeighstEducation.includes(
                                  option.lookup_value,
                                )}
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
                          value={
                            user_profile?.PartnerPrefrences?.Occupation || []
                          }

                          onOpen={() => {
                            getall_occupation();
                            setOpenSelect("Occupation");
                          }}
                          open={openSelect === "Occupation"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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

                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "occupation" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Occupation.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Occupation.includes(
                                  option.lookup_value,
                                )}
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
                          onOpen={() => {
                            setOpenSelect("Country");
                          }}
                          open={openSelect === "Country"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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
                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "country" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_Country_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                              data-id={option._id}
                              onClick={() => getall_state_group(option._id)}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.Country.includes(
                                  option.lookup_value,
                                )}
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

                          onOpen={() => {
                            getall_state_group()
                            setOpenSelect("State");
                          }}
                          open={openSelect === "State"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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
                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "state" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_State_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                              data-id={option._id}
                              onClick={() => getall_city_group(option._id)}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.State.includes(
                                  option.lookup_value,
                                )}
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
                          onOpen={() => {

                            setOpenSelect("City");
                          }}
                          open={openSelect === "City"}
                          onClose={() => setOpenSelect("")}
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
                                  maxHeight: "40px",
                                  overflowY: "auto",
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

                          <MenuItem
                            // disabled
                            value={false}
                            sx={{
                              justifyContent: "flex-end",
                              borderBottom: "1px solid #eee",
                              pointerEvents: "auto",   // VERY IMPORTANT
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSelect("");
                              }}
                            >
                              <CloseIcon fontSize="small" sx={{ color: "red" }} />
                            </IconButton>
                          </MenuItem>
                          {select_loading === "city" && (
                            <MenuItem disabled>Loading...</MenuItem>
                          )}
                          {All_City_Group.map((option) => (
                            <MenuItem
                              key={option._id}
                              value={option.lookup_value}
                            >
                              <Checkbox
                                checked={user_profile?.PartnerPrefrences?.City.includes(
                                  option.lookup_value,
                                )}
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
                      onChange={(e) => {
                        handleChange(
                          "PropertyDetails",
                          "PropertyType",
                          e.target.value,
                        );
                      }}
                      onClick={() => {
                        if (All_Property_Type.length === 0)
                          getall_property_type();
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
                      {select_loading === "property_type" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Property_Type.map((item) => (
                        <option
                          key={item._id}
                          value={item.lookup_value}
                          data-id={item._id}
                        >
                          {item.lookup_value}
                        </option>
                      ))}
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
                      onChange={(e) => {
                        handleChange(
                          "PropertyDetails",
                          "ResidentialType",
                          e.target.value,
                        );
                      }}
                      onClick={() => {
                        if (All_Residence_Type.length === 0)
                          getall_residence_type();
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
                      {select_loading === "residence_type" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Residence_Type.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                      onChange={(e) => {
                        handleChange(
                          "PropertyDetails",
                          "PropertySize",
                          e.target.value,
                        );
                      }}
                      onClick={() => {
                        if (All_Property_Size.length === 0)
                          getall_property_size();
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
                      {select_loading === "property_size" && (
                        <option disabled>Loading...</option>
                      )}

                      {/* Show fetched values */}
                      {All_Property_Size.map((item) => (
                        <option key={item._id} value={item.lookup_value}>
                          {item.lookup_value}
                        </option>
                      ))}
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
                        e.target.value,
                      )
                    }
                    value={user_profile.PropertyDetails.PropertyDescription}
                  ></textarea>
                </div>


                {/* Terms & Conditions */}
                <div className="flex items-start gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    className="mt-1 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    checked={user_profile?.PropertyDetails?.AcceptTerms || false}
                    onChange={(e) =>
                      handleChange(
                        "PropertyDetails",
                        "AcceptTerms",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700 mt-1">
                    I accept the{" "}
                    <span className="text-red-600 font-medium cursor-pointer" onClick={() => navigate('/terms-conditions')}>
                      Terms & Conditions
                    </span>
                  </label>
                </div>

              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className={`px-5 py-2 rounded-lg border ${step === 1
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
