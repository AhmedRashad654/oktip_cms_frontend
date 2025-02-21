import React, {  useState } from "react";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import IconHero from "../icons/IconHero";
import IconHero2 from "../icons/IconHero2";
import IconHero3 from "../icons/IconHero3";
import IconHero4 from "../icons/IconHero4";


function ThirdSection1({language,data}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  // ✅ حالة لتخزين بيانات الكروت القادمة من الـ API
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // الأرقام الخاصة بالكروت التي نريد جلبها من الـ API
  //   const cardOrders = [1, 2, 3, 4];

  //   const fetchCards = async () => {
  //     try {
  //       // ✅ جلب البيانات لكل الكروت في وقت واحد باستخدام Promise.all
  //       const responses = await Promise.all(
  //         cardOrders.map((order) =>
  //           axiosInstance.get(`/api-page/why-ok/${order}`).then((res) => res.data)
  //         )
  //       );

  //       setCards(responses); // تخزين البيانات في الـ state
  //     } catch (err) {
  //       setError("فشل تحميل البيانات");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCards();
  // }, []);

  // أيقونات الكروت مرتبة حسب `order`
  const icons = {
    1: <IconHero4 />,
    2: <IconHero3 />,
    3: <IconHero2 />,
    4: <IconHero />,
  };

  // ✅ إعادة الألوان الأصلية لكل كارت حسب `order`
  const cardColors = {
    1: "#0059FF", // واجهة بسيطة وفعالة
    2: "#9022FF", // نقاط مكافآت مُجزية
    3: "#00BF16", // عروض لا تُقاوم
    4: "#E9BA00", // كل المنتجات في مكان واحد
  };

  return (
    <Box
      sx={{
        padding: { xs: "30px", md: "50px 80px" },
        backgroundColor: isDarkMode ? "#00040F" : "#F5F5F5",
        color: isDarkMode ? "white" : "black",
        textAlign: "center",
      }}
    >
      {/* العنوان الرئيسي */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "700",
          color: "#FF2A66",
          marginBottom: "40px",
        }}
      >
        {language === "en"?"Why OKpin?":"!؟ OKpin لماذا"}
      </Typography>
    
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

      {/* ✅ عرض الكروت بعد تحميل البيانات */}
      <Grid container spacing={2} justifyContent="center">
        {data && data?.map((card, index) => {
          const isTopBackground = index % 2 !== 0; // الخلفية العلوية للكارد الرابع والثاني
          const cardColor = cardColors[card.order] || "#0059FF"; // استخدام اللون حسب `order`

          return (
            <Grid item xs={12} sm={6} md={3} key={card._id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: "40px",
                    backgroundColor: isDarkMode ? "#13131A" : "#FFFFFF",
                    textAlign: "center",
                    padding: "20px",
                    height: "240px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  {/* الخلفية الملونة */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "25%",
                      backgroundColor: cardColor, // ✅ تعيين اللون الصحيح لكل كارد
                      top: isTopBackground ? 0 : "auto",
                      bottom: isTopBackground ? "auto" : 0,
                      borderRadius: isTopBackground
                        ? "40px 40px 0 0"
                        : "0 0 40px 40px",
                    }}
                  />

                  {/* الأيقونة */}
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: cardColor, // ✅ تعيين اللون الصحيح لكل كارد
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      position: "absolute",
                      top: isTopBackground ? "0%" : "auto",
                      bottom: isTopBackground ? "auto" : "30%",
                      transform: "translateY(50%)",
                    }}
                  >
                    {icons[card.order] || <IconHero />}
                  </Box>

                  {/* المحتوى النصي */}
                  <Box
                    sx={{
                      marginTop: isTopBackground ? "50px" : "-20px",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {card?.title[language]}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: isDarkMode ? "#FFFFFF" : "#333",
                        padding: "0 10px",
                      }}
                    >
                      {card.description[language]}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ThirdSection1;
