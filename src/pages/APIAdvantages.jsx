import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import API from "./icons/API";
import { axiosInstance } from "../axios/axios";

const APIAdvantages = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [apiData, setApiData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    image: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const apiEndpoints = [
    "api-page/api-advatages/1",
    "api-page/api-advatages/2",
    "api-page/api-advatages/3",
    "api-page/api-advatages/4",
  ];

  // جلب البيانات عند تحميل الصفحة أو عند تغيير التبويبة
  useEffect(() => {
    axiosInstance
      .get(`/${apiEndpoints[activeTab]}`)
      .then((response) => {
        const { title, description, image } = response.data;
        setApiData({
          titleAr: title.ar || "",
          titleEn: title.en || "",
          descriptionAr: description.ar || "",
          descriptionEn: description.en || "",
          image: image || "",
        });
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to load data", severity: "error" });
      });
  }, [activeTab]);

  // تحديث القيم عند التغيير في الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiData({ ...apiData, [name]: value });
  };

  // تحويل الصورة إلى Base64 عند اختيارها
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setApiData({ ...apiData, image: reader.result }); // حفظ الصورة كـ Base64
    };
  };

  // إرسال البيانات إلى API
  const handleSave = () => {
    axiosInstance
      .patch((`/${apiEndpoints[activeTab]}`), {
        title: { ar: apiData.titleAr, en: apiData.titleEn },
        description: { ar: apiData.descriptionAr, en: apiData.descriptionEn },
        image: apiData.image, // إرسال الصورة كـ Base64
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
        padding: { xs: 2, sm: 3 },
        backgroundColor: darkMode ? "#050A17" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderRadius: "12px",
      }}
    >
      {/* عنوان الصفحة */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <API />
        <Typography variant="h6" component="h1">
          API Page / API Advantages
        </Typography>
      </Box>

      {/* الأزرار */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {["One", "Two", "Three", "Four"].map((tab, index) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(index)}
            sx={{
              borderRadius: "8px",
              background: activeTab === index ? "#9022FF" : darkMode ? "#131D32" : "#f5f5f5",
              color: activeTab === index ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background: activeTab === index ? "#9022FF" : darkMode ? "#1E2A40" : "#e0e0e0",
              },
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* الحقول */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
        <TextField label="Title (Arabic)" name="titleAr" value={apiData.titleAr} onChange={handleChange} multiline rows={2} />
        <TextField label="Title (English)" name="titleEn" value={apiData.titleEn} onChange={handleChange} multiline rows={2} />
        <TextField label="Description (Arabic)" name="descriptionAr" value={apiData.descriptionAr} onChange={handleChange} multiline rows={5} />
        <TextField label="Description (English)" name="descriptionEn" value={apiData.descriptionEn} onChange={handleChange} multiline rows={5} />
      </Box>

      {/* رفع الصورة وعرضها */}
      <Box sx={{ mb: 3 }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {apiData.image && (
          <Box mt={2}>
            <Typography>Preview:</Typography>
            <img
              src={apiData.image}
              alt="Uploaded Preview"
              style={{ width: "150px", height: "150px", borderRadius: "8px" }}
            />
          </Box>
        )}
      </Box>

      {/* زر الحفظ */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          borderRadius: "12px",
          padding: "10px 20px",
          background: "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": { background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)" },
        }}
      >
        Save Changes
      </Button>

      {/* رسالة النجاح أو الفشل */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default APIAdvantages;
