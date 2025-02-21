import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { axiosInstance } from "../axios/axios";

// ✅ تعيين `baseURL` لتجنب تكرار الرابط في كل مرة
axios.defaults.baseURL = "https://cms-i47k.onrender.com";

const Offer = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ جلب البيانات عند تحميل الصفحة (GET)
  useEffect(() => {
    axiosInstance
      .get("/landing-page/offer")
      .then((response) => {
        console.log("✅ Data fetched:", response.data);
        if (response.data && response.data.title && response.data.description) {
          setFormData({
            titleAr: response.data.title.ar || "",
            titleEn: response.data.title.en || "",
            descriptionAr: response.data.description.ar || "",
            descriptionEn: response.data.description.en || "",
          });
        }
      })
      .catch((error) => console.error("❌ Error fetching data:", error));
  }, []);

  // ✅ تحديث البيانات عند الضغط على "Save Changes" (PATCH)
  const handleSave = async () => {
    const requestData = {
      title: {
        ar: formData.titleAr,
        en: formData.titleEn,
      },
      description: {
        ar: formData.descriptionAr,
        en: formData.descriptionEn,
      },
    };
  
    console.log("📌 Data being sent to API:", JSON.stringify(requestData, null, 2)); // ✅ طباعة البيانات قبل الإرسال
  
    setLoading(true);
  
    try {
      const response = await axiosInstance.patch("/landing-page/offer", requestData);
  
      console.log("✅ Success:", response.data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("❌ Error updating offer section:", error.response?.data || error);
      alert("❌ فشل التحديث! تحقق من البيانات التي يتم إرسالها.");
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ إغلاق `Snackbar`
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          Landing Page / Offer Section
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
        <TextField
          label="Title (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={2}
          name="titleAr"
          value={formData.titleAr}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000", fontSize: "18px", fontWeight: "bold" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#4B6A9B" : "#ccc" },
              "&:hover fieldset": { borderColor: "#FF2A66" },
            },
          }}
        />
        <TextField
          label="Title (English)"
          placeholder="Write here"
          multiline
          rows={2}
          name="titleEn"
          value={formData.titleEn}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000", fontSize: "18px", fontWeight: "bold" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#4B6A9B" : "#ccc" },
              "&:hover fieldset": { borderColor: "#FF2A66" },
            },
          }}
        />
        <TextField
          label="Description (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={4}
          name="descriptionAr"
          value={formData.descriptionAr}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000", fontSize: "16px" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#4B6A9B" : "#ccc" },
              "&:hover fieldset": { borderColor: "#FF2A66" },
            },
          }}
        />
        <TextField
          label="Description (English)"
          placeholder="Write here"
          multiline
          rows={4}
          name="descriptionEn"
          value={formData.descriptionEn}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000", fontSize: "16px" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "#4B6A9B" : "#ccc" },
              "&:hover fieldset": { borderColor: "#FF2A66" },
            },
          }}
        />
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
          "&:hover": { background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)" },
        }}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>

      {/* ✅ Snackbar لإظهار نجاح العملية */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          ✅ تم حفظ التغييرات بنجاح!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Offer;
