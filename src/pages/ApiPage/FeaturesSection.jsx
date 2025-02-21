import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";

function FeaturesSection({data,language}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 5,
        backgroundColor: isDarkMode ? "#00040F" : "#FFFFFF",
        color: isDarkMode ? "#FFFFFF" : "#000000",
      }}
    >
      {/* العنوان */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#FF2A66",
          mb: 3,
        }}
      >
        {language === "en" ?"Api Features OKpin" :"مميزات واجهة Okpin API"}
        
      </Typography>

      {/* ✅ عرض البطاقات بعد تحميل البيانات */}
      <Grid
        container
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px", // ✅ تقليل الفراغ بين الكاردات
        }}
      >
        {data?.map((feature) => (
          <Paper
            key={feature._id}
            elevation={3}
            sx={{
              p: 2,
              width: "200px", // ✅ تصغير عرض الكاردات
              borderRadius: "16px",
              textAlign: "center",
              backgroundColor: isDarkMode ? "#13131A" : "#F8F8F8",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* ✅ صورة الميزة */}
            <Box
              component="img"
              src={feature?.image}
              alt={"api"}
              sx={{ width: "80px", height: "80px", mb: 1 }}
            />

            {/* ✅ العنوان */}
            <Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "600" }}>
              {feature?.title[language]}
            </Typography>
          </Paper>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturesSection;
