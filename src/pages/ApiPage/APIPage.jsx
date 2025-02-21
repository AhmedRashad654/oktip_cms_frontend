// pages/Home.jsx
import React from 'react';
import { Box, Typography,  Backdrop, CircularProgress } from '@mui/material';
import ThirdSection1 from './ThirdSection1';
import HowAPIWorks from './HowAPIWorks';
import FeaturesSection from './FeaturesSection';
import FourdSection1 from './FourdSection1';
import AccordionPage1 from './AccordionPage1';
import Footer from '../Footer';
import { axiosInstance } from '../../axios/axios';
import { useQuery } from '@tanstack/react-query';

function APiPage({ darkMode,language }) {
  const isDarkMode = darkMode;
  function getAllApiPage() {
    return axiosInstance.get(`/translate/api?lang=${language}`);
  }
  const { data,isLoading } = useQuery({
    queryKey: ["getAllApiPage", language],
    queryFn: getAllApiPage,
  });
   console.log(data)

  return (
    <>
           <Backdrop sx={{ color: "#fff", zIndex: 1201 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '50vh',
          padding: '20px',
          color: isDarkMode ? '#ffffff' : '#000',
          position: 'relative',
          backgroundImage: "url('/Leonardo_Phoenix_10_Design_a_vibrant_and_colorful_banner_for_t_3 (1) 1.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: isDarkMode
              ? 'linear-gradient(180deg, #00040F 2.49%, rgba(0, 4, 15, 0.00) 40.86%, #00040F 84.56%)'
              : 'linear-gradient(180deg, var(--primary-bg, #FFF) 2.49%, rgba(255, 255, 255, 0.00) 40.86%, var(--primary-bg, #FFF) 84.56%)',
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'background 0.3s ease-in-out',
          },
        }}
      >
        {/* العنوان الرئيسي (محمل من API) */}
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 2,
            fontSize: { xs: '28px', md: '48px' },
          }}
        >
          {data && data?.data?.hero?.title[language]}
        </Typography>

        {/* الوصف النصي (محمل من API) */}
        <Typography
          variant="h5"
          sx={{
            position: 'relative',
            zIndex: 2,
            marginTop: '10px',
            maxWidth: '800px',
            fontSize: { xs: '16px', md: '24px' },
          }}
        >
          {data && data?.data?.hero?.description[language]}
        </Typography>
      </Box>

      {/* الأقسام الأخرى */}
      <ThirdSection1 language={ language } data={ data?.data?.whyOk} />
      <HowAPIWorks data={data?.data?.howItWork[0]} language={ language }/>  
      <FeaturesSection data={ data?.data?.apiAdvantage } language={language} />
      <FourdSection1 data={ data?.data?.offer } language={language}/>
      <AccordionPage1 data={ data?.data?.faq } language={language}/>
    </>
  );
}

export default APiPage;
