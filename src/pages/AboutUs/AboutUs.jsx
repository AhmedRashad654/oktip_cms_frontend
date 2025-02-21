import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import parse from "html-react-parser";
import Facebook from "../../pages/icons/Facebook";
import Twitter from "../../pages/icons/Twitter";
import Whatsappicon from "../../pages/icons/Whatsappicon";
import Telegram from "../../pages/icons/Telegram";
import Logo from "../../pages/icons/Logo";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";

const AboutUs = ({ theme,language }) => {
  const containerBackgroundColor = theme === "dark" ? "#00040F" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  function getAllDateAboutPage() {
    return axiosInstance.get(`/translate/about?lang=${language}`);
  }
  const { data } = useQuery({
    queryKey: ["getAllDateAboutPage", language],
    queryFn: getAllDateAboutPage,
  });

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: 'url(../../public/background.jpeg)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "20px",
        marginTop:"50px"
      }}
    >
      <Box
        sx={{
          width: "95%",
          backgroundColor: containerBackgroundColor,
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "right", mb: 3 }}>
          <Logo style={{ width: "120px", height: "120px" }} />
        </Box>

        {/* ✅ العنوان */}
        <Typography
          variant="h3"
          sx={{
            color: "#FF2A66",
            fontWeight: "bold",
            textAlign: language ==="en"?"left":"right",
            mb: 3,
          }}
        >
          {data ? data?.data?.about[0]?.title[language] : "جارٍ التحميل..."}
        </Typography>

        <Box
          sx={{
            overflowY: "auto",
            padding: "10px",
            color: textColor,
            fontSize: "16px",
            lineHeight: "1.8",
            textAlign: language ==="en"?"left":"right",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Typography>{data ? parse(data?.data?.about[0]?.description[language]) : "جارٍ التحميل..."}</Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              mt: 3,
            }}
          >
            <IconButton href="#" sx={{ color: "#FF2A66" }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "#FF2A66" }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "#FF2A66" }}>
              <Whatsappicon />
            </IconButton>
            <IconButton href="#" sx={{ color: "#FF2A66" }}>
              <Telegram />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
