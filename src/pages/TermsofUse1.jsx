import {
  Box,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Facebook from "./icons/Facebook";
import Twitter from "./icons/Twitter";
import Whatsappicon from "./icons/Whatsappicon";
import Telegram from "./icons/Telegram";
import Logo from "./icons/Logo";
import { axiosInstance } from "../axios/axios";
import { useQuery } from "@tanstack/react-query";
import background from "../../public/background.jpeg";
const TermsOfUse1 = ({ theme, language }) => {
  const containerBackgroundColor = theme === "dark" ? "#00040F" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  function getTrumsUserPage() {
    return axiosInstance.get(`/translate/terms?lang=${language}`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["getTrumsUserPage", language],
    queryFn: getTrumsUserPage,
  });
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1201 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
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
            minHeight: "70vh",
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

          <Typography
            variant="h3"
            sx={{
              color: "#FF2A66",
              fontWeight: "bold",
              textAlign: "right",
              mb: 3,
            }}
          >
            {data && data?.data?.terms[0].title[language]}
          </Typography>

          <Box
            sx={{
              overflowY: "auto",
              padding: "10px",
              color: textColor,
              fontSize: "16px",
              lineHeight: "1.8",
              textAlign: "right",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
            dangerouslySetInnerHTML={{
              __html: data && data?.data?.terms[0].description[language],
            }} // ✅ عرض HTML بشكل مباشر
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              mt: 3,
            }}
          >
            <IconButton
              href="#"
              sx={{
                backgroundColor: theme === "dark" ? "#090F21" : "#0059FF",
                padding: "9px",
                height: "40px",
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: "#FF2A66",
                backgroundColor: "black",
                padding: "11px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: "#FF2A66",
                backgroundColor: theme === "dark" ? "#090F21" : "#DFE3E7",
                padding: "11px",
                height: "40px",
              }}
            >
              <Whatsappicon />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: "#FF2A66",
                backgroundColor: theme === "dark" ? "#090F21" : "#DFE3E7",
                padding: "11px",
                height: "40px",
              }}
            >
              <Telegram />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TermsOfUse1;
