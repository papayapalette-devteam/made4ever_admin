import React, { useState, useEffect } from "react";
import { Button, FormControl, MenuItem, Paper, Menu } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import { DataGrid } from "@mui/x-data-grid";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";

function MspVideo() {
  const [loading, setloading] = useState(false);
  const [Msp_Video, setMsp_Video] = useState({
    msp_video: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Msp_Video, setAll_Msp_Video] = useState([]);
  const getall_msp_video = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setloading(true);
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/msp/Getmsp-video?${params.toString()}`);

      setAll_Msp_Video(resp.data.mspVideo);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getall_msp_video();
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
    setMsp_Video({
      msp_video: row.lookup_value,
    });
  };

  const onDeletehospital = () => {
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
      field: "msp_video",
      headerName: "Event Videos",
      flex: 1,
      renderCell: (params) => {
        const videos = params.value; // array of video URLs

        if (!Array.isArray(videos) || videos.length === 0) {
          return <span>No Videos</span>;
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
            {videos.map((video, index) => (
              <a
                key={index}
                href={video}
                target="_blank"
                rel="noopener noreferrer"
              >
                <video
                  src={video}
                  style={{
                    width: 80,
                    height: 50,
                    borderRadius: "6px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // stop the video from playing inline
                    window.open(video, "_blank"); // open in new tab
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
                  onDeletehospital(params.row);
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

  const rows = All_Msp_Video?.map((doc, index) => ({
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

      setMsp_Video({
        ...Msp_Video,
        msp_video: res.data.urls,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setloading(false);
    }
  };

  const add_msp_video = async () => {
    try {
      setloading(true);

      const resp = await api.post("api/msp/Savemsp-video", Msp_Video);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Msp Video Added",
            text: "Msp Video Uploaded Successfully...",
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
              <h3>Upload MSP Video</h3>
              <p>
                Add or update the msp video to keep records accurate and
                complete.
              </p>
            </div>

            {/* Form */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <div className="form-grid">
                <FormControl fullWidth size="small">
                  <label className="form-label">Upload MSP Video </label>
                  <input
                    multiple
                    type="file"
                    name="msp_video"
                    onChange={handleFileChange}
                  ></input>
                </FormControl>
              </div>

              <Button className="submit-button" onClick={add_msp_video}>
                Submit
              </Button>
            </Paper>

            {/* Table */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, marginTop: 4 }}>
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

export default MspVideo;
