import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Slide,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import api from "../../../api";

/* Slide Animation */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

/* Modal Style */
const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 420,
  height: "100vh", // 🔥 REQUIRED for scroll
  bgcolor: "#fff",
  borderRadius: "14px 0 0 14px",
  boxShadow: "-8px 0 24px rgba(0,0,0,0.18)",
  p: 3,
  overflowY: "auto", // 🔥 vertical scroll
  overflowX: "hidden",
  animation: "slideIn 0.35s ease-out",
};

const compactInputStyle = {
  "& .MuiOutlinedInput-root": {
    minHeight: 24, // 🔥 IMPORTANT (not height)
    fontSize: "12px",
    borderRadius: "10px",
  },

  "& .MuiOutlinedInput-input": {
    padding: "6px 10px", // 🔥 reduce padding
    lineHeight: "1.2", // 🔥 reduce text height
  },

  "& .MuiInputLabel-root": {
    fontSize: "11px",
    top: "-1px",
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(12px, -6px) scale(0.85)",
  },
};

const EditMspProfileModal = ({ open, handleClose, mspData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    registered_business_name: "",
    address: "",
    id: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mspData) {
      setFormData({
        name: mspData.name || "",
        email: mspData.email || "",
        password: "",
        mobile_number: mspData.mobile_number || "",
        registered_business_name: mspData.registered_business_name || "",
        address: mspData.address || "",
        id: mspData.id || [],
      });
    }
  }, [mspData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [img_loading, setimg_loading] = useState(false);
  /* Image Upload */
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    // Auto upload when files selected
    await uploadFiles(files);
  };

  // Upload to backend API
  const uploadFiles = async (files) => {
    if (!files.length) return;
    setimg_loading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await api.post("api/upload/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);

      setFormData({ ...formData, id: res.data.urls });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setimg_loading(false);
    }
  };

  const removeImageField = (index) => {
    setFormData({
      ...formData,
      id: formData.id.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { ...formData };
      const resp = await api.put(`/api/msp/update-msp/${mspData._id}`, payload);

      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully",
          customClass: {
           confirmButton: "swal-confirm-btn",
        },
        }).then(() => {
          window.location.reload();
        });
      }

      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #f857a6, #ff5858)",
              color: "#fff",
              p: 1.5,
              borderRadius: 2,
              mb: 2,
              textAlign: "center",
            }}
          >
            <Typography fontSize="15px" fontWeight={600}>
              💖 Edit Profile
            </Typography>
            <Typography fontSize="11px" opacity={0.9}>
              Keep your profile updated
            </Typography>
          </Box>

          <div className="flex flex-col gap-2 p-2">
            <TextField
              label="Name"
              name="name"
              fullWidth
              size="small"
              value={formData.name}
              onChange={handleChange}
              sx={compactInputStyle}
            />

            <TextField
              label="Email"
              fullWidth
              size="small"
              disabled
              value={formData.email}
              sx={compactInputStyle}
            />

            <TextField
              label="New Password"
              name="password"
              type="password"
              fullWidth
              size="small"
              value={formData.password}
              onChange={handleChange}
              helperText="Leave blank to keep current password"
              sx={{
                ...compactInputStyle,
                "& .MuiFormHelperText-root": { fontSize: "9.5px" },
              }}
            />

            <TextField
              label="Mobile Number"
              name="mobile_number"
              fullWidth
              size="small"
              value={formData.mobile_number}
              onChange={handleChange}
              sx={compactInputStyle}
            />

            <TextField
              label="Business Name"
              name="registered_business_name"
              fullWidth
              size="small"
              value={formData.registered_business_name}
              onChange={handleChange}
              sx={compactInputStyle}
            />

            <TextField
              label="Address"
              name="address"
              fullWidth
              size="small"
              multiline
              rows={2}
              value={formData.address}
              onChange={handleChange}
              sx={compactInputStyle}
            />

            {/* Images */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold">Profile Images</p>

              {formData.id.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                  {img && (
                    <img
                      src={img}
                      alt="preview"
                      className="w-12 h-12 rounded-full border border-pink-400 object-cover"
                    />
                  )}

                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    sx={{ fontSize: "10.5px", height: 30 }}
                  >
                    {img_loading ? "Loading..." : "Choose Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </Button>

                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => removeImageField(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              size="small"
              onClick={handleClose}
              sx={{ borderRadius: "16px", fontSize: "11px" }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                borderRadius: "16px",
                fontSize: "11px",
                background: "linear-gradient(135deg, #f857a6, #ff5858)",
                px: 3,
              }}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default EditMspProfileModal;
