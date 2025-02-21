import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

const StepsPageMobile = ({ darkMode, step, language }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: darkMode
          ? "#050A17"
          : theme.palette.background.default, 
        color: theme.palette.text.primary,
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        width: "100%",
        display: { xs: "flex", lg: "none" },
      }}
    >
      {/* العنوان */}
      <Typography
        variant="h4"
        sx={{
          color: "#FF2A66",
          fontWeight: "bold",
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        ابدأ مع Okpin في 4 خطوات سهلة
      </Typography>
      {/* العنوان الرئيسي */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent:"center",
          gap: "30px",
          width: "100%",
          padding:"10px"
        }}
      >
        {step && step?.map( ( step, index ) => (
           <StepCircle
          step={step}
          position={index %2 === 0?"left":"right"} 
          darkMode={darkMode}
          number={index}
          language={language}
        />
        ))}
      </Box>
    </Box>
  );
};

const StepCircle = ({ step, position, number, darkMode, language }) => {
  const colors = {
    1: "#9022FF",
    2: "#00BF16",
    3: "#9022FF",
    4: "#0059FF",
  };

  const borderColor = colors[number] || "var(--primary-yellow, #E9BA00)";
  const circleColor = colors[number] || "#E9BA00";

 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
        position: "relative",
        
      }}
    >
      {/* الخلفية الخاصة بالأرقام (دائرة كبيرة) */}
      <Box
        sx={{
          position: "absolute",
          width: "70px",
          left: number % 2 === 0 ? "-20px" : "",
          right:number %2 !==0 ?"-20px":"",
          
          top:"-20px" ,
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
         
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
        >
          <circle cx="52.4717" cy="52.4717" r="51.5283" fill={circleColor} />
        </svg>

     
        <Box
          sx={{
            position: "absolute",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "24px",
            zIndex: 2,
          }}
        >
          {number + 1}
        </Box>
      </Box>
      {/* الكارد */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // ✅ السماح بتقسيم الكروت إلى سطرين في الشاشات الصغيرة
          justifyContent: "center", // ✅ توزيع الكروت بشكل متساوٍ
             width: "100%",
            height: "300px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            background: darkMode ? "#050A17" : "#FFF",
            color: darkMode ? "#FFF" : "#000",
            borderRadius: "24px",
            border: `0.5px solid ${borderColor}`,
            opacity: 0.7,
            backdropFilter: "blur(40px)",
            textAlign: "center",
            lineHeight: "1.5",
               width: "100%",
            height: "300px",
      
            top: "65px",
            left: position === "left" ? "-140px" : "40px",
            
            zIndex: 3,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "pre-wrap",

       
          }}
        >
          <Typography variant="h6">{step?.title[language]}</Typography>
          <Typography variant="body1" fonrSize="10px">
            {step?.description[language]}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StepsPageMobile;
