import React, { useState, useEffect } from "react";

import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { axiosInstance } from "../axios/axios";



const WhyOKPinAPI = ({ darkMode }) => {
  // ✅ الحالة الخاصة بالبطاقات
  const [activeCard, setActiveCard] = useState(1); // يبدأ بـ First Card (order = 1)

  // ✅ حالة البيانات المستلمة من API
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    image: "", // دعم الصورة
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
      .get(`/api-page/why-ok/${activeCard}`)
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
      const response = await axiosInstance.patch(`/api-page/why-ok/${activeCard}`, {
        title: { ar: formData.titleAr, en: formData.titleEn },
        description: { ar: formData.descriptionAr, en: formData.descriptionEn },
        image: formData.image, // إرسال الصورة الحالية
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
        <HomeIcon sx={{ color: "#FF2A66", fontSize: "24px", mr: 1 }} />
        <Typography variant="h6" component="h1">
          Landing Page / Why Okpin Section
        </Typography>
      </Box>

      {/* ✅ الأزرار لاختيار البطاقة */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {[1, 2, 3, 4].map((order) => (
          <Button
            key={order}
            onClick={() => setActiveCard(order)}
            sx={{
              borderRadius: "8px",
              background:
                activeCard === order
                  ? "var(--primary-purple, #9022FF)"
                  : darkMode
                  ? "#131D32"
                  : "#f5f5f5",
              color: activeCard === order ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background:
                  activeCard === order
                    ? "var(--primary-purple, #9022FF)"
                    : darkMode
                    ? "#1E2A40"
                    : "#e0e0e0",
              },
            }}
          >
            Card {order}
          </Button>
        ))}
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

export default WhyOKPinAPI;
