import { Box, Typography, IconButton } from "@mui/material";
import parse from "html-react-parser";
import Facebook from "../../pages/icons/Facebook";
import Twitter from "../../pages/icons/Twitter";
import Whatsappicon from "../../pages/icons/Whatsappicon";
import Telegram from "../../pages/icons/Telegram";
import Logo from "../../pages/icons/Logo";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import background from "../../../public/background.jpeg";
import LinksSocialMedia from "../LinksSocialMedia";
const AboutUs = ({ theme, language }) => {
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
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: { md: "20px", xs: "10px" },
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          width: { xs: "99%", md: "90%" },
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
          <Logo style={{ width: "120px", height: "120px" }} theme={theme} />
        </Box>

        {/* ✅ العنوان */}
        <Typography
          variant="h4"
          sx={{
            color: "#FF2A66",
            fontWeight: "bold",
            textAlign: language === "en" ? "left" : "right",
            // mb: 3,
          }}
        >
          {data ? data?.data?.about[0]?.title[language] : "جارٍ التحميل..."}
        </Typography>

        <Box
          sx={{
            overflowY: "auto",
            padding: "10px",
            color: textColor,

            lineHeight: "1.8",
            textAlign: language === "en" ? "left" : "right",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            // fontWight:500,
          }}
        >
          <Typography sx={{ fontSize: language === "en" ? "20px" : "12px" }}>
            {data && parse(data?.data?.about[0]?.description[language])}
          </Typography>

          <LinksSocialMedia language={language} theme={theme} />
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;
