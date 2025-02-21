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
import { axiosInstance } from "../axios/axios";
const Safety = ({ darkMode }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [safetyData, setSafetyData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    imageUrl: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const safetyEndpoints = [
    "landing-page/saftey/1",
    "landing-page/saftey/2",
    "landing-page/saftey/3",
  ];

  // جلب البيانات عند تحميل الصفحة أو عند تغيير التبويبة
  useEffect(() => {
    axiosInstance
      .get(`${safetyEndpoints[activeCard]}`)
      .then((response) => {
        const { title, description } = response.data;
        setSafetyData({
          titleAr: title.ar || "",
          titleEn: title.en || "",
          descriptionAr: description.ar || "",
          descriptionEn: description.en || "",
          imageUrl: response.data.imageUrl || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching safety data:", error);
        setSnackbar({
          open: true,
          message: "Failed to load data",
          severity: "error",
        });
      });
  }, [activeCard]);

  // تحديث القيم عند التغيير في الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSafetyData({ ...safetyData, [name]: value });
  };

  // تحديث الصورة عند التغيير
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file); // ✅ تحويل الصورة إلى Base64
    reader.onloadend = () => {
      setSafetyData({ ...safetyData, image: reader.result }); // ✅ حفظ Base64 في state
    };
  };
  
  

  // إرسال البيانات إلى API
  const handleSave = () => {
    axiosInstance
      .patch(`/landing-page/saftey/${activeCard + 1}`, {
        title: { ar: safetyData.titleAr, en: safetyData.titleEn },
        description: { ar: safetyData.descriptionAr, en: safetyData.descriptionEn },
        image: safetyData.image, // ✅ إرسال الصورة كـ Base64 string
      }, {
        headers: { "Content-Type": "application/json" }, // ✅ التأكد من أن البيانات ترسل كـ JSON
      })
      .then(() => {
        setSnackbar({ open: true, message: "Safety data updated successfully!", severity: "success" });
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
      {/* العنوان */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" component="h1">
          Landing Page / Safety
        </Typography>
      </Box>

      {/* الأزرار */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        {["First Card", "Second Card", "Third Card"].map((card, index) => (
          <Button
            key={card}
            onClick={() => setActiveCard(index)}
            sx={{
              borderRadius: "8px",
              background:
                activeCard === index
                  ? "var(--primary-purple, #9022FF)"
                  : darkMode
                  ? "#131D32"
                  : "#f5f5f5",
              color: activeCard === index ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background:
                  activeCard === index
                    ? "var(--primary-purple, #9022FF)"
                    : darkMode
                    ? "#1E2A40"
                    : "#e0e0e0",
              },
            }}
          >
            {card}
          </Button>
        ))}
      </Box>

      {/* الحقول */}
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
          name="titleAr"
          value={safetyData.titleAr}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Title (English)"
          name="titleEn"
          value={safetyData.titleEn}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Description (Arabic)"
          name="descriptionAr"
          value={safetyData.descriptionAr}
          onChange={handleChange}
          multiline
          rows={5}
        />
        <TextField
          label="Description (English)"
          name="descriptionEn"
          value={safetyData.descriptionEn}
          onChange={handleChange}
          multiline
          rows={5}
        />
      </Box>

      {/* رفع الصورة وعرضها */}
      <Box sx={{ mb: 3 }}>
  <input type="file" accept="image/*" onChange={handleImageChange} />
  {safetyData.image && (
    <Box mt={2}>
      <Typography>Preview:</Typography>
      <img
        src={safetyData.image}
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
          background:
            "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background:
              "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
          },
        }}
      >
        Save Changes
      </Button>

      {/* رسالة النجاح أو الفشل */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Safety;
