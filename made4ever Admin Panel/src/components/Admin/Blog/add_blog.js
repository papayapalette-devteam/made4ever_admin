import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PaletteIcon from "@mui/icons-material/Palette";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LinkIcon from "@mui/icons-material/Link";
import ClearIcon from "@mui/icons-material/Clear";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatBoldIcon from "@mui/icons-material/FormatItalic";

import api from "../../../api";
import Swal from "sweetalert2";
import UniqueLoader from "../loader";
import Adminsidebar from "../adminsidebar";
import Adminheader from "../adminheader";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function AddBlog() {
  const [loading, setLoading] = useState("");

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid pages start from 0
    pageSize: 10,
  });

  const [All_Blog, setAll_Blog] = useState([]);
  const getall_blog = async (
    pageNumber = paginationModel.page,
    limitNumber = paginationModel.pageSize
  ) => {
    try {
      setLoading("get-blog");
      const params = new URLSearchParams();

      // Pagination
      params.append("page", pageNumber + 1); // backend is 1-indexed
      params.append("limit", limitNumber);

      const resp = await api.get(`api/blog/all-blogs?${params.toString()}`);

      setAll_Blog(resp.data.data);
      setRowCount(resp.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };

  useEffect(() => {
    getall_blog();
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

  const onEdit = (row) => {
    setBlog(row);
  };


  const onDelete = async (row) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this Blog?",
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

      const resp = await api.delete(`api/blog/delete-blog?id=${row._id}`);

      if (resp.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Blog Deleted",
            text: "Blog Deleted Successfully...",
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
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    {
  field: "image",
  headerName: "Image",
  flex: 1,
  renderCell: (params) => (
    <img
      src={params.value}
      alt="profile"
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ),
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

  const rows = All_Blog?.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));

  /* ==============================
     Text Formatting
  ============================== */
  const exec = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
  };

  const fontSizeMap = {
    1: "10px",
    2: "12px",
    3: "14px",
    4: "18px",
    5: "24px",
    6: "30px",
    7: "36px",
  };

  const setFontSize = (size) => {
    if (!size) return;

    document.execCommand("fontSize", false, size);

    const fonts = document.getElementsByTagName("font");
    for (let i = 0; i < fonts.length; i++) {
      if (fonts[i].size === size) {
        fonts[i].removeAttribute("size");
        fonts[i].style.fontSize = fontSizeMap[size];
      }
    }
  };

  /* ==============================
     Image Upload
  ============================== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading("image-upload");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlog({ ...blog, image: res.data.urls[0] });
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setLoading("");
    }
  };

  /* ==============================
     Save Blog
  ============================== */
  const saveBlog = async () => {
    if (!blog.title || !blog.content) {
      return Swal.fire({
        title: "warning",
        text: "Required,Title & Content are required",
        icon: "warning",
        customClass: {
          confirmButton: "my-swal-button",
        },
      });
    }

    try {
      setLoading("save-blog");
      const resp = await api.post("api/blog/add-blog", blog);

      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Blog published",
          icon: "success",
          customClass: {
            confirmButton: "my-swal-button",
          },
        }).then(() => window.location.reload());
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

  return (
    <div>
      <Adminheader />

      <div className="layout">
        <Adminsidebar />
        <div className="content-wrapper">
          <div className="main-content">
            <div className="profile-header">
              <h3>Add Blog</h3>
              <p>Create and publish blogs.</p>
            </div>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              {/* Blog Title */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label className="form-label">Blog Title</label>
                <TextField
                  size="small"
                  value={blog.title}
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                />
              </FormControl>

              {/* Toolbar */}
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: 8,
                  borderRadius: 6,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {/* Font Size */}
                <select
                  onChange={(e) => setFontSize(e.target.value)}
                  style={{ padding: 6, borderRadius: 4 }}
                >
                  <option value="">Font Size</option>
                  <option value="1">10px</option>
                  <option value="2">12px</option>
                  <option value="3">14px</option>
                  <option value="4">18px</option>
                  <option value="5">24px</option>
                  <option value="6">30px</option>
                  <option value="7">36px</option>
                </select>

                {/* Text Color */}
                <label>
                  <PaletteIcon />
                  <input
                    type="color"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      document.execCommand("foreColor", false, e.target.value)
                    }
                  />
                </label>

                {/* Background Color */}
                <label>
                  <FormatColorFillIcon />
                  <input
                    type="color"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      document.execCommand("hiliteColor", false, e.target.value)
                    }
                  />
                </label>

                <IconButton onClick={() => exec("bold")}>
                  <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={() => exec("italic")}>
                  <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={() => exec("underline")}>
                  <FormatUnderlinedIcon />
                </IconButton>
                <IconButton onClick={() => exec("strikeThrough")}>
                  <StrikethroughSIcon />
                </IconButton>

                <IconButton onClick={() => exec("insertUnorderedList")}>
                  <FormatListBulletedIcon />
                </IconButton>
                <IconButton onClick={() => exec("insertOrderedList")}>
                  <FormatListNumberedIcon />
                </IconButton>

                <IconButton onClick={() => exec("justifyLeft")}>
                  <FormatAlignLeftIcon />
                </IconButton>
                <IconButton onClick={() => exec("justifyCenter")}>
                  <FormatAlignCenterIcon />
                </IconButton>
                <IconButton onClick={() => exec("justifyRight")}>
                  <FormatAlignRightIcon />
                </IconButton>
                <IconButton onClick={() => exec("justifyFull")}>
                  <FormatAlignJustifyIcon />
                </IconButton>

                <IconButton
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) document.execCommand("createLink", false, url);
                  }}
                >
                  <LinkIcon />
                </IconButton>

                <IconButton onClick={() => exec("removeFormat")}>
                  <ClearIcon />
                </IconButton>
                <IconButton onClick={() => exec("undo")}>
                  <UndoIcon />
                </IconButton>
                <IconButton onClick={() => exec("redo")}>
                  <RedoIcon />
                </IconButton>
              </div>

              {/* Content Editor */}
              <div
                contentEditable
                style={{
                  border: "1px solid #ccc",
                  minHeight: 200,
                  padding: 10,
                  marginTop: 8,
                  borderRadius: 6,
                }}
                onInput={(e) =>
                  setBlog({ ...blog, content: e.currentTarget.innerHTML })
                }
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              ></div>

              {/* Blog Image */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <label className="form-label">Blog Image</label>
                <input type="file" onChange={handleImageUpload} />
                {loading === "image-upload" ? (
                  <CircularProgress size={24} />
                ) : (
                  blog.image && (
                    <img
                      src={blog.image}
                      alt="preview"
                      style={{ width: 120, marginTop: 10 }}
                    />
                  )
                )}
              </FormControl>

              <Button
                sx={{ mt: 3 }}
                className="submit-button"
                onClick={saveBlog}
              >
                Publish Blog
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
        {loading === "save-blog" && (
          <div className="loader-overlay">
            <UniqueLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddBlog;
