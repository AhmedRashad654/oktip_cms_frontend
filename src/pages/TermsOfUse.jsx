import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { RichTextEditor } from "@mantine/rte";
import { axiosInstance } from "../axios/axios";

const TermsOfUse = ({ darkMode }) => {
  const [descriptionArabic, setDescriptionArabic] = useState("");
  const [descriptionEnglish, setDescriptionEnglish] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/terms-of-use")
      .then((response) => {
        console.log("✅ Data fetched:", response.data);
        if (response.data && response.data.description) {
          setDescriptionArabic(response.data.description.ar || "");
          setDescriptionEnglish(response.data.description.en || "");
        }
      })
      .catch((error) => console.error("❌ Error fetching data:", error));
  }, []);

  // ✅ إرسال البيانات عند الضغط على "Save Changes" (PATCH)
  const handleSave = async () => {
    console.log("🔹 handleSave function called!");
    setLoading(true);

    try {
      const response = await axiosInstance.patch("/terms-of-use", {
        title: {
          ar: "البطاقات الرقمية أصبحت أسهل وأوفر",
          en: "Digital Cards Made Easier and More Affordable",
        },
        description: {
          ar: descriptionArabic,
          en: descriptionEnglish,
        },
        image: "your-image-url-here",
      });

      console.log("✅ Success:", response.data);

      if (response.data.modifiedCount > 0) {
        setOpenSnackbar(true);
      } else {
        alert("⚠️ لم يتم تعديل أي بيانات، تأكد من تغيير المحتوى قبل الحفظ.");
      }
    } catch (error) {
      console.error("❌ Error updating terms:", error.response?.data || error);
      alert("❌ فشل التحديث! تحقق من الاتصال بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ إغلاق `Snackbar`
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: "12px",
        backgroundColor: darkMode ? "#050A17" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      {/* ✅ العنوان */}
      <Typography
        variant="h6"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: darkMode ? "#FF2A66" : "#E91E63",
        }}
      >
        Terms Of Use
      </Typography>

      {/* ✅ المحرر الأول (Arabic) */}
      <Typography
        variant="body1"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: darkMode ? "#ccc" : "#555",
        }}
      >
        Description (Arabic)
      </Typography>
      <RichTextEditor
        value={descriptionArabic}
        onChange={setDescriptionArabic}
        sx={{
          borderRadius: "12px",
          backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
          minHeight: "150px",
        }}
        controls={[
          ["bold", "italic", "underline", "strike"],
          ["h1", "h2", "h3"],
          ["unorderedList", "orderedList"],
          ["alignLeft", "alignCenter", "alignRight"],
          ["link"],
        ]}
      />

      {/* ✅ المحرر الثاني (English) */}
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          mb: 1,
          fontWeight: "bold",
          color: darkMode ? "#ccc" : "#555",
        }}
      >
        Description (English)
      </Typography>
      <RichTextEditor
        value={descriptionEnglish}
        onChange={setDescriptionEnglish}
        sx={{
          borderRadius: "12px",
          backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
          minHeight: "150px",
        }}
        controls={[
          ["bold", "italic", "underline", "strike"],
          ["h1", "h2", "h3"],
          ["unorderedList", "orderedList"],
          ["alignLeft", "alignCenter", "alignRight"],
          ["link"],
        ]}
      />

      {/* ✅ زر الحفظ */}
      <Button
        variant="contained"
        sx={{
          mt: 4,
          borderRadius: "12px",
          padding: "10px 20px",
          background: "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
          },
        }}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>

      {/* ✅ Snackbar لإظهار نجاح العملية */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          ✅ تم حفظ التغييرات بنجاح!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TermsOfUse;
