import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

const StepsPage = ({ darkMode, step, language }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: darkMode
          ? "#050A17"
          : theme.palette.background.default, // ✅ دعم الوضع المظلم

        color: theme.palette.text.primary,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "100px",
        width: "100%",
        display: { xs: "none", lg: "flex" },
      }}
    >
      {/* العنوان الرئيسي */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "65%",
        }}
      >
        {/* الرقم 1 */ }
        { step && step[ 0 ] &&
          <StepCircle
            step={ step && step[ 0 ] }
            position="left"
            darkMode={ darkMode }
            number={ 1 }
            language={ language }
          />
        }
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
          {language === "en"?"start in 4 simple steps with OKpin":"ابدأ مع Okpin في 4 خطوات سهلة"}
          
        </Typography>

        {/* الرقم 4 */ }
        { step && step[ 3 ] &&
          <StepCircle
            step={ step && step[ 3 ] }
            position="right"
            darkMode={ darkMode }
            number={ 4 }
            language={ language }
          />
        }
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "30%",
          width: "100%",
        }}
      >
        {/* الرقم 2 */ }
        { step && step[ 1 ] &&
          <StepCircle
            step={ step && step[ 1 ] }
            position="right"
            darkMode={ darkMode }
            number={ 2 }
            language={ language }
          />
        }
        {/* الرقم 3 */ }
        { step && step[ 2 ] &&
          <StepCircle
            step={ step && step[ 2 ] }
            position="left"
            darkMode={ darkMode }
            number={ 3 }
            language={ language }
          />
        }
      </Box>
    </Box>
  );
};

const StepCircle = ({ step, position, number, darkMode, language }) => {
  const colors = {
    2: "#00BF16",
    3: "#9022FF",
    4: "#0059FF",
  };

  const borderColor = colors[number] || "var(--primary-yellow, #E9BA00)";
  const circleColor = colors[number] || "#E9BA00";

  const smallCirclePosition =
    number === 1 || number === 4
      ? { top: "10px", left: position === "left" ? "140px" : "-40px" }
      : { top: "10px", left: position === "left" ? "-40px" : "140px" };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* الخلفية الخاصة بالأرقام (دائرة كبيرة) */}
      <Box
        sx={{
          position: "relative",
          width: "104px",
          height: "104px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          zIndex: 1,

          "@media (max-width: 968px)": {
            position: "relative",
            marginTop: "120px", // ✅ تحريك كل الدوائر للأسفل بالتساوي
            display: "flex",
            flexDirection: "column", // ✅ لمنع تحريك الكروت عند تحريك الدوائر
            alignItems: "center",
          },
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

        {/* الرقم داخل الدائرة الكبيرة */}
        <Box
          sx={{
            position: "absolute",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "24px",
            zIndex: 2,

            "@media (max-width: 968px)": {
              marginTop: "20px", // ✅ التأكد من أن الرقم يتحرك مع الدائرة
            },
          }}
        >
          {number}
        </Box>
      </Box>

      {/* الدائرة الصغيرة بجانب الدائرة الكبيرة */}
      <Box
        sx={{
          position: "absolute",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: circleColor,
          ...smallCirclePosition,
        }}
      />

      {/* الكارد */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // ✅ السماح بتقسيم الكروت إلى سطرين في الشاشات الصغيرة
          justifyContent: "center", // ✅ توزيع الكروت بشكل متساوٍ
          "@media (max-width: 968px)": {
            marginTop: "420px", // ✅ جعل كل الكروت تنزل للأسفل وليس فقط أول كاردين!
          },
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
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "65px",
            // left: position === "left" ? "-140px" : "40px",
            left: position === "left" 
  ? language === "ar" ? "-140px" : "40px" 
  : language === "ar" ? "40px" : "-140px",

            transform: position === "left" 
  ? language === "ar" ? "rotate(-5deg)" : "rotate(5deg)"
  : language === "ar" ? "rotate(5deg)" : "rotate(-5deg)",

            zIndex: 3,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "pre-wrap",

            // ✅ **تعديلات خاصة بالشاشات الصغيرة (`sm`) فقط**
            "@media (max-width: 968px)": {
              position: "relative",
              width: "120px",
              height: "120px",

              padding: "5px",
              transform: "none",
              left: "unset",
              top: "unset",
            },
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

export default StepsPage;
