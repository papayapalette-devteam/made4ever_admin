import React, { useState } from "react";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
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

function AddBlog() {
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

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

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("api/upload/upload-single", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlog({ ...blog, image: res.data.url });
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     Save Blog
  ============================== */
  const saveBlog = async () => {
    if (!blog.title || !blog.content) {
      return Swal.fire("Required", "Title & Content are required", "warning");
    }

    try {
      setLoading(true);
      const resp = await api.post("api/blog/create-blog", blog);
      if (resp.status === 200) {
        Swal.fire("Success", "Blog published", "success")
          .then(() => window.location.reload());
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
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

  <IconButton onClick={() => exec("bold")}><FormatBoldIcon /></IconButton>
  <IconButton onClick={() => exec("italic")}><FormatItalicIcon /></IconButton>
  <IconButton onClick={() => exec("underline")}><FormatUnderlinedIcon /></IconButton>
  <IconButton onClick={() => exec("strikeThrough")}><StrikethroughSIcon /></IconButton>

  <IconButton onClick={() => exec("insertUnorderedList")}><FormatListBulletedIcon /></IconButton>
  <IconButton onClick={() => exec("insertOrderedList")}><FormatListNumberedIcon /></IconButton>

  <IconButton onClick={() => exec("justifyLeft")}><FormatAlignLeftIcon /></IconButton>
  <IconButton onClick={() => exec("justifyCenter")}><FormatAlignCenterIcon /></IconButton>
  <IconButton onClick={() => exec("justifyRight")}><FormatAlignRightIcon /></IconButton>
  <IconButton onClick={() => exec("justifyFull")}><FormatAlignJustifyIcon /></IconButton>

  <IconButton
    onClick={() => {
      const url = prompt("Enter URL");
      if (url) document.execCommand("createLink", false, url);
    }}
  >
    <LinkIcon />
  </IconButton>

  <IconButton onClick={() => exec("removeFormat")}><ClearIcon /></IconButton>
  <IconButton onClick={() => exec("undo")}><UndoIcon /></IconButton>
  <IconButton onClick={() => exec("redo")}><RedoIcon /></IconButton>
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
              ></div>

              {/* Blog Image */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <label className="form-label">Blog Image</label>
                <input type="file" onChange={handleImageUpload} />
                {blog.image && (
                  <img src={blog.image} alt="preview" style={{ width: 120, marginTop: 10 }} />
                )}
              </FormControl>

              <Button sx={{ mt: 3 }} className="submit-button" onClick={saveBlog}>
                Publish Blog
              </Button>
            </Paper>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loader-overlay">
          <UniqueLoader />
        </div>
      )}
    </div>
  );
}

export default AddBlog;
