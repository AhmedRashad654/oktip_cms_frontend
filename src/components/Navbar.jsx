// Navbar.jsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Logo from "../pages/icons/Logo";
import { scroller } from "react-scroll";
function Navbar({ darkMode, setDarkMode, setLanguage, language }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
    document.body.style.direction = language === "ar" ? "rtl" : "ltr";
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  ///////////function handleScrollTo//////////////
  function handleScrollTo(sectionTo) {
    if (location.pathname === "/") {
      scroller.scrollTo(sectionTo);
    } else {
      navigate(`/`);
    }
  }
  const drawerContent = (
    <Box
      sx={{
        padding: "20px",
        color: darkMode ? "#ffffff" : "#000000",
        backgroundColor: darkMode ? "#000516" : "#ffffff",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[
          {
            name: language === "en" ? "Home" : "الرئيسية",
            route: "/",
            id: "/",
          },
          {
            name: language === "en" ? "Abaut Us" : "عنّا",
            route: "/about-us",
          },
          {
            name: language === "en" ? "Why Us" : "لماذا نحن",
            route: "/",
            id: "why us",
          },
          {
            name: language === "en" ? "Rewards system" : "نظام المكافآت",
            route: "/",
            id: "rewards system",
          },
          {
            name: language === "en" ? "Download App" : "تحميل التطبيق",
            route: "/",
            id: "download",
          },
          {
            name: "API",
            route: "/",
            id: "api",
          },
          {
            name: "FAQ",
            route: "/",
            id: "faq",
          },
        ].map((text, i) => (
          <Typography
            key={i}
            component={Link}
            to={text.route}
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => {
              handleScrollTo(text.id);
              handleDrawerToggle();
            }}
          >
            {text.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
  return (
    <AppBar
      sx={{
        background: darkMode ? "#00040F" : "#FFF",
        boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.12)", // الظلال حسب التصميم
        width: "100%",
        margin: "0",
        color: darkMode ? "#ffffff" : "#000000",
        padding: { xs: "0 8px", sm: "0 16px" },
        zIndex: 1300,
        borderRadius: "0",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <div style={{ cursor: "pointer", display: "inline-block" }}>
            <Logo
              style={{ width: "120px", height: "120px" }}
              theme={darkMode ? "dark" : "light"}
            />
          </div>
        </Box>

        {/* الروابط (في المنتصف) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "end",
            gap: { md: "20px", lg: "30px" },
            marginLeft: language === "ar" ? "50px" : "50px",
            marginRight: language === "ar" ? "50px" : "50px",
            flex: 1,
          }}
        >
          {/* الروابط */}
          <Typography
            variant="body1"
            onClick={() => {
              navigate("/about-us");
              window.scrollTo(0, 0);
            }}
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
              cursor: "pointer",
            }}
          >
            {language === "ar" ? "عنّا" : "About Us"}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("why us")}
          >
            {language === "ar" ? "لماذا نحن" : "Why Us"}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("rewards system")}
          >
            {language === "ar" ? "نظام المكافآت" : "Rewards system"}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("download")}
          >
            {language === "ar" ? "تحميل التطبيق" : "Download"}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("api")}
          >
            API
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("faq")}
          >
            {language === "ar" ? "الاسئلة الشائعة" : "FAQ"}
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { md: "14px", lg: "16px" },
              whiteSpace: "nowrap",
              "&:hover": { opacity: 0.8 },
              fontFamily: "Tajawal, sans-serif",
            }}
            onClick={() => handleScrollTo("/")}
          >
            {language === "ar" ? "الرئيسية" : "Home"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: { xs: "10px", md: "25px" },
            marginRight: { xs: "auto", md: "auto" },
            marginLeft: { xs: "10%", md: "auto" },
            order: { xs: 0, md: 2 },
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleLanguage}
            sx={{
              backgroundColor: "#170B23",
              borderRadius: "50%",
              padding: { xs: "8px", md: "10px" },
              minWidth: { xs: "35px", md: "40px" },
              height: { xs: "35px", md: "40px" },
              display: "flex",
              marginX: language === "en" ? "7px" : "",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              {language}
            </Typography>
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{
              backgroundColor: darkMode ? "#722ED1" : "#4B6A9B",
              borderRadius: "50%",
              display: "flex",
              marginX: "5px",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            {darkMode ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="tdesign:mode-dark">
                  <path
                    id="Vector"
                    d="M19.6133 4.66331L17.8997 5.60051L19.6133 6.53771L20.5505 8.25131L21.4877 6.53771L23.2013 5.60051L21.4877 4.66331L20.5505 2.94971L19.6133 4.66331ZM13.0949 5.64011C11.5233 5.959 10.0566 6.66651 8.82871 7.69806C7.60086 8.7296 6.65098 10.0523 6.06581 11.5454C5.48064 13.0385 5.27883 14.6543 5.47879 16.2455C5.67876 17.8366 6.27414 19.3523 7.21057 20.6541C8.14699 21.956 9.39462 23.0025 10.8395 23.6982C12.2845 24.3938 13.8806 24.7164 15.4823 24.6365C17.0839 24.5565 18.6401 24.0767 20.0086 23.2406C21.3771 22.4046 22.5143 21.2391 23.3165 19.8505C20.4667 19.8283 17.7412 18.6807 15.734 16.6577C13.7267 14.6347 12.6004 11.9004 12.6005 9.05051C12.6005 7.87451 12.7577 6.72611 13.0949 5.64011ZM3.00049 15.0505C3.00049 8.42291 8.37289 3.05051 15.0005 3.05051H17.0813L16.0397 4.85051C15.3449 6.05051 15.0005 7.47851 15.0005 9.05051C15.0003 10.2908 15.2748 11.5158 15.8043 12.6375C16.3338 13.7591 17.1051 14.7496 18.0628 15.5378C19.0205 16.3259 20.1409 16.8922 21.3435 17.196C22.546 17.4997 23.801 17.5334 25.0181 17.2945L27.0365 16.9021L26.3849 18.8533C24.7949 23.6149 20.3009 27.0505 15.0005 27.0505C8.37289 27.0505 3.00049 21.6781 3.00049 15.0505ZM25.2005 8.34971L26.2973 10.3537L28.3013 11.4505L26.2973 12.5473L25.2005 14.5513L24.1037 12.5473L22.0997 11.4505L24.1037 10.3537L25.2005 8.34971Z"
                    fill="white"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="material-symbols:light-mode-outline-rounded">
                  <path
                    id="Vector"
                    d="M15.0009 18.7032C16.0295 18.7032 16.9039 18.3432 17.624 17.6231C18.344 16.9031 18.704 16.0287 18.704 15.0001C18.704 13.9714 18.344 13.0971 17.624 12.377C16.9039 11.657 16.0295 11.2969 15.0009 11.2969C13.9722 11.2969 13.0979 11.657 12.3778 12.377C11.6578 13.0971 11.2977 13.9714 11.2977 15.0001C11.2977 16.0287 11.6578 16.9031 12.3778 17.6231C13.0979 18.3432 13.9722 18.7032 15.0009 18.7032ZM15.0009 21.172C13.2933 21.172 11.838 20.57 10.6349 19.3661C9.43178 18.1621 8.82981 16.7068 8.82899 15.0001C8.82816 13.2933 9.43013 11.838 10.6349 10.6341C11.8396 9.43013 13.295 8.82816 15.0009 8.82816C16.7068 8.82816 18.1626 9.43013 19.3681 10.6341C20.5737 11.838 21.1753 13.2933 21.1728 15.0001C21.1703 16.7068 20.5684 18.1626 19.3669 19.3673C18.1654 20.5721 16.7101 21.1736 15.0009 21.172ZM2.65708 16.2344C2.30734 16.2344 2.01438 16.1159 1.7782 15.8789C1.54203 15.6419 1.42353 15.349 1.4227 15.0001C1.42188 14.6511 1.54038 14.3582 1.7782 14.1212C2.01603 13.8842 2.30899 13.7657 2.65708 13.7657H5.12585C5.47559 13.7657 5.76896 13.8842 6.00596 14.1212C6.24296 14.3582 6.36105 14.6511 6.36023 15.0001C6.3594 15.349 6.2409 15.6424 6.00472 15.8802C5.76855 16.118 5.47559 16.2361 5.12585 16.2344H2.65708ZM24.8759 16.2344C24.5262 16.2344 24.2332 16.1159 23.9971 15.8789C23.7609 15.6419 23.6424 15.349 23.6416 15.0001C23.6407 14.6511 23.7592 14.3582 23.9971 14.1212C24.2349 13.8842 24.5278 13.7657 24.8759 13.7657H27.3447C27.6944 13.7657 27.9878 13.8842 28.2248 14.1212C28.4618 14.3582 28.5799 14.6511 28.5791 15.0001C28.5783 15.349 28.4598 15.6424 28.2236 15.8802C27.9874 16.118 27.6944 16.2361 27.3447 16.2344H24.8759ZM15.0009 6.3594C14.6512 6.3594 14.3582 6.2409 14.122 6.0039C13.8858 5.7669 13.7673 5.47394 13.7665 5.12502V2.65626C13.7665 2.30652 13.885 2.01356 14.122 1.77738C14.359 1.5412 14.652 1.4227 15.0009 1.42188C15.3498 1.42106 15.6432 1.53956 15.881 1.77738C16.1188 2.0152 16.2369 2.30816 16.2353 2.65626V5.12502C16.2353 5.47476 16.1168 5.76813 15.8798 6.00513C15.6428 6.24214 15.3498 6.36022 15.0009 6.3594ZM15.0009 28.5783C14.6512 28.5783 14.3582 28.4598 14.122 28.2228C13.8858 27.9858 13.7673 27.6928 13.7665 27.3439V24.8751C13.7665 24.5254 13.885 24.2324 14.122 23.9962C14.359 23.7601 14.652 23.6416 15.0009 23.6407C15.3498 23.6399 15.6432 23.7584 15.881 23.9962C16.1188 24.2341 16.2369 24.527 16.2353 24.8751V27.3439C16.2353 27.6936 16.1168 27.987 15.8798 28.224C15.6428 28.461 15.3498 28.5791 15.0009 28.5783ZM7.16257 8.88988L5.83561 7.59378C5.58874 7.36748 5.47024 7.07946 5.48011 6.72972C5.48999 6.37998 5.60849 6.08167 5.83561 5.83479C6.08249 5.58791 6.3808 5.46448 6.73054 5.46448C7.08028 5.46448 7.3683 5.58791 7.59461 5.83479L8.89071 7.16175C9.11701 7.40863 9.23016 7.69665 9.23016 8.02582C9.23016 8.35498 9.11701 8.64301 8.89071 8.88988C8.6644 9.13676 8.38173 9.25526 8.04269 9.24538C7.70364 9.23551 7.41027 9.11701 7.16257 8.88988ZM22.4072 24.1653L21.1111 22.8384C20.8848 22.5915 20.7716 22.2985 20.7716 21.9595C20.7716 21.6205 20.8848 21.3374 21.1111 21.1103C21.3374 20.8634 21.6205 20.7453 21.9603 20.756C22.3002 20.7667 22.5932 20.8848 22.8392 21.1103L24.1662 22.4064C24.413 22.6327 24.5315 22.9207 24.5217 23.2704C24.5118 23.6202 24.3933 23.9185 24.1662 24.1653C23.9193 24.4122 23.621 24.5357 23.2712 24.5357C22.9215 24.5357 22.6335 24.4122 22.4072 24.1653ZM21.1111 8.88988C20.8642 8.66358 20.7457 8.38091 20.7556 8.04186C20.7654 7.70282 20.884 7.40945 21.1111 7.16175L22.4072 5.83479C22.6335 5.58791 22.9215 5.46941 23.2712 5.47929C23.621 5.48916 23.9193 5.60766 24.1662 5.83479C24.413 6.08167 24.5365 6.37998 24.5365 6.72972C24.5365 7.07946 24.413 7.36748 24.1662 7.59378L22.8392 8.88988C22.5923 9.11619 22.3043 9.22934 21.9751 9.22934C21.646 9.22934 21.358 9.11619 21.1111 8.88988ZM5.83561 24.1653C5.58874 23.9185 5.4653 23.6202 5.4653 23.2704C5.4653 22.9207 5.58874 22.6327 5.83561 22.4064L7.16257 21.1103C7.40945 20.8839 7.70241 20.7708 8.04145 20.7708C8.3805 20.7708 8.66358 20.8839 8.89071 21.1103C9.13758 21.3366 9.25608 21.6196 9.24621 21.9595C9.23633 22.2994 9.11783 22.5923 8.89071 22.8384L7.59461 24.1653C7.3683 24.4122 7.08028 24.5307 6.73054 24.5208C6.3808 24.511 6.08249 24.3925 5.83561 24.1653Z"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            )}
          </IconButton>

          <a
            href="https://Ok-pin.com"
            style={{
              background: "var(--primary-pink, #FF2A66)",
              color: "var(--general-btn-text, #FFF)",
              border: "none",
              padding: isMobile ? "8px 12px" : "15px 20px",
              borderRadius: "30px",
              fontWeight: 500,
              fontFamily: "Tajawal, sans-serif",
              fontSize: isMobile ? "12px" : "16px",
              lineHeight: isMobile ? "18px" : "22px",
              textAlign: "center",
              cursor: "pointer",
              width: isMobile ? "100px" : "135px",
              height: isMobile ? "32px" : "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              order: { xs: 2, md: 0 },
            }}
          >
            {language === "ar" ? "ابدأ الآن معنا!" : "Start Now"}
          </a>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                order: 1,
                marginLeft: "auto",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: isMobile ? "250px" : "320px",
            boxSizing: "border-box",
            bgcolor: darkMode ? "#00040F" : "#FFF",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
