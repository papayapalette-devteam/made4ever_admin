import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  height: "100vh",
  bgcolor: "#fff",
  borderRadius: "14px 0 0 14px",
  boxShadow: "-8px 0 24px rgba(0,0,0,0.18)",
  p: 3,
  overflowY: "auto",
  overflowX: "hidden",
};

const compactInputStyle = {
  "& .MuiOutlinedInput-root": {
    minHeight: 24,
    fontSize: "12px",
    borderRadius: "10px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "6px 10px",
    lineHeight: "1.2",
  },
  "& .MuiInputLabel-root": {
    fontSize: "11px",
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
    images: [],
    profile_pic: [],
  });

  const [loading, setLoading] = useState(false);
  const [img_loading, setimg_loading] = useState(false);
  const [profilepic_loading, setprofilepic_loading] = useState(false);

  /* Load Data */
  useEffect(() => {
    if (mspData) {
      setFormData({
        name: mspData.name || "",
        email: mspData.email || "",
        password: "",
        mobile_number: mspData.mobile_number || "",
        registered_business_name: mspData.registered_business_name || "",
        address: mspData.address || "",
        images: mspData.images || [],
        profile_pic: mspData.profile_pic || [],
      });
    }
  }, [mspData]);

  /* Handle Input Change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Upload ID Images */
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setimg_loading(true);

    const uploadData = new FormData();
    files.forEach((file) => uploadData.append("files", file));

    try {
      const res = await api.post(
        "api/upload/upload-files",
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...res.data.urls],
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setimg_loading(false);
    }
  };

  /* Upload Profile Pic */
  const handleProfilePicChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setprofilepic_loading(true);

    const uploadData = new FormData();
    files.forEach((file) => uploadData.append("files", file));

    try {
      const res = await api.post(
        "api/upload/upload-files",
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData((prev) => ({
        ...prev,
        profile_pic: [...prev.profile_pic, ...res.data.urls],
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setprofilepic_loading(false);
    }
  };

  /* Remove Images */
  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeProfilePicField = (index) => {
    setFormData((prev) => ({
      ...prev,
      profile_pic: prev.profile_pic.filter((_, i) => i !== index),
    }));
  };

  /* Submit */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { ...formData };

      const resp = await api.put(
        `/api/msp/update-msp/${mspData._id}`,
        payload
      );

      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully",
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
          <Typography fontSize="16px" fontWeight={600} mb={2}>
            Edit Profile
          </Typography>

          <div className="flex flex-col gap-2">

            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={compactInputStyle}
            />

            <TextField
              label="Email"
              value={formData.email}
              fullWidth
              size="small"
              disabled
              sx={compactInputStyle}
            />

            <TextField
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={compactInputStyle}
            />

            <TextField
              label="Mobile Number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={compactInputStyle}
            />

            <TextField
              label="Business Name"
              name="registered_business_name"
              value={formData.registered_business_name}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={compactInputStyle}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              size="small"
              multiline
              rows={2}
              sx={compactInputStyle}
            />

            {/* Profile Images */}
            <p className="text-xs font-semibold mt-2">Profile Images</p>
            {formData.profile_pic.map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  src={img}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <IconButton
                  color="error"
                  onClick={() => removeProfilePicField(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Button component="label" size="small" variant="outlined">
              {profilepic_loading ? "Uploading..." : "Add Profile Image"}
              <input hidden type="file" accept="image/*" onChange={handleProfilePicChange} />
            </Button>

            {/* ID Images */}
            <p className="text-xs font-semibold mt-3">ID Images</p>
            {formData.images.map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  src={img}
                  alt="id"
                  className="w-12 h-12 rounded object-cover border"
                />
                <IconButton
                  color="error"
                  onClick={() => removeImageField(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Button component="label" size="small" variant="outlined">
              {img_loading ? "Uploading..." : "Add ID Image"}
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>

          </div>
        </Box>
      </Slide>
    </Modal>
  );
};

export default EditMspProfileModal;
