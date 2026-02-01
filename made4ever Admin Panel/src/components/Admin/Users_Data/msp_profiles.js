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
import ProfileModal from "../../other component/msp_profile_view";
import { useLocation, useNavigate } from "react-router-dom";

function MspProfiles() {
    const location=useLocation()
    const navigate=useNavigate()
    const id=location.state.id


  const [loading, setloading] = useState(false);

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const pageSizeOptions = [10, 25, 50, 100];
  const handlePageSizeChange = (event) => {
    setPaginationModel((prev) => ({
      ...prev,
      pageSize: event.target.value,
      page: 0, // reset page to 0 whenever limit changes
    }));
  };

  const [searchText, setSearchText] = useState("");
  const [All_Msp_Profiles, setAll_Msp_Profiles] = useState([]);
  const getall_msp_profiles = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize,
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      // 🔍 Search
      if (searchText) {
        params.append("search", searchText);
      }

      if (id) {
        params.append("bureau", id);
      }

      const resp = await api.get(`api/user/get-all-profile?${params.toString()}`);
      console.log(resp);

      setAll_Msp_Profiles(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_msp_profiles();
  }, [paginationModel, searchText]);

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



  const onDelete = async (_id) => {
    if (!_id) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This Profile will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "small-swal-popup",
        confirmButton: "my-swal-button",
        cancelButton: "my-swal-button",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      setloading(true);

      await api.delete(`api/user/delete-user/${_id}`);

      Swal.fire({
        icon: "success",
        title: "Profile Deleted",
        text: "Profile deleted successfully",
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
    { field: "name", headerName: "Name", flex: 2,renderCell: (params) => params?.row?.PersonalDetails?.Name},
    { field: "age", headerName: "Age", flex: 2,renderCell: (params) => params?.row?.PersonalDetails?.Age},
    { field: "dob", headerName: "DOB", flex: 2,renderCell: (params) => params?.row?.PersonalDetails?.DateOfBirth},
    { field: "height", headerName: "Height", flex: 2,renderCell: (params) => params?.row?.PersonalDetails?.Height},
    { field: "community", headerName: "Community", flex: 2,renderCell: (params) => params?.row?.ReligiousDetails?.Community},
    { field: "religion", headerName: "Religion", flex: 2,renderCell: (params) => params?.row?.ReligiousDetails?.Religion},
    { field: "fathername", headerName: "Father Name", flex: 2,renderCell: (params) => params?.row?.FamilyDetails?.FatherName},
    { field: "addon", headerName: "Add On", flex: 2,renderCell: (params) => new Date(params?.row?.createdAt).toLocaleString()},
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
                onClick={()=>navigate('/update-user-profile',{state:{id:params.row}})}
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
                onClick={()=>navigate('/user-profile',{state:{id:params.row._id}})}
              >
                View
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  const rows = All_Msp_Profiles?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));



 

 
  //========================== post api for create msp =============================



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
      const resp = await api.put(`api/msp/update-credit/${BureauId}`, {
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
    } finally {
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
              <h3>Msp Profiles</h3>
              <p>
                Delete or update the required details for the msp's profiles to keep records
                accurate and complete.
              </p>
            </div>

       

            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 4 }}>
              <TextField
                size="small"
                placeholder="Search MSP (Name / Email / Mobile)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ width: 300, mb: 2 }}
              />
            </Paper>

            {/* Table */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 1 }}>
              <div
                style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl size="small">
                  <InputLabel>Rows per page</InputLabel>
                  <Select
                    value={paginationModel.pageSize}
                    label="Rows per page"
                    onChange={handlePageSizeChange}
                  >
                    {pageSizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

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
            fontWeight: 600,
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
          <Button onClick={() => setOpenCreditModal(false)}>Cancel</Button>

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

export default MspProfiles;
