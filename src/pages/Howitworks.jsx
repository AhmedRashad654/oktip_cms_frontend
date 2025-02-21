import React, { useState, useEffect } from "react";

import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import API from "./icons/API";
import { axiosInstance } from "../axios/axios";



const HowItWorks = ({ darkMode }) => {
  // ✅ حالة البطاقة النشطة
  const [activeCard, setActiveCard] = useState(1);

  // ✅ حالة البيانات المستلمة من API
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    image: "", // دعم الصورة عند الحاجة
  });

  // ✅ حالة التوستر (Snackbar) للنجاح أو الفشل
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ جلب البيانات عند تحميل الصفحة أو تغيير البطاقة
  useEffect(() => {
    axiosInstance
      .get(`/api-page/how-it-works`)
      .then((response) => {
        if (response.data && response.data.title && response.data.description) {
          setFormData({
            titleAr: response.data.title.ar || "",
            titleEn: response.data.title.en || "",
            descriptionAr: response.data.description.ar || "",
            descriptionEn: response.data.description.en || "",
            image: response.data.image || "", // حفظ الصورة إن وجدت
          });
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
        setSnackbar({
          open: true,
          message: "❌ فشل تحميل البيانات!",
          severity: "error",
        });
      });
  }, [activeCard]);

  // ✅ تحديث البيانات عند إدخال المستخدم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ إرسال البيانات عند الضغط على "Save Changes"
  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(`/api-page/how-it-works`, {
        title: { ar: formData.titleAr, en: formData.titleEn },
        description: { ar: formData.descriptionAr.replace(/\n/g, "\\n"), en: formData.descriptionEn },
        image: formData.image, // إرسال الصورة إذا كانت متاحة
      });

      console.log("✅ Success:", response.data);
      setSnackbar({
        open: true,
        message: "✅ تم حفظ التغييرات بنجاح!",
        severity: "success",
      });
    } catch (error) {
      console.error("❌ Error updating:", error.response?.data || error);
      setSnackbar({
        open: true,
        message: "❌ فشل التحديث! تحقق من الاتصال بالإنترنت.",
        severity: "error",
      });
    }
  };

  // ✅ إغلاق `Snackbar`
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      {/* ✅ العنوان مع الأيقونة */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <API />
        <Typography variant="h6" component="h1">
          API Page / How it Works
        </Typography>
      </Box>

      {/* ✅ الحقول */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField label="Title (Arabic)" name="titleAr" value={formData.titleAr} onChange={handleChange} multiline rows={3} />
        <TextField label="Title (English)" name="titleEn" value={formData.titleEn} onChange={handleChange} multiline rows={3} />
        <TextField label="Description (Arabic)" name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} multiline rows={5} />
        <TextField label="Description (English)" name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} multiline rows={5} />
      </Box>

      {/* ✅ زر الحفظ */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          borderRadius: "12px",
          padding: "10px 20px",
          background: "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
          },
        }}
      >
        Save Changes
      </Button>

      {/* ✅ Snackbar لإظهار نجاح أو فشل العملية */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HowItWorks;
