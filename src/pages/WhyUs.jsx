import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { axiosInstance } from "../axios/axios";

const WhyUs = ({ darkMode }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [whyUsData, setWhyUsData] = useState({
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

  const whyUsEndpoints = [
    "why-us/1",
    "why-us/2",
    "why-us/3",
    "why-us/4",
  ];

  // جلب البيانات عند تحميل الصفحة أو عند تغيير التبويبة
  useEffect(() => {
    axiosInstance
      .get(`/landing-page/${whyUsEndpoints[activeCard]}`)
      .then((response) => {
        const { title, description, image } = response.data;
        setWhyUsData({
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
  }, [activeCard]);

  // تحديث القيم عند التغيير في الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWhyUsData({ ...whyUsData, [name]: value });
  };

  // تحويل الصورة إلى Base64 عند اختيارها
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setWhyUsData({ ...whyUsData, image: reader.result }); // حفظ الصورة كـ Base64
    };
  };

  // إرسال البيانات إلى API
  const handleSave = () => {
    axiosInstance
      .patch( `/landing-page/${ whyUsEndpoints[ activeCard ]}`, {
        title: { ar: whyUsData.titleAr, en: whyUsData.titleEn },
        description: { ar: whyUsData.descriptionAr, en: whyUsData.descriptionEn },
        image: whyUsData.image, // إرسال الصورة كـ Base64
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
      {/* العنوان */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <HomeIcon sx={{ color: "#FF2A66", fontSize: "24px", mr: 1 }} />
        <Typography variant="h6" component="h1">
          Landing Page / Why Us
        </Typography>
      </Box>

      {/* الأزرار */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {["First Card", "Second Card", "Third Card", "Fourth Card"].map((card, index) => (
          <Button
            key={card}
            onClick={() => setActiveCard(index)}
            sx={{
              borderRadius: "8px",
              background: activeCard === index ? "#9022FF" : darkMode ? "#131D32" : "#f5f5f5",
              color: activeCard === index ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background: activeCard === index ? "#9022FF" : darkMode ? "#1E2A40" : "#e0e0e0",
              },
            }}
          >
            {card}
          </Button>
        ))}
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
            value={whyUsData[field]}
            onChange={handleChange}
            multiline
            rows={field.includes("title") ? 3 : 5}
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

      {/* رفع الصورة وعرضها */}
      <Box sx={{ mb: 3 }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {whyUsData.image && (
          <Box mt={2}>
            <Typography>Preview:</Typography>
            <img
              src={whyUsData.image}
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

export default WhyUs;
