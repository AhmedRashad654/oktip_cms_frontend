import React from "react";
import { Box, Typography, Button, useTheme, styled } from "@mui/material";

const SectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 350,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  margin: "80px 0",
  background: `
    url('/reg1Light.png') 0% center no-repeat,
    url('/reg2Light.png') 33.33% center no-repeat,
    url('/reg3Light.png') 66.66% center no-repeat,
    url('/Rectangle4.png') 100% center no-repeat
  `,
  backgroundSize: "25% 100%",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(270deg, #050A17 0%, rgba(5, 10, 23, 0.90) 52.53%, rgba(5, 10, 23, 0.60) 97.53%)"
        : "linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0.90) 52.53%, rgba(255, 255, 255, 0.30) 97.53%)",
    zIndex: 1,
  },

  [theme.breakpoints.down("md")]: {
    height: 400,
    margin: "40px 0",
  },

  [theme.breakpoints.down("sm")]: {
    height: 450,
    background: `
      url('/reg3Light.png') top right no-repeat,
      url('/Rectangle4.png') top left no-repeat,
      url('/reg1Light.png') bottom left no-repeat,
      url('/reg2Light.png') bottom right no-repeat
    `,
    backgroundSize: "50% 50%",
    "&::before": {
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(360deg, rgba(5, 10, 23, 0.98) 0%, rgba(5, 10, 23, 0.90) 20%, rgba(5, 10, 23, 0.80) 50%)"
          : "linear-gradient(360deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.90) 20%, rgba(255, 255, 255, 0.80) 50%)",
    },
  },
}));

const ContentOverlay = styled(Box)(({ theme,language }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "end",
  textAlign:language === "en"?"left": "right",
  alignItems: "center",
  padding: "0 60px",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    padding: "0 30px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
  },
}));

const ContentContainer = styled(Box)({
  maxWidth: 600,
});

const StartButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  background: "#FF2A66",
  width: "135px",
  height: "48px",
  padding: "10px 24px",
  color: "#FFF",
  fontFamily: "Tajawal",
  fontSize: "14px",
  fontWeight: 700,
  marginLeft: "auto",
  "&:hover": {
    background: "#e60050",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px 20px",
  },
}));

function FourdSection({ offer, language }) {
  const theme = useTheme();
  return (
    <SectionWrapper>
      <ContentOverlay language={language}>
        <ContentContainer>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.mode === "dark" ? "#FFF" : "#050A17",
              fontFamily: "Tajawal",
              fontWeight: 700,
              fontSize: { xs: "20px", md: "32px" },
              marginBottom: 2,
              lineHeight: { xs: "36px", md: "57px" },
              letterSpacing: "-0.154px",
            
            }}
          >
            {offer?.title[language]}
          </Typography>

          <Typography
            sx={{
              color: theme.palette.mode === "dark" ? "#FFF" : "#1A1A1A",
              fontFamily: "Tajawal",
              fontWeight: 500,
              fontSize: { xs: "14px", md: "20px" },
              marginBottom: 3,
              lineHeight: { xs: "25px", md: "36px" },
              letterSpacing: "-0.154px",
            }}
          >
            {offer?.description[language]}
          </Typography>

          <StartButton variant="contained" disableElevation>
            {language === "ar"?"ابدأ الآن معنا":"Start Now "}
           
          </StartButton>
        </ContentContainer>
      </ContentOverlay>
    </SectionWrapper>
  );
}

export default FourdSection;
