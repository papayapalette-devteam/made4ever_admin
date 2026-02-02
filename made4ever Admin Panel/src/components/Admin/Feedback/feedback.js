import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Select,
  Autocomplete,
  MenuItem,
  Menu,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function AddFeedback() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [feedback, setfeedback] = useState({
    bureau: "",
    feedback: "",
    image: "",
    audio: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Feedback, setAll_Feedback] = useState([]);
  const getall_feedback = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize,
  ) => {
    try {
      setLoading("get-feedback");
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(
        `api/feedback/get-feedback?${params.toString()}`,
      );

      setAll_Feedback(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    getall_feedback();
  }, [paginationModel]);

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

  const [selectedBureau, setSelectedBureau] = useState(null);
  const [editId, setEditId] = useState(null);
  const onEdit = (row) => {
    setEditId(row._id);
    setfeedback({ bureau: row.bureau._id, feedback: row.feedback });
    setSelectedBureau(row.bureau);
  };

  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Feedback?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup: "small-swal-popup",
          confirmButton: "my-swal-button",
          cancelButton: "my-swal-cancel-button",
        },
      });

      // 🔹 If user cancels, stop execution
      if (!confirmResult.isConfirmed) return;

      const resp = await api.delete(`api/feedback/delete-feedback/${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Feedback Deleted",
            text: "Feedback Deleted Successfully...",
            showConfirmButton: true,
            customClass: {
              popup: "small-swal-popup",
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      } else {
        console.warn("⚠️ Error:", resp.data.response.data.message);
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error Occured",
            text: resp.data.response.data.message,
            showConfirmButton: true,
            customClass: {
              confirmButton: "my-swal-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }, 0);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text: error.response?.data?.message || "Something went wrong",
          showConfirmButton: true,
          customClass: { confirmButton: "my-swal-button" },
        }).then(() => {
          window.location.reload(); // optional, you can remove this if not needed
        });
      }, 0);
    }
  };

  const column = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "bureau",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => params.row.bureau?.name || "-",
    },
    {
      field: "registred_business_name",
      headerName: "Register Business Name",
      flex: 1,
      renderCell: (params) =>
        params.row.bureau?.registered_business_name || "-",
    },
    { field: "feedback", headerName: "Feedback", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 80,
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
                  onDelete(params.row);
                  handleCloseMenu();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  const rows = All_Feedback?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));

  /* ==============================
     Image Upload
  ============================== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading1(true);
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setfeedback({ ...feedback, image: res.data.urls[0] });
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setLoading1(false);
    }
  };

  /* ==============================
     Image Upload
  ============================== */
  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading2(true);
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setfeedback({ ...feedback, audio: res.data.urls[0] });
    } catch {
      Swal.fire("Error", "Audio upload failed", "error");
    } finally {
      setLoading2(false);
    }
  };


  /* ==============================
     Save Feedback
  ============================== */
  const saveFeedback = async () => {
    try {
      setLoading("save-feedback");
      const resp = editId
        ? await api.put(`api/feedback/update-feedback/${editId}`, feedback)
        : await api.post("api/feedback/add-feedback", feedback);

      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: editId ? "Feedback updated successfully" : "Feedback published",
          icon: "success",
          customClass: {
            confirmButton: "my-swal-button",
          },
        }).then(() => {
          setEditId(null);
          setfeedback({ bureau: "", feedback: "" });
          window.location.reload();
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
        customClass: {
          confirmButton: "my-swal-button",
        },
      });
    } finally {
      setLoading("");
    }
  };

  const [bureauOptions, setBureauOptions] = useState([]);

  let searchTimeout;

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

  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <div className="profile-header">
              <h3>Add Feedback</h3>
              <p>Create and publish feedbacks.</p>
            </div>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              {/* Select Bureau */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label className="form-label">Select Bureau</label>

                <Autocomplete
                  options={bureauOptions}
                  loading={loading}
                  value={selectedBureau}
                   getOptionLabel={(option) =>
    option
      ? `${option.registered_business_name} - ${option.mobile_number}`
      : ""
  }
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  } // 👈 important
                  onInputChange={(event, value) => fetchBureaus(value)}
                  onChange={(event, newValue) => {
                    setSelectedBureau(newValue);
                    setfeedback({
                      ...feedback,
                      bureau: newValue?._id || "",
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Type bureau name..."
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading && <CircularProgress size={18} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>

              {/* Feedback Text */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label className="form-label">Feedback</label>
                <TextField
                  size="small"
                  value={feedback.feedback}
                  onChange={(e) =>
                    setfeedback({ ...feedback, feedback: e.target.value })
                  }
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <label className="form-label">Image</label>
                <input type="file" onChange={handleImageUpload} />
                {loading1 ? (
                  <CircularProgress size={24} />
                ) : (
                  feedback.image && (
                    <img
                      src={feedback.image}
                      alt="preview"
                      style={{ width: 120, marginTop: 10 }}
                    />
                  )
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <label className="form-label">Audio (if available)</label>

                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                />

                {loading2 ? (
                  <CircularProgress size={24} sx={{ mt: 1 }} />
                ) : (
                  feedback?.audio && (
                    <audio
                      src={feedback.audio}
                      controls
                      style={{ width: "100%", marginTop: 10 }}
                    />
                  )
                )}
              </FormControl>

              {/* Submit Button */}
              <Button
                sx={{ mt: 3 }}
                className="submit-button"
                onClick={saveFeedback}
                disabled={!feedback.bureau || !feedback.feedback}
              >
                Publish Feedback
              </Button>
            </Paper>

            {/* Table */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 4 }}>
              <DataGrid
                className="custom-data-grid"
                rows={rows}
                columns={column}
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10]}
                disableSelectionOnClick
              />
            </Paper>
          </div>
        </div>
        {loading === "save-feedback" && (
          <div className="loader-overlay">
            <UniqueLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFeedback;
