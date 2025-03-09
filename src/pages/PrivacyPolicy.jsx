import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Logo from "./icons/Logo";
import { axiosInstance } from "../axios/axios";
import { useQuery } from "@tanstack/react-query";
import background from "../../public/background.jpeg";
import LinksSocialMedia from "./LinksSocialMedia";
const TermsOfUse = ({ theme, language }) => {
  const containerBackgroundColor = theme === "dark" ? "#00040F" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  function getPriviceyUser() {
    return axiosInstance.get(`/translate/privacy?lang=${language}`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["getPriviceyUser", language],
    queryFn: getPriviceyUser,
  });

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1201 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
          padding: "20px",
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
            textAlign: language === "en" ? "left" : "right",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "right", mb: 3 }}>
            <Logo style={{ width: "120px", height: "120px" }} theme={theme} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: "#FF2A66",
              fontWeight: "bold",

              mb: 3,
            }}
          >
            {data && data?.data?.privacy[0].title[language]}
          </Typography>

          <Box
            sx={{
              overflowY: "auto",
              padding: "10px",
              color: textColor,
              fontSize: "16px",
              lineHeight: "1.8",
              textAlign: language === "en" ? "left" : "right",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
            dangerouslySetInnerHTML={{
              __html: data && data?.data?.privacy[0].description[language],
            }} // ✅ عرض HTML بشكل مباشر
          />
          <LinksSocialMedia language={language} theme={theme} />
        </Box>
      </Box>
    </>
  );
};

export default TermsOfUse;
