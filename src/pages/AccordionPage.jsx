import React, { useState } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionPage = ({faq,language}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // فتح الأكورديون الذي تم النقر عليه
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#050A17' : '#FFFFFF',
        // minHeight: '2100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#FF2A66',
          marginBottom: '30px',
          textAlign: 'center',
          fontSize:{ xs: '16px', md: '32px'},
          fontFamily: 'Tajawal',
          fontWeight: 700,
        }}
      >
        {language === "en"?"(FAQ) Frequently Asked Questions":"(FAQ) الأسئلة الشائعة"}
        
      </Typography>
      {faq?.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`} // تحقق من حالة الفتح
          onChange={handleAccordionChange(`panel${index}`)} // حدث تغيير الحالة
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#050A17' : '#EAEAEA',
            color: theme.palette.mode === 'dark' ? '#FFF' : '#00040F',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: theme.palette.mode === 'dark' ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : '0px 4px 20px rgba(255, 255, 255, 0.3)',
            '&:before': { display: 'none' },
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <AccordionSummary
  expandIcon={
    expanded === `panel${index}` ? (
      <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#FF2A66' , fontFamily: 'Tajawal' }}>-</Typography>
    ) : (
      <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#FF2A66' , fontFamily: 'Tajawal' }}>+</Typography>
    )
  }
  aria-controls={`panel${index}-content`}
  id={`panel${index}-header`}
  sx={{
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse', // يعكس اتجاه العناصر
    width: '100%',
    gap: '16px',
    margin: '0',
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 500,
      fontSize: { xs: '16px', md: '20px' },
      textAlign: language === "en"?"left":"right",
      fontFamily: 'Tajawal',
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      marginRight: '16px',
    }}
  >
    {item?.title[language]}
  </Typography>
</AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '16px 24px',
              fontSize: { xs: '14px', md: '16px' },
              color: theme.palette.mode === 'dark' ? '#CCCCCC' : '#00040F',
              textAlign: language === "en"?"left":"right",
              borderTop: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #FFF',
              backgroundColor: theme.palette.mode === 'dark' ? '#00040F' : '#FFFFFF',
              fontFamily: 'Tajawal',
              fontWeight: 500,
            }}
          >
            {item?.description[language]}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionPage;
