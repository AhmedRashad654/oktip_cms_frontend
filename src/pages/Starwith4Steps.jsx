import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { axiosInstance } from "../axios/axios";


function Starwith4Steps({ darkMode }) {
  const [activeCard, setActiveCard] = useState("First Card");
  const [formData, setFormData] = useState({
    "First Card": { titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "" },
    "Second Card": { titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "" },
    "Third Card": { titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "" },
    "Fourth Card": { titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "" },
  });

  const cardOrderMapping = {
    "First Card": 1,
    "Second Card": 2,
    "Third Card": 3,
    "Fourth Card": 4,
  };

  // ✅ **جلب البيانات عند تحميل الصفحة**
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          Object.values(cardOrderMapping).map((order) =>
            axiosInstance.get(`/landing-page/steps/${order}`)
          )
        );

        const newFormData = {};
        responses.forEach((response, index) => {
          const order = Object.keys(cardOrderMapping)[index];
          newFormData[order] = {
            titleAr: response.data.title.ar,
            titleEn: response.data.title.en,
            descriptionAr: response.data.description.ar,
            descriptionEn: response.data.description.en,
          };
        });

        setFormData(newFormData);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ **تحديث البيانات عند التعديل**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [activeCard]: { ...formData[activeCard], [name]: value },
    });
  };

  // ✅ **حفظ البيانات عبر `PATCH`**
  const handleSave = async () => {
    try {
      const order = cardOrderMapping[activeCard];

      await axiosInstance.patch(`/landing-page/steps/${order}`, {
        title: {
          ar: formData[activeCard].titleAr,
          en: formData[activeCard].titleEn,
        },
        description: {
          ar: formData[activeCard].descriptionAr,
          en: formData[activeCard].descriptionEn,
        },
      });

      alert("تم حفظ البيانات بنجاح ✅");
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);
      alert("حدث خطأ أثناء الحفظ ❌");
    }
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
          Landing Page / Start with 4 Steps
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
        {["First Card", "Second Card", "Third Card", "Fourth Card"].map((card) => (
          <Button
            key={card}
            onClick={() => setActiveCard(card)}
            sx={{
              borderRadius: "8px",
              background:
                activeCard === card
                  ? "var(--primary-purple, #9022FF)"
                  : darkMode
                  ? "#131D32"
                  : "#f5f5f5",
              color: activeCard === card ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              padding: "10px 20px",
              textTransform: "none",
              "&:hover": {
                background:
                  activeCard === card
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

      {/* الحقول الخاصة بالزر النشط فقط */}
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
          value={formData[activeCard]?.titleAr || ""}
          onChange={handleChange}
          sx={ { backgroundColor: darkMode ? "#131D32" : "#f5f5f5", borderRadius: "12px" } }
                      InputProps={{
    style: { color: darkMode?"white":"black" }
  }}
        />
        <TextField
          label="Title (English)"
          placeholder="Write here"
          multiline
          rows={3}
          name="titleEn"
          value={formData[activeCard]?.titleEn || ""}
          onChange={handleChange}
          sx={ { backgroundColor: darkMode ? "#131D32" : "#f5f5f5", borderRadius: "12px" } }
                      InputProps={{
    style: { color: darkMode?"white":"black" }
  }}
        />
        <TextField
          label="Description (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={5}
          name="descriptionAr"
          value={formData[activeCard]?.descriptionAr || ""}
          onChange={handleChange}
          sx={ { backgroundColor: darkMode ? "#131D32" : "#f5f5f5", borderRadius: "12px" } }
            InputProps={{
    style: { color: darkMode?"white":"black" }
  }}
        />
        <TextField
          label="Description (English)"
          placeholder="Write here"
          multiline
          rows={5}
          name="descriptionEn"
          value={formData[activeCard]?.descriptionEn || ""}
          onChange={handleChange}
          sx={ { backgroundColor: darkMode ? "#131D32" : "#f5f5f5", borderRadius: "12px" } }
                      InputProps={{
    style: { color: darkMode?"white":"black" }
  }}
        />
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

export default Starwith4Steps;
