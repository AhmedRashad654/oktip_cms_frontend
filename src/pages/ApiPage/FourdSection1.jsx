import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function FourdSection1({data,language}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        width: "100%",
        height: "350px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: "80px 0",
        backgroundImage: `
          url('/Rectangle.png'),
          url('/Rectangle2.png'),
          url('/Rectangle3.png')`,
        backgroundPosition: "left center, center center, right center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundSize: "calc(100% / 3) 100%",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isDarkMode
            ? "linear-gradient(270deg, #050A17 0%, rgba(5, 10, 23, 0.90) 52.53%, rgba(5, 10, 23, 0.60) 97.53%)"
            : "linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0.90) 52.53%, rgba(255, 255, 255, 0.60) 97.53%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: { xs: "0 20px", md: "0 60px" },
          zIndex: 2,
        }}
      >
        {/* النصوص */}
        <Box sx={{ textAlign: language === "en"?"left":"right", maxWidth: "500px" }}>
          {/* ✅ العنوان */}
          <Typography
            variant="h4"
            sx={{
              color: isDarkMode ? "#FFF" : "#000",
              fontWeight: "700",
              lineHeight: "180%",
              letterSpacing: "-0.154px",
              marginBottom: "20px",
            }}
          >
            {data?.title[language]} 
          </Typography>

          {/* ✅ الوصف */}
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? "#FFF" : "#333",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "180%",
              letterSpacing: "-0.154px",
              marginBottom: "30px",
            }}
          >
            {data?.description[language]}
          </Typography>

          {/* ✅ زر البدء (يمكنك تفعيله عند الحاجة) */}
          {/* <Button
            variant="contained"
            sx={{
              borderRadius: "30px",
              background: "#FF2A66",
              width: "135px",
              height: "48px",
              fontWeight: "700",
              fontSize: "16px",
              textTransform: "none",
              marginLeft: "auto",
              "&:hover": {
                background: "#e60050",
              },
            }}
          >
            ابدأ معنا
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default FourdSection1;
