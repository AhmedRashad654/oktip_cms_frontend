import React from "react";
import { Box, Typography, useTheme, Grid } from "@mui/material";


function HowAPIWorks({data,language}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
 
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#00040F" : "#F5F5F5",
        color: isDarkMode ? "#FFFFFF" : "#000000",
        padding: { xs: "40px 20px", md: "80px 60px" },
        textAlign: { xs: "center", md: "right" },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* ✅ الصورة */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box
            component="img"
            src="/Rectangle__1_-removebg-preview.png" // ضع مسار الصورة هنا
            alt="كيف يعمل Okpin API"
            sx={{
              width: { xs: "80%", md: "100%" },
              maxWidth: "500px",
              height: "auto",
            }}
          />
        </Grid>

        {/* ✅ النصوص من API */}
        <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
          {/* ✅ العنوان */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "#FF2A66",
              marginBottom: "16px",
              textAlign: language === "en"?"left":"right",
            }}
          >
            {data &&  data?.title[language]}
          </Typography>

          {/* ✅ الوصف */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              lineHeight: "2",
              maxWidth: "600px",
              textAlign: language === "en"?"left":"right",
              display: "block",
              width: "100%",
              marginLeft: "auto",
            }}
          >
            {data &&  data?.description[language].split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HowAPIWorks;
