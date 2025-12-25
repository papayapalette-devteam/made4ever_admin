import React, { useState } from "react";
import { FaFileExcel, FaUserFriends } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import api from "../../../api";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";

const Settings = () => {
 


  const [loading, setLoading] = useState(false);

  // 📂 Read Excel
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
      });

      // ✅ id ko array me convert karo
      const formattedData = jsonData.map((row) => ({
        ...row,
        id: row.id
          ? String(row.id).split(",").map((x) => x.trim())
          : [],
      }));

      // setExcelData(formattedData);
      sendToServer(formattedData)
    };

    reader.readAsBinaryString(file);
    
  };
  




const sendToServer = async (excelData, chunkSize = 10) => {
  if (!excelData.length) {
    Swal.fire({
      icon: "warning",
      title: "No Data Found",
      text: "Please upload an Excel file with valid data.",
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    });
    return;
  }

  setLoading(true);

  try {
    let savedTotal = 0;
    let failedTotal = 0;

    // Show initial Swal
    Swal.fire({
      title: "Uploading Msp...",
      html: `0 / ${excelData.length} processed`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      
    });

    // Split data into chunks
    for (let i = 0; i < excelData.length; i += chunkSize) {
      const chunk = excelData.slice(i, i + chunkSize);

      const res = await api.post("api/msp/bulk-upload", { data: chunk });
      savedTotal += res.data.savedCount;
      failedTotal += res.data.failedCount;

      // Update Swal message after each chunk
      Swal.update({
        html: `${savedTotal + failedTotal} / ${excelData.length} processed<br/>
               <b>Saved:</b> ${savedTotal}<br/>
               <b>Failed:</b> ${failedTotal}`,
      });
    }

    // ✅ Show final result after all chunks
    Swal.close(); // close progress Swal

    if (savedTotal > 0 && failedTotal === 0) {
      Swal.fire({
        icon: "success",
        title: "Upload Successful 🎉",
        text: `All records uploaded successfully (${savedTotal})`,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
        },
      }).then(() => window.location.reload());
    } else if (savedTotal > 0 && failedTotal > 0) {
      Swal.fire({
        icon: "warning",
        title: "Partial Upload ⚠️",
        html: `<b>Saved:</b> ${savedTotal}<br/><b>Failed:</b> ${failedTotal}`,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
        },
      }).then(() => window.location.reload());
    } 
    // else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Upload Failed ❌",
    //     text: "All records failed validation or already exist.",
    //     customClass: {
    //       popup: "small-swal-popup",
    //       confirmButton: "my-swal-button",
    //     },
    //   }).then(() => window.location.reload());
    // }

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Bulk upload failed. Please try again.",
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    }).then(() => window.location.reload());
  } finally {
    setLoading(false);
  }
};





  return (
    <div>
          <Adminheader />
    
          <div className="layout">
            <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
      
      {/* Header */}
      <div className="profile-header">
        <h2 className="text-3xl font-bold text-rose-900">Settings</h2>
        <p className="mt-2 text-rose-700">
          Manage your matrimony platform uploads
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        
        {/* Upload MSP Data */}
        <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 text-white mb-4">
            <FaFileExcel size={26} />
          </div>

          <h3 className="text-xl font-semibold text-rose-900">
            Upload MSP Data
          </h3>

          <p className="mt-2 text-sm text-rose-700 leading-relaxed">
            Securely upload MSP Excel data to onboard service partners into the
            matrimony ecosystem.
          </p>

      <label className="mt-6 w-full flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-3 text-white font-semibold shadow-lg hover:from-emerald-700 hover:to-green-600 transition-all duration-300">
  {loading ? <CircularProgress/> : " 📊 Upload Excel File"}
 
  <input
    type="file"
    accept=".xlsx,.xls,.csv"
    onChange={handleFile}
    className="hidden"
  />
</label>

        </div>

        {/* Upload Profiles */}
        <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-600 to-rose-500 text-white mb-4">
            <FaUserFriends size={26} />
          </div>

          <h3 className="text-xl font-semibold text-rose-900">
            Upload Profiles
          </h3>

          <p className="mt-2 text-sm text-rose-700 leading-relaxed">
            Bulk upload matrimony profiles via Excel to save time and ensure
            consistency across records.
          </p>

            <label className="mt-6 w-full flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-3 text-white font-semibold shadow-lg hover:from-emerald-700 hover:to-green-600 transition-all duration-300">
  
  📊 Upload Excel File

  <input
    type="file"
    accept=".xlsx,.xls,.csv"
    // onChange={handleFile}
    className="hidden"
  />
</label>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Settings;
