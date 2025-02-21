import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const images = ["/Rectangle.png", "/Rectangle2.png", "/Rectangle3.png"];

function SecondSection({ welcome, language }) {
  return (
    <Box
      className="second-section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // عكس الاتجاه في الشاشات الكبيرة فقط
        alignItems: "center",
        justifyContent: "space-between",
        gap:"40px",
        paddingY: "50px",
        paddingX:{md:"80px",xs:"20px"},
        backgroundColor: "#00040f",
        color: "white",
       
      }}
    >
  

      {/* قسم الصور بالكامل */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {md: "row",xs:"column"},
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          order: { xs: 2, md: 0 },
          flexWrap: "nowrap", // الحفاظ على ترتيب الصور بجانب بعضها في كل الشاشات
        }}
      >
        {/* الصور الثابتة */}
        <Box
          className="static-column"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: { md: "250px",xs:"300px" },
          }}
        >
          <Box
            component="img"
            src={welcome?.images[0]}
            alt="large-image"
            sx={{
              width: "100%",
              height: "300px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Box
            className="small-images-row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Box
              component="img"
              src={welcome?.images[1]}
              alt="small-image-1"
              sx={{
                width: "calc(50% - 5px)",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Box
              component="img"
              src={welcome?.images[2]}
              alt="small-image-2"
              sx={{
                width: "calc(50% - 5px)",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        {/* الصور المتحركة */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          {/* الصف المتحرك الأول */}
          <Box
            className="marquee-container"
            sx={{
              width: "150px",
              height: "460px",
              overflow: "hidden",
            }}
          >
            <motion.div
              className="marquee"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {welcome?.images.concat(images).map((src, index) => (
                <Box
                  component="img"
                  key={index}
                  src={src}
                  alt={`image-${index + 1}`}
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </motion.div>
          </Box>

          {/* الصف المتحرك الثاني */}
          <Box
            className="marquee-container"
            sx={{
              width: "150px",
              height: "460px",
              overflow: "hidden",
            }}
          >
            <motion.div
              className="marquee"
              animate={{ y: ["-50%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {welcome?.images.concat(images).map((src, index) => (
                <Box
                  component="img"
                  key={index + 100}
                  src={src}
                  alt={`image-${index + 1}-row2`}
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </motion.div>
          </Box>
        </Box>
      </Box>
          {/* قسم النصوص */}
      <Box
        className="text-section"
        sx={{
          flex: 1,
         
          paddingBottom: { xs: "30px", md: "0px" },
          order: { xs: 1, md: 0 },
          width: "100%",
     textAlign:language === "en"?"left":"right",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#ff2a66",
            fontFamily: "Tajawal",
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "180%",
      
          }}
        >
          {welcome?.title[language]}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Tajawal",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "180%",
            marginTop: "20px",
          }}
        >
          {welcome?.description[language]}
        </Typography>
      </Box>
    </Box>
  );
}

export default SecondSection;
