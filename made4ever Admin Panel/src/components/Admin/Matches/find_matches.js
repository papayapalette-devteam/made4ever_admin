import React, { useEffect, useState } from "react";

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
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";

export default function FindMatches() {
  const [step, setStep] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));


  //======================== state for adding a user=========================================

  const [user_profile, setuser_profile] = useState({
    PartnerPrefrences: {
      AgeRange: { MinAge: "", MaxAge: "" },
      HeightRange: { MinHeight: "", MaxHeight: "" },
      MaritialStatus: "",
      NonVeg: "",
      Manglik: "",
      Nri: "",
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
    }
  });



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
      params.append("lookup_type", "religion_group");
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


  //============================== multiple value onchange =================================

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






  //========================= post method for adding new profile===============================

  const add_new_profile = async () => {
    try {
      const resp = await api.post("api/user/add-new-profile", user_profile);
     
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Created!",
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
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6 px-6 text-center">
          <h1 className="text-3xl font-bold">
              Find Matches
            </h1>

            <p className="text-sm opacity-90 mt-1">
              Complete your details to get the best matches!
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/*================================ STEP 6 - Partner Preferences========================= */}
         
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
                            "4'5",
                            "4'8",
                            "5'0",
                            "5'2",
                            "5'5",
                            "5'8",
                            "6'0",
                            "6'2",
                            "6'5",
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
                            "4'5",
                            "4'8",
                            "5'0",
                            "5'2",
                            "5'5",
                            "5'8",
                            "6'0",
                            "6'2",
                            "6'5",
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
                        Nri
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
                        onClick={() => {getall_religion_group()}}
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
                        All_Religion_Group.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
                      </select>
                    </div>

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
                      <select
                        className="border rounded-lg p-3 focus:ring-2 focus:ring-red-500 w-full"
                        name="PropertySize"
                        value={user_profile?.PartnerPrefrences?.PropertySize}
                        onChange={(e) =>
                          handleChange(
                            "PartnerPrefrences",
                            "PropertySize",
                            e.target.value
                          )
                        }
                        onClick={() => {getall_property_size()}}
                      >
                        <option
                          value={
                            user_profile?.PartnerPrefrences?.PropertySize || ""
                          }
                        >
                          {user_profile?.PartnerPrefrences?.PropertySize ||
                            "Select Property Size"}
                        </option>
                          {
                        All_Property_Size.map((item) => (
                          <option key={item._id} value={item.lookup_value}>
                            {item.lookup_value}
                          </option>
                        ))
                      }
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
        

          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
              <button
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={add_new_profile}
              >
                Cancel
              </button>

        
              <button
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                onClick={add_new_profile}
              >
                Find
              </button>
         
          </div>
        </div>
      </div>

      </div>
    </div>
    </div>
    </div>
  );
}
