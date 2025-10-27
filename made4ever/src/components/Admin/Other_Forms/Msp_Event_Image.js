import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Menu,
} from "@mui/material";
import { IconButton, } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";

function MspEventImage() {
  const [loading, setloading] = useState(false);
  const [Msp_Event_Image, setMsp_Event_Image] = useState({
    msp_event_image: [],
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Event_Image, setAll_Event_Image] = useState([]);
  const getall_event_image = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/msp/Getmsp-event-image?${params.toString()}`);

      setAll_Event_Image(resp.data.mspEventImage);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_event_image();
  }, []);


  
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

  const [lookup_id, setlookup_id] = useState(null);
  const onEdit = (row) => {
    setlookup_id(row._id);
    setMsp_Event_Image({
      msp_event_image: row.parent_lookup_id,
    });
  };
  const onDelete = () => {
    alert("delete");
  };

  const columns = [
    {
      field: "sno",
      headerName: "S.No.",
      flex: 0.2,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
   {
  field: "msp_event_image",
  headerName: "Event Photos",
  flex: 1,
  renderCell: (params) => {
    const images = params.value; // array of image URLs

    if (!Array.isArray(images) || images.length === 0) {
      return <span>No Images</span>;
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {images.map((img, index) => (
          <a
            key={index}
            href={img}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={img}
              alt={`Event ${index + 1}`}
              style={{
                width: 40,
                height: 40,
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            />
          </a>
        ))}
      </div>
    );
  },
},

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
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

  const rows = All_Event_Image?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
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

      setMsp_Event_Image({
        ...Msp_Event_Image,
        msp_event_image: res.data.urls,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setloading(false);
    }
  };

  const add_msp_event_image = async () => {
    try {
      setloading(true);

      const resp = await api.post("api/msp/Savemsp-event-image", Msp_Event_Image);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "MSP Added",
            text: "MSP Addedd Successfully...",
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
      console.error("❌ API Error:", error.response.data.message);
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
              <h3>Upload MSP Event Images</h3>
              <p>
                Add or update the msp event images to keep records accurate and
                complete.
              </p>
            </div>

            {/* Form */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
                <FormControl fullWidth size="small">
                  <label className="form-label">Upload MSP Event Images </label>
                  <input
                    type="file"
                    multiple
                    name="msp_event_image"
                    // value={Msp_Event_Image.msp_event_image}
                    onChange={handleFileChange}
                  ></input>
                </FormControl>
              </div>

              <Button className="submit-button" onClick={add_msp_event_image}>
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
                // sx={{
                //   minWidth: 800, // Set min width larger than container
                // }}
              />
              </div>
            </Paper>
          </div>
        </div>
      </div>

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

export default MspEventImage;
