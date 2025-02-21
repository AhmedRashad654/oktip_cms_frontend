import React from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Typography,
  Card,
  Box,
  Container,
  useTheme,
} from "@mui/material";

function ThirdSection({ whyUs, language }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? "#00040F" : "#FFFFFF",
        py: { xs: 6, sm: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            color: "#ff2a66",
            fontSize: { xs: "24px", sm: "28px", md: "32px" },
            fontWeight: 700,
            fontFamily: "Tajawal, sans-serif",
            mb: { xs: 4, sm: 5 },
            textAlign: "center",
          }}
        >
          !؟ OKpin لماذا
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
        >
          {whyUs
            ?.slice()
            ?.reverse()
            ?.map((card, index) => {
              const isBottomHeader = index === 0 || index === 2;

              return (
                <Grid item xs={12} sm={6} md={3} key={card.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: { xs: "200px", sm: "220px", md: "240px" },
                        maxWidth: { xs: "100%", sm: "220px", md: "240px" },
                        mx: "auto",
                        borderRadius: { xs: "30px", sm: "35px", md: "40px" },
                        bgcolor: isDarkMode ? "#13131a" : "#f5f5f5",
                        position: "relative",
                        transition: "transform 0.3s",
                        display: "flex",
                        flexDirection: isBottomHeader
                          ? "column-reverse"
                          : "column",
                        "&:hover": {
                          transform: "translateY(-10px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: { xs: "35px", sm: "40px", md: "45px" },
                          bgcolor: card.color,
                          borderRadius: isBottomHeader
                            ? "0 0 20px 20px"
                            : "20px 20px 0 0",
                        }}
                      />

                      <Box
                        sx={{
                          width: { xs: "60px", sm: "65px", md: "75px" },
                          height: { xs: "60px", sm: "65px", md: "75px" },
                          borderRadius: "50%",
                          bgcolor:
                            index === 0
                              ? "#E9BA00"
                              : index === 1
                              ? "#00BF16"
                              : index === 2
                              ? "#9022FF"
                              : index === 3
                              ? "#0059FF"
                              : "#E9BA00",
                          border: `4px solid ${
                            isDarkMode ? "#13131a" : "#f5f5f5"
                          }`,
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          ...(isBottomHeader
                            ? { bottom: { xs: 15, sm: 18, md: 21 } }
                            : { top: { xs: 12, sm: 15, md: 15 } }),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        <img
                          src={card?.image}
                          alt="why us"
                          className="width-img"
                        />
                      </Box>

                      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 }, my: "auto" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            color: isDarkMode ? "#f5f5f5" : "#00040F",
                            fontWeight: 700,
                            fontSize: { xs: "14px", sm: "15px", md: "16px" },
                            lineHeight: { xs: "1.4", sm: "1.5", md: "1.8" },
                            fontFamily: "Tajawal, sans-serif",
                            mb: 1,
                          }}
                        >
                          {card?.title[language]}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: isDarkMode ? "#f5f5f5" : "#00040F",
                            fontWeight: 500,
                            fontSize: { xs: "12px", sm: "13px", md: "14px" },
                            lineHeight: { xs: "1.4", sm: "1.5", md: "1.8" },
                            fontFamily: "Tajawal, sans-serif",
                          }}
                        >
                          {card?.description[language]}
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
}

export default ThirdSection;
