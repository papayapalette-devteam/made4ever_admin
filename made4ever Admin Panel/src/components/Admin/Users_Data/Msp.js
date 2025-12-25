import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  Chip,
  Menu,
  Paper,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import api from "../../../api";
import Swal from "sweetalert2";
// import UniqueLoader from '../../../other component/loader';
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import "../admincss/common_config.css";
import UniqueLoader from "../loader";

function Msp() {
  const [Msp, setMsp] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    registered_business_name: "",
    address: "",
    id: [],
  });

  const [loading, setloading] = useState(false);

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Msp_Data, setAll_Msp_Data] = useState([]);
  const getall_msp_data = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/msp/Getmsp?${params.toString()}`);

      setAll_Msp_Data(resp.data.msp);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_msp_data();
  }, [paginationModel]);

  console.log(All_Msp_Data);
  
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleOpenMenu = (event, rowId) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };

  const onEdit = (row) => {
    setMsp(row)
  };


const onDelete = async (_id) => {
  if (!_id) return;

  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This MSP will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      popup: "small-swal-popup",
      confirmButton: "my-swal-button",
      cancelButton: "my-swal-button"
    },
  });

  if (!confirm.isConfirmed) return;

  try {
    setloading(true);

    await api.delete(`api/msp/delete-msp/${_id}`);

    Swal.fire({
      icon: "success",
      title: "MSP Deleted",
      text: "MSP deleted successfully",
      showConfirmButton: true,
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
        cancelButton: "my-swal-button",
      },
    }).then(() => {
      window.location.reload(); // optional
    });

  } catch (error) {
    console.error("❌ API Error:", error);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: error?.response?.data?.message || "Something went wrong",
      showConfirmButton: true,
      customClass: {
        confirmButton: "my-swal-button",
      },
    });

  } finally {
    setloading(false);
  }
};



  const columns = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.6,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "images",
      headerName: "Id",
      flex: 1,
      renderCell: (params) => (
        <a
          href={params.value} // full image URL
          target="_blank" // open in new tab
          rel="noopener noreferrer" // security best practice
        >
          <img
            src={params.value}
            alt="User"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </a>
      ),
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "password", headerName: "MSP Password", flex: 2 },
    { field: "mobile_number", headerName: "Phone", flex: 2 },
    { field: "credits", headerName: "Credits", flex: 2 },
    { field: "createdAt", headerName: "Add Date", flex: 1.5 },
    { field: "total_match", headerName: "Total Match", flex: 1.5 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleOpenMenu(e, params.row._id)}>
            <MoreVertIcon />
          </IconButton>

          {menuRowId === params.row._id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleCloseMenu}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  onEdit(params.row);
                  handleCloseMenu();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDelete(params.row.id);
                  handleCloseMenu();
                }}
              >
                Delete
              </MenuItem>
           <MenuItem
            onClick={() => {
              setSelectedRow(params.row);
              setOpenCreditModal(true);
              handleCloseMenu();
            }}
          >
            Edit Credit
          </MenuItem>

            </Menu>
          )}
        </>
      ),
    },
  ];

const rows = All_Msp_Data?.map((doc) => ({
  id: doc._id,        // DataGrid unique id
  name: doc.name,
  email: doc.email,
  mobile_number: doc.mobile_number,
  address: doc.address,
  password:doc.password,
  images: doc.id,     // rename your image array
  createdAt:doc.createdAt,
  credits: doc.credits,
  current_plan: doc.current_plan,
  subscription_valid_till: doc.subscription_valid_till,
}));



  

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    // Auto upload when files selected
    await uploadFiles(files);
  };

  // Upload to backend API
  const uploadFiles = async (files) => {
    if (!files.length) return;
    setloading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      

      setMsp({ ...Msp, id: res.data.urls });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setloading(false);
    }
  };

  const handlechange = (e) => {
    const { name, value, checked, type } = e.target;

    setMsp((prev) => {
      // Handle boolean radios (true/false as string)
      const booleanFields = ["IsEmailVerified", "IsPhoneVerified"];
      if (booleanFields.includes(name)) {
        return { ...prev, [name]: value === "true" };
      }

      // Handle checkboxes (single boolean)
      if (type === "checkbox" && !Array.isArray(prev[name])) {
        return { ...prev, [name]: checked };
      }

      // Handle checkboxes (array)
      if (type === "checkbox" && Array.isArray(prev[name])) {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updated };
      }

      // Normal single-value field
      return { ...prev, [name]: value };
    });
  };

 
  
  //========================== post api for create msp =============================

  const add_msp_data = async () => {
  try {
    setloading(true);

    // extract confirm_password & _id
    const { confirm_password, _id, ...payload } = Msp;

    // password check (only when adding or changing password)
    if (!_id && Msp.password !== confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password And Confirm Password Not Matched...",
        showConfirmButton: true,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
        },
      });
      return;
    }

    let resp;

    if (_id) {
      // 🔄 UPDATE
      resp = await api.put(`api/msp/update-msp/${_id}`, payload);
    } else {
      // ➕ ADD
      resp = await api.post("api/msp/Savemsp", payload);
    }

    Swal.fire({
      icon: "success",
      title: _id ? "MSP Updated" : "MSP Added",
      text: _id
        ? "MSP Updated Successfully..."
        : "MSP Added Successfully...",
      showConfirmButton: true,
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    }).then(() => {
      window.location.reload(); // optional
    });

  } catch (error) {
    console.error("❌ API Error:", error);

    Swal.fire({
      icon: "error",
      title: "Error Occurred",
      text: error?.response?.data?.message || "Something went wrong",
      showConfirmButton: true,
      customClass: {
        confirmButton: "my-swal-button",
      },
    });

  } finally {
    setloading(false);
  }
};

// update credit

const [openCreditModal, setOpenCreditModal] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [credit, setCredit] = useState(0);

useEffect(() => {
  if (selectedRow) {
    setCredit(selectedRow?.credits || 0);
  }
}, [selectedRow]);


const handleUpdateCredit = async (BureauId, credit) => {
  try {
     setloading(true);
    const resp=await api.put(`api/msp/update-credit/${BureauId}`, {
      credit,
    });

     Swal.fire({
      icon: "success",
      title: "Credit Updated",
      text: "MSP Credit Updated Successfully...",
      showConfirmButton: true,
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
      },
    }).then(() => {
      window.location.reload(); // optional
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error Occurred",
      text: error?.response?.data?.message || "Something went wrong",
      showConfirmButton: true,
      customClass: {
        confirmButton: "my-swal-button",
      },
    });
  }
  finally
  {
     setloading(false);
  }
};



  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <div className="profile-header">
              <h3>Enter Details for Msp</h3>
              <p>
                Add or update the required details for the msp to keep records
                accurate and complete.
              </p>
            </div>

            {/* Form */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
                <FormControl fullWidth size="small">
                  <label className="form-label">Name</label>
                  <TextField
                    name="name"
                    placeholder="Name"
                    defaultValue={Msp.name}
                    onChange={handlechange}
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Email</label>
                  <TextField
                    name="email"
                    placeholder="Email"
                    defaultValue={Msp.email}
                    onChange={handlechange}
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Password</label>
                  <TextField
                    name="password"
                    placeholder="Password"
                    defaultValue={Msp.password}
                    onChange={handlechange}
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Confirm Password</label>
                  <TextField
                    name="confirm_password"
                    placeholder="Confirm Password"
                    defaultValue={Msp.confirm_password}
                    onChange={handlechange}
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Mobile Number</label>
                  <TextField
                    name="mobile_number"
                    placeholder="Mobile Number"
                    defaultValue={Msp.mobile_number}
                    onChange={handlechange}
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Registered Business Name</label>
                  <TextField
                    name="registered_business_name"
                    placeholder="Registered Business Name"
                    defaultValue={Msp.registered_business_name}
                    onChange={handlechange}
                    size="small"
                  />
                   
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Upload Your Id</label>
                  <TextField
                    type="file"
                    name="id"
                    placeholder="Mobile Number"
                    defaultValue={Msp.id}
                    onChange={handleFileChange}
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth size="small">
                  <label className="form-label">Address</label>
                  <TextField
                    name="address"
                    defaultValue={Msp.address}
                    onChange={handlechange}
                    placeholder="Address"
                  ></TextField>
                </FormControl>
              </div>

              <Button className="submit-button" onClick={add_msp_data}>
                Submit
              </Button>
            </Paper>

            {/* Table */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 4 }}>
              <div style={{ width: "100%", overflowX: "auto" }}>
                <DataGrid
                  className="custom-data-grid"
                  rows={rows}
                  columns={columns}
                  rowCount={rowCount}
                  paginationMode="server"
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[10]}
                  disableSelectionOnClick
                  sx={{
                    minWidth: 1200, // Set min width larger than container
                  }}
                />
              </div>
            </Paper>
          </div>
        </div>
      </div>

  {/* modal for update credit */}

  <Dialog
  open={openCreditModal}
  onClose={() => setOpenCreditModal(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: 600
    }}
  >
    Edit Bureau Credit
    <IconButton onClick={() => setOpenCreditModal(false)}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent>
    <Typography variant="body2" color="text.secondary" mb={2}>
      Credit can be updated in multiples of 5
    </Typography>

    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={3}
      mt={3}
    >
      <Button
        variant="outlined"
        onClick={() => setCredit((prev) => Math.max(0, prev - 5))}
      >
        − 5
      </Button>

      <Typography variant="h4" fontWeight={600}>
        {credit}
      </Typography>

      <Button
        variant="outlined"
        onClick={() => setCredit((prev) => prev + 5)}
      >
        + 5
      </Button>
    </Box>
  </DialogContent>

  <DialogActions sx={{ p: 2 }}>
    <Button onClick={() => setOpenCreditModal(false)}>
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={() => {
        handleUpdateCredit(selectedRow._id, credit);
        setOpenCreditModal(false);
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>



      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UniqueLoader />
        </div>
      )}
    </div>
  );
}

export default Msp;
