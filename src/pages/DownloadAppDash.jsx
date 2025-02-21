import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { axiosInstance } from '../axios/axios';

function DownloadAppDash({ darkMode }) {
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/landing-page/download');
        const data = response.data;
        setFormData({
          titleAr: data.title.ar,
          titleEn: data.title.en,
          descriptionAr: data.description.ar,
          descriptionEn: data.description.en,
        });
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء جلب البيانات.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.patch('/landing-page/download', {
        title: {
          ar: formData.titleAr,
          en: formData.titleEn,
        },
        description: {
          ar: formData.descriptionAr,
          en: formData.descriptionEn,
        },
      });
      alert('تم حفظ البيانات بنجاح!');
    } catch (err) {
      alert('حدث خطأ أثناء حفظ البيانات.');
    }
  };

  if (loading) {
    return <Typography>جاري تحميل البيانات...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: darkMode ? '#050A17' : '#fff',
        color: darkMode ? '#fff' : '#000',
        borderRadius: '12px',
      }}
    >
      {/* العنوان مع الأيقونة */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <HomeIcon sx={{ color: '#FF2A66', fontSize: '24px', mr: 1 }} />
        <Typography variant="h6" component="h1">
          Landing Page / Download App
        </Typography>
      </Box>

      {/* الحقول */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          label="Title (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={3}
          name="titleAr"
          value={formData.titleAr}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          sx={{
            backgroundColor: darkMode ? '#131D32' : '#f5f5f5',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#4B6A9B' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#FF2A66',
              },
            },
          }}
        />
        <TextField
          label="Title (English)"
          placeholder="Write here"
          multiline
          rows={3}
          name="titleEn"
          value={formData.titleEn}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          sx={{
            backgroundColor: darkMode ? '#131D32' : '#f5f5f5',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#4B6A9B' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#FF2A66',
              },
            },
          }}
        />
        <TextField
          label="Description (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={5}
          name="descriptionAr"
          value={formData.descriptionAr}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          sx={{
            backgroundColor: darkMode ? '#131D32' : '#f5f5f5',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#050A17' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#FF2A66',
              },
            },
          }}
        />
        <TextField
          label="Description (English)"
          placeholder="Write here"
          multiline
          rows={5}
          name="descriptionEn"
          value={formData.descriptionEn}
          onChange={handleChange}
          InputProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#fff' : '#000' },
          }}
          sx={{
            backgroundColor: darkMode ? '#131D32' : '#f5f5f5',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#4B6A9B' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#FF2A66',
              },
            },
          }}
        />
      </Box>

      {/* زر الحفظ */}
      <Button
        onClick={handleSave}
        variant="contained"
        sx={{
          borderRadius: '12px',
          padding: '10px 20px',
          background:
            'linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': {
            background:
              'linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)',
          },
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default DownloadAppDash;
