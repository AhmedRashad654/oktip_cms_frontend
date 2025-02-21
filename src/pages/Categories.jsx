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

const Categories = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("One");
  const [categoryData, setCategoryData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    axiosInstance
      .get("/landing-page/categories/6")
      .then((response) => {
        const { title, description } = response.data;
        setCategoryData({
          titleAr: title.ar || "",
          titleEn: title.en || "",
          descriptionAr: description.ar || "",
          descriptionEn: description.en || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setSnackbar({
          open: true,
          message: "Failed to load category data",
          severity: "error",
        });
      });
  }, []);

  // تحديث القيم عند التغيير في الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  // إرسال البيانات إلى API
  const handleSave = () => {
    axiosInstance
      .patch("/landing-page/categories/6", {
        title: { ar: categoryData.titleAr, en: categoryData.titleEn },
        description: {
          ar: categoryData.descriptionAr,
          en: categoryData.descriptionEn,
        },
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Category updated successfully!",
          severity: "success",
        });
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        setSnackbar({
          open: true,
          message: "Failed to update category",
          severity: "error",
        });
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
        <Typography variant="h6" component="h1">
          Landing Page / Categories
        </Typography>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        {["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              borderRadius: "8px",
              background:
                activeTab === tab
                  ? "#9022FF"
                  : darkMode
                  ? "#131D32"
                  : "#f5f5f5",
              color: activeTab === tab ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: { xs: "8px 16px", sm: "10px 20px" },
              textTransform: "none",
              "&:hover": {
                background: activeTab === tab ? "#9022FF" : darkMode ? "#1E2A40" : "#e0e0e0",
              },
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* حقول الإدخال */}
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
          value={categoryData.titleAr}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
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
          value={categoryData.titleEn}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
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

      {/* زر الحفظ */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          borderRadius: "12px",
          padding: { xs: "8px 16px", sm: "10px 20px" },
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

export default Categories;
