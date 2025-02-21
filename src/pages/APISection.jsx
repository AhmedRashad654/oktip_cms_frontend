import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { axiosInstance } from "../axios/axios";
import axios from "axios";

function APISection({ darkMode }) {
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    axiosInstance
      .get("/landing-page/api-section")
      .then((response) => {
        const data = response.data;
        setFormData({
          titleAr: data.title.ar,
          titleEn: data.title.en,
          descriptionAr: data.description.ar,
          descriptionEn: data.description.en,
          image: data.image || "",
        });
        setPreviewImage(data.image || ""); // ✅ تحميل الصورة إن وجدت
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
      });
  }, []);

  // ✅ **تحديث الحقول النصية**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ **رفع الصورة إلى `imgbb` والحصول على رابط مباشر**
  const handleImageChange = async (e) => {
    const file = e.target.files[ 0 ];
    console.log(file)
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        setPreviewImage(reader.result); // ✅ عرض الصورة فورًا قبل الرفع
      };
  
      reader.readAsDataURL(file);
  
      // ✅ رفع الصورة إلى API بعد اختيارها
      const formDataImage = new FormData();
      formDataImage.append("image", file);
  
      try {
        const uploadResponse = await axios.post(
          "https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", // 🔹 استخدم مفتاح API الصحيح
          formDataImage,
            {
  }
        );
  
        const imageUrl = uploadResponse.data.data.url;
        console.log('imageUrl',imageUrl)
        setFormData((prev) => ({ ...prev, image: imageUrl })); // ✅ تحديث الحالة
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  

 
  const handleSave = () => {
    const updatedData = {
      title: { ar: formData.titleAr, en: formData.titleEn },
      description: { ar: formData.descriptionAr, en: formData.descriptionEn },
      image: formData.image, 
    };
    axiosInstance
      .patch("/landing-page/api-section", updatedData, {
        headers: { "Content-Type": "application/json" }, // 🔹 تأكد من إرسال JSON
      })
      .then(() => {
        alert("✅ تم حفظ البيانات بنجاح!");
      })
      .catch(() => {
        alert("❌ حدث خطأ أثناء حفظ البيانات.");
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
          Landing Page / API Section
        </Typography>
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
          placeholder="اكتب هنا"
          multiline
          rows={3}
          name="titleAr"
          value={formData.titleAr}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
        />
        <TextField
          label="Title (English)"
          placeholder="Write here"
          multiline
          rows={3}
          name="titleEn"
          value={formData.titleEn}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
        />
        <TextField
          label="Description (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={5}
          name="descriptionAr"
          value={formData.descriptionAr}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
        />
        <TextField
          label="Description (English)"
          placeholder="Write here"
          multiline
          rows={5}
          name="descriptionEn"
          value={formData.descriptionEn}
          onChange={handleChange}
          InputProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
          InputLabelProps={{ style: { color: darkMode ? "#fff" : "#000" } }}
        />
      </Box>

      {/* حقل رفع الصورة */}
      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
    borderRadius: "12px",
    padding: "10px 15px",
    border: `1px solid ${darkMode ? "#4B6A9B" : "#ccc"}`,
    width: "50%", // ✅ عرض الحقل نصف الشاشة
    cursor: "pointer", // ✅ جعل المربع قابلاً للنقر
    "&:hover": { borderColor: "#FF2A66" },
    mb: 3,
  }}
  onClick={() => document.getElementById("imageUpload").click()} // ✅ عند الضغط على الحقل، يفتح اختيار الصورة
>
  {/* النص داخل الحقل */}
  <Typography
    sx={{
      flex: 1,
      color: darkMode ? "#fff" : "#000",
      fontSize: "16px",
    }}
  >
    Img
  </Typography>

  {/* الأيقونة في الجهة اليمنى */}
  <Box>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
    >
      <g clipPath="url(#clip0_4740_5203)">
        <path
          d="M4.34591 8.24929C2.70732 8.63893 1.48853 10.1123 1.48853 11.87C1.48853 13.9253 3.15465 15.5915 5.21004 15.5915C5.56247 15.5915 5.90373 15.5423 6.22713 15.4508M13.4178 8.24929C15.0564 8.63893 16.2749 10.1123 16.2749 11.87C16.2749 13.9253 14.6087 15.5915 12.5533 15.5915C12.2009 15.5915 11.8596 15.5423 11.5366 15.4508M13.3974 8.14844C13.3974 5.68219 11.3978 3.68262 8.93156 3.68262C6.46531 3.68262 4.46574 5.68219 4.46574 8.14844M6.35069 11.0814L8.93156 8.49231L11.5857 11.1257M8.93156 14.8472V9.80898"
          stroke="#FF2A66"
          strokeWidth="1.48861"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4740_5203">
          <rect
            width="17.8633"
            height="17.8633"
            fill="white"
            transform="translate(0 0.705078)"
          />
        </clipPath>
      </defs>
    </svg>
  </Box>

  {/* إدخال مخفي لاختيار الصورة */}
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageChange} // ✅ نفس الدالة المستخدمة في تحميل الصورة
  />
</Box>

{/* ✅ عرض الصورة التي تم اختيارها */}
{previewImage && (
  <Box sx={{ textAlign: "center", mb: 3 }}>
    <Typography sx={{ color: darkMode ? "#fff" : "#000" }}>Preview:</Typography>
    <img
      src={previewImage}
      alt="Preview"
      onError={(e) => (e.target.style.display = "none")} // ✅ إخفاء الصورة إذا كان الرابط غير صالح
      style={{ width: "200px", borderRadius: "8px", border: "1px solid #ccc" }}
    />
  </Box>
)}



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
          "&:hover": {
            background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
          },
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default APISection;
