import React from "react";
import { Button, Typography, Box, useTheme } from "@mui/material";

function NewPage({download,language}) {
    const theme = useTheme();

  return (
    <Box
    className="new-page-container"
    sx={{
      backgroundColor: theme.palette.mode === 'dark' ? '#050A17' : '#FFFFFF',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: { xs: "100vh", md: "40vh" },
      marginBottom: { xs: "50px", md: "100px" },
      padding: { xs: "16px", sm: "24px", md: "40px" },
      position: "relative",
    }}
  >
    <Box
      className="content-container"
      sx={{
        backgroundColor: "#a7163f",
        borderRadius: { xs: "12px", md: "16px" },
        width: "100%",
        maxWidth: { xs: "95%", sm: "90%", md: "1200px" },
        height: { xs: "488px", md: "388px" },
        margin: "0 auto",
        padding: { xs: "24px", sm: "32px", md: "40px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "24px", md: "40px" },
        alignItems: "center",
        position: "relative",
        overflow: {xs: "hidden", md: "visible"},
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
      }}
    >
      <Box
        sx={{
          flex: { xs: "none", md: 1 },
          order: { xs: 2, md: 1 },
          width: { xs: "100%", sm: "80%", md: "50%" },
          maxWidth: { xs: "280px", sm: "320px", md: "none" },
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: 2, md: 0 },
          position: { md: "absolute" },
          top: { md: "-80px" },
          bottom: { md: "-80px" },
            left: { md: "40px" },
            
        }}
      >
        <Box
          component="img"
          src="/iMockup - Google Pixel 8 Pro.png"
          alt="App Preview"
          sx={{
           width:{  xs: "170%", md: "200%" },
            height: "auto",
            objectFit: "contain"
          }}
        />
      </Box>

      <Box
        sx={{
          flex: { xs: "1", md: "0 0 50%" },
          order: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
          width: "100%",
          ml: { md: "auto" },
            mr: { md: "0" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#FFF",
            fontFamily: "Tajawal, sans-serif",
            fontSize: { xs: "24px", sm: "32px", md: "40px" },
            fontWeight: 700,
            lineHeight: { xs: "1.2", md: "1.4" },
            letterSpacing: "-0.154px",
            marginBottom: { xs: "8px", md: "16px" },
            textAlign: "right",
          }}
        >
          {download?.title[language]}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#FFF",
            textAlign: "right",
            fontFamily: "Tajawal, sans-serif",
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            lineHeight: { xs: "1.5", md: "1.8" },
            fontWeight: 500,
            letterSpacing: "-0.154px",
            marginBottom: { xs: "4px", md: "8px" },
            maxWidth: { xs: "100%", md: "90%" }
          }}
        >
          {download?.description[language]}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row" ,
            gap: { xs: "12px", sm: "16px" },
            marginTop: { xs: "16px", md: "24px" },
            width: "100%",
            justifyContent: { xs: "center", md: "flex-end" }
          }}
        >
          {/* Google Play Button */}
          <Button
            variant="contained"
            sx={{
              width: { xs: "160px", sm: "170px" },
              height: { xs: "48px", sm: "54px" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              borderRadius: "9px",
              background: "#000",
              "&:hover": {
                background: `linear-gradient(67deg, #e9ba00 -10%, #ff2a66 50%)`
              }
            }}
          >
             <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "12px", sm: "16px" }, // Increased gap between icon and text
                  width: "100%",
                  justifyContent: "center" // Center the content
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: { xs: "20px", sm: "24px" } // Ensure consistent icon width
                  }}
                >
              <svg
                width="20"
                height="22"
                viewBox="0 0 26 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
          <g clipPath="url(#clip0_4340_12530)">
            <path
              d="M12.4482 13.483L0.694092 25.7978C0.826089 26.2656 1.06329 26.697 1.38757 27.059C1.71185 27.4211 2.11461 27.7042 2.56508 27.8868C3.01555 28.0693 3.50179 28.1464 3.98663 28.1123C4.47147 28.0781 4.94209 27.9335 5.36249 27.6896L18.5881 20.1572L12.4482 13.483Z"
              fill="#EA4335"
            />
            <path
              d="M24.3363 11.3893L18.6171 8.11343L12.1794 13.7627L18.6433 20.1391L24.3189 16.8983C24.8217 16.635 25.2429 16.2392 25.5367 15.7536C25.8306 15.268 25.9859 14.7113 25.9859 14.1438C25.9859 13.5762 25.8306 13.0195 25.5367 12.5339C25.2429 12.0484 24.8217 11.6525 24.3189 11.3892L24.3363 11.3893Z"
              fill="#FBBC04"
            />
            <path
              d="M0.693802 2.42911C0.622797 2.69177 0.58743 2.96279 0.588654 3.23488V24.9914C0.589355 25.2634 0.624689 25.5342 0.693802 25.7973L12.8509 13.7979L0.693802 2.42911Z"
              fill="#4285F4"
            />
            <path
              d="M12.5358 14.1135L18.6144 8.11376L5.40633 0.546237C4.90939 0.255215 4.34419 0.101088 3.7683 0.0995544C2.33917 0.0967769 1.08274 1.0453 0.694092 2.42066L12.5358 14.1135Z"
              fill="#34A853"
            />
          </g>
          <defs>
            <clipPath id="clip0_4340_12530">
              <rect
                width="25.4728"
                height="29.2102"
                fill="white"
                transform="translate(0.588623 0.0995178)"
              />
            </clipPath>
          </defs>
        </svg>
      </Box>

      {/* النصوص على اليمين */}
      <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start !important",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "6px", sm: "8px" },
                      lineHeight: { xs: "14px", sm: "20px" },
                   
                    }}
                  >
                    GET IT ON
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "12px", sm: "13px" },
                      lineHeight: { xs: "18px", sm: "26.922px" },
                    }}
                  >
                    Google Play
                  </Typography>
                  </Box>
      </Box>
    </Button>

            {/* الزر الثاني */}
   
            <Button
              variant="contained"
              sx={{
                width: { xs: "160px", sm: "170px" },
                height: { xs: "48px", sm: "54px" },
                padding: { xs: "6px 12px", sm: "8px 16px" },
                borderRadius: "9px",
                background: "#000",
                "&:hover": {
                  background: `linear-gradient(67deg, #e9ba00 -10%, #ff2a66 50%)`
                }
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "12px", sm: "16px" }
                }}
              >
                     <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: { xs: "20px", sm: "24px" } // Ensure consistent icon width
                  }}
                >
                <svg
                  width="25.4728"
                height="29.2102"
                  viewBox="0 0 24 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
          <path
            id="Vector"
            d="M19.5376 26.9053C18.026 28.3706 16.3756 28.1392 14.7869 27.4452C13.1057 26.7356 11.5633 26.7048 9.78948 27.4452C7.5684 28.4015 6.39616 28.1238 5.06968 26.9053C-2.45733 19.1469 -1.34679 7.332 7.19822 6.90012C9.28049 7.00809 10.7304 8.04151 11.9489 8.13405C13.7689 7.76387 15.5119 6.6996 17.4553 6.83842C19.7844 7.02351 21.5427 7.94896 22.6995 9.61478C17.8872 12.4991 19.0286 18.8384 23.4399 20.6122C22.5607 22.9259 21.4193 25.2241 19.5222 26.9207L19.5376 26.9053ZM11.7946 6.80757C11.5633 3.36798 14.355 0.529924 17.5633 0.252289C18.0106 4.23173 13.954 7.19318 11.7946 6.80757Z"
            fill="white"
          />
        </svg>
      </Box>

      {/* النصوص على اليمين */}
      <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                   
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "6px", sm: "8px" },
                      lineHeight: { xs: "14px", sm: "20px" },
                    }}
                  >
                    Download on
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "12px", sm: "13px" },
                      lineHeight: { xs: "18px", sm: "26.922px" },
                    }}
                  >
                    App Store
                  </Typography>
                  </Box>
      </Box>
    </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
}

export default NewPage;
