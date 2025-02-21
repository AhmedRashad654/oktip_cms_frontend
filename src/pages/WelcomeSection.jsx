import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import { axiosInstance } from "../axios/axios";

const WelcomeSection = ({ darkMode }) => {
  // حالة لحفظ البيانات من الـ inputs
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    images: [],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

 
  useEffect(() => {
    axiosInstance
      .get(`/landing-page/welcome`)
      .then((response) => {
        const { title, description, images } = response.data;
        setFormData({
          titleAr: title.ar || "",
          titleEn: title.en || "",
          descriptionAr: description.ar || "",
          descriptionEn: description.en || "",
          images: images || [], // استرجاع الصور المخزنة كـ Base64
        });
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to load data", severity: "error" });
      });
  }, []);

  // **📌 تحديث القيم عند التغيير في الإدخال**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // **📌 تحويل الصورة إلى Base64 عند اختيارها**
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = formData.images || [];

    if (files.length + currentImages.length > 12) {
      alert("You can only upload up to 12 images.");
      return;
    }

    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result); // حفظ الصورة كـ Base64
      });
    });

    Promise.all(promises).then((base64Images) => {
      setFormData({ ...formData, images: [...currentImages, ...base64Images] });
    });
  };

  // **📌 حذف صورة من القائمة**
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, imgIndex) => imgIndex !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // **📌 إرسال البيانات إلى API**
  const handleSave = () => {
    axiosInstance
      .patch(`/landing-page/welcome`, {
        title: { ar: formData.titleAr, en: formData.titleEn },
        description: { ar: formData.descriptionAr, en: formData.descriptionEn },
        images: formData.images, // إرسال الصور كـ Base64
      })
      .then(() => {
        setSnackbar({ open: true, message: "Data updated successfully!", severity: "success" });
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to update data", severity: "error" });
      });
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: darkMode ? "#050A17" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderRadius: "12px",
      }}
    >
      {/* العنوان مع الأيقونة */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <HomeIcon sx={{ color: "#FF2A66", fontSize: "24px", mr: 1 }} />
        <Typography variant="h6" component="h1">
          Landing Page / Welcome Section
        </Typography>
      </Box>

      {/* الحقول */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
        {["titleAr", "titleEn", "descriptionAr", "descriptionEn"].map((field, index) => (
          <TextField
            key={index}
            label={
              field.includes("title")
                ? field.includes("Ar") ? "Title (Arabic)" : "Title (English)"
                : field.includes("Ar") ? "Description (Arabic)" : "Description (English)"
            }
            name={field}
            value={formData[field]}
            onChange={handleChange}
            multiline
            rows={field.includes("title") ? 4 : 6}
            sx={{
              backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: darkMode ? "#4B6A9B" : "#ccc" },
                "&:hover fieldset": { borderColor: "#FF2A66" },
              },
              "& .MuiInputBase-input": { color: darkMode ? "#fff" : "#000" },
              "& .MuiInputLabel-root": { color: darkMode ? "#fff" : "#000" },
            }}
          />
        ))}
      </Box>

      {/* حقل رفع الصور */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
          padding: 2,
          borderRadius: "12px",
          mb: 3,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("image-upload-input").click()}
      >
        <Typography sx={{ color: darkMode ? "#fff" : "#000", fontSize: "14px", fontWeight: 500 }}>
          Upload up to {12 - formData.images.length} images
        </Typography>
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        {/* عرض الصور المرفوعة */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {formData.images.map((image, index) => (
            <Box key={index} sx={{ position: "relative", width: "100px", height: "100px", borderRadius: "8px", overflow: "hidden" }}>
              <img src={image} alt={`Uploaded ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", padding: "4px" }}
              >
                <CloseIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* زر الحفظ */}
      <Button onClick={handleSave} variant="contained" sx={{ borderRadius: "12px", padding: "10px 20px", background: "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)", color: "#fff", fontWeight: "bold" }}>
        Save Changes
      </Button>

      {/* رسالة النجاح أو الفشل */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default WelcomeSection;
