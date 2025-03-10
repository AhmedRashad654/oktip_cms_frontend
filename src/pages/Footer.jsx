import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import Whatsappicon from "./icons/Whatsappicon";
import { Link as LinkReact } from "react-router-dom";
import Telegram from "./icons/Telegram";
import Twitter from "./icons/Twitter";
import Facebook from "./icons/Facebook";
import { FaApple } from "react-icons/fa";
import Appstore from "./icons/Appstore";
import ControlPanelModal from "./ControlPanelModal";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axios";
import { useNavigate } from "react-router-dom";
const Footer = ({ language, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleOpenModal = () => {
    if (!localStorage.getItem("tokenOktpn")) {
      setIsModalOpen(true);
    } else {
      navigate("/dashboard");
    }
  };
  const handleCloseModal = () => setIsModalOpen(false);
  function getSocialMedia() {
    return axiosInstance.get(`/social-media`);
  }

  const { data } = useQuery({
    queryKey: ["getSocialMedia", language],
    queryFn: getSocialMedia,
  });
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "40px 40px",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* العمود الأول (حمل تطبيق OKpin) */}
        <Grid
          item
          xs={6}
          md={3}
          sx={{
            order: { xs: 3, md: 1 },
            textAlign: { xs: "right", md: "center" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontWeight: 700,
              direction: "rtl",
              fontFamily: "Tajawal",
              fontSize: { xs: "14px", md: "16px" },
              textAlign: language === "en" ? "left" : "right",
            }}
          >
            {language === "en" ? "Download App Okpin" : "حمل تطبيق OKpin"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              gap: "8px", // مسافة صغيرة بين الزرين
              justifyContent: "center", // محاذاة الزرين في الوسط
              marginTop: "8px",
            }}
          >
            {/* الزر الأول (Google Play) */}
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#F5F5F5",
                color: theme.palette.text.primary,
                width: "120px", // حجم أصغر
                height: "50px", // تقليل الارتفاع
                textTransform: "none",
                padding: "6px",
                "&:hover": { backgroundColor: "#333333" },
                display: "flex",
                flexDirection: "column", // ترتيب النصوص بشكل عمودي
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: "8px", // تصغير كلمة "Download on"
                  fontWeight: "bold",
                  marginBottom: "2px",
                  alignSelf: "flex-end", // النص العلوي على اليمين
                }}
              >
                Download on
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // توزيع الأيقونة والنص
                  width: "100%", // يغطي عرض الزر بالكامل
                  gap: "4px",
                }}
              >
                <Appstore /> {/* الأيقونة على اليسار */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Google Play
                </Typography>
              </Box>
            </Button>

            {/* الزر الثاني (App Store) */}
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#F5F5F5",
                color: theme.palette.text.primary,
                width: "120px", // حجم أصغر
                height: "50px", // تقليل الارتفاع
                textTransform: "none",
                padding: "6px",
                "&:hover": { backgroundColor: "#333333" },
                display: "flex",
                flexDirection: "column", // ترتيب النصوص بشكل عمودي
                borderRadius: "5px",
              }}
              href="#"
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: "8px", // تصغير كلمة "Download on"
                  fontWeight: "bold",
                  marginBottom: "2px",
                  alignSelf: "flex-end", // النص العلوي على اليمين
                }}
              >
                Download on
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // توزيع الأيقونة والنص
                  width: "100%", // يغطي عرض الزر بالكامل
                  gap: "4px",
                }}
              >
                <FaApple
                  color={darkMode ? "white" : "black"}
                  fontSize={"20px"}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  App Store
                </Typography>
              </Box>
            </Button>
          </Box>
        </Grid>

        {/* العمود الثاني (تواصل معنا) */}
        <Grid
          item
          xs={6}
          md={3}
          sx={{
            order: { xs: 4, md: 2 },
            textAlign: language === "en" ? "left" : "right",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontWeight: "700",
              fontSize: { xs: "14px", md: "16px" },
              fontFamily: "Tajawal",
            }}
          >
            {language === "en" ? "contact us" : "تواصل معنا"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "end",
            }}
          >
            <IconButton
              href={data?.data?.xWebsite}
              sx={{
                color: "black",
                backgroundColor: "black",
                borderRadius: "50%",
                padding: "15px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href={data?.data?.WhatsApp}
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",

                backgroundColor:
                  theme.palette.mode === "dark" ? "#090F21" : "#DFE3E7",
                borderRadius: "50%",
                padding: "13px",
              }}
            >
              <Whatsappicon />
            </IconButton>
            <IconButton
              href={data?.data?.Telegram}
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#090F21" : "#DFE3E7",
                borderRadius: "50%",
                padding: "13px",
              }}
            >
              <Telegram />
            </IconButton>
            <IconButton
              href={data?.data?.Facebook}
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#090F21" : "#0059FF",
                borderRadius: "50%",
                padding: "12px",
                height: "46px",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#090F21" : "#0059FF",
                },
              }}
            >
              <Facebook />
            </IconButton>
          </Box>
        </Grid>

        {/* العمود الرابع (سياسات المنصة) */}
        <Grid
          item
          xs={6}
          md={3}
          sx={{
            order: { xs: 1, md: 3 },
            textAlign: language === "en" ? "left" : "right",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontWeight: "700",
              fontSize: { xs: "14px", md: "16px" },
              fontFamily: "Tajawal",
            }}
          >
            {language === "en" ? "Platform policies" : "سياسات المنصة"}
          </Typography>
          <Box>
            <Link
              onClick={() => {
                navigate("/privacy-policy");
                window.scrollTo(0, 0);
              }}
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "12px", md: "16px" },
                fontFamily: "Tajawal",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "privacy policy" : "سياسة الخصوصية"}
            </Link>

            <Link
              onClick={() => {
                navigate("/terms-ofuse");
                window.scrollTo(0, 0);
              }}
              color="inherit"
              underline="none"
              display="block"
              sx={{ marginBottom: "8px", cursor: "pointer" }}
            >
              {language === "en" ? "terms of use" : "شروط الاستخدام"}
            </Link>

            <Link
              onClick={() => {
                navigate("/APiPage");
                window.scrollTo(0, 0);
              }}
              color="inherit"
              underline="none"
              display="block"
              sx={{ marginBottom: "8px", cursor: "pointer" }}
            >
              {language === "en" ? "service API" : "خدمة API"}
            </Link>

            <Link
              onClick={() => {
                navigate("/about-us");
                window.scrollTo(0, 0);
              }}
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Tajawal",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "about OKpin" : " عن OKpin"}
            </Link>
          </Box>
        </Grid>
        {/* العمود الثالث (روابط الوصول السريع) */}
        <Grid
          item
          xs={6}
          md={3}
          sx={{
            order: { xs: 2, md: 4 },
            textAlign: language === "en" ? "left" : "right",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              fontWeight: "700",
              fontSize: { xs: "12px", md: "16px" },
              fontFamily: "Tajawal",
            }}
          >
            {language === "en" ? "Quick access links" : "روابط الوصول السريع"}
          </Typography>
          <Box>
            <Link
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Tajawal",
                cursor: "pointer",
              }}
            >
              {language === "en" ? "Home" : "الرئيسية"}
            </Link>
            <Link
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Tajawal",
              }}
            >
              {language === "en" ? "Why Us" : "لماذا نحن"}
            </Link>
            <Link
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Tajawal",
              }}
            >
              {language === "en"
                ? "Frequently Asked Questions FAQ"
                : "الأسئلة الشائعة FAQ"}
            </Link>
            <Link
              color="inherit"
              underline="none"
              display="block"
              sx={{
                marginBottom: "8px",
                fontWeight: "400",
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Tajawal",
              }}
              onClick={handleOpenModal}
            >
              {language === "en" ? "Dashboard" : "لوحة التحكم"}
            </Link>
            <ControlPanelModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              theme="dark" // استخدم "dark" أو "light"
            />
          </Box>
        </Grid>
      </Grid>

      {/* حقوق النشر */}
      <Typography
        variant="body2"
        sx={{
          marginTop: "40px",
          textAlign: language === "en" ? "left" : "right",
          fontSize: "14px",
        }}
      >
        {language === "en"
          ? "All rights reserved © 2025 OKpin"
          : "جميع الحقوق محفوظة © 2025 OKpin"}
      </Typography>
    </Box>
  );
};

export default Footer;
