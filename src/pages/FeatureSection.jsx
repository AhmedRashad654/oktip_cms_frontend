import React from 'react';
import { Typography, Box, Button, useTheme } from '@mui/material';
import apiSectionImage from '../../public/Rectangle__1_-removebg-preview.png';






const FeatureSection = ({apiSection,language}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode=== 'dark' ? "#170B23" : "#FFFBD3",
        minHeight: '10vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        color: '#FFFFFF',
        gap: '10px',
        
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
          width: '95%',
          gap: {xs: '50px', md: '250px'},
          justifyContent: 'space-between',
        }}
      >
        {/* الصورة */}
        <Box
          component="img"
          src={apiSectionImage}
          alt="API Illustration"
          sx={{
            width: '300px',
            height: 'auto',

          }}
        />

        {/* النصوص */}
        <Box sx={{ textAlign: language === "en"?"left":"right" , flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#FF2A66',
              marginBottom: '16px',
              fontSize:{ xs: '20px', md: '30px' },
              fontFamily: 'Tajawal',
            }}
          >
            {apiSection?.title[language]}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '14px', md: '20px' },
              lineHeight: '1.8',
              marginBottom: '24px',
              color: theme.palette.mode === 'dark' ? '#FFF' : '#1A1A1A',
              fontFamily: 'Tajawal',
              fontWeight: 500,
              lineHeight:{ xs: '25px', md: '36px' },
            }}
          >
                {apiSection?.description[language]}
            <br/>
          
          </Typography>
         
          {/* الزر */}
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #E9BA00, #FF2A66)',
              color: '#FFFFFF',
              padding: '12px 24px',
              fontSize: {xs: '14px', md: '16px'},
              borderRadius: '24px',
              fontWeight: 700,
              fontFamily: 'Tajawal',
              textTransform: 'none',
              width: '163px',
              '&:hover': {
                opacity: 0.9,

              },
            }}
          >
            {language === "en"?"Explore Now":"اكتشف المزيد"}
            
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureSection;
