
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toWords } from "number-to-words";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios";

const FAQPage = ({ darkMode }) => {
  const [buttons, setButtons] = useState(["One"]);
  const [activeButton, setActiveButton] = useState("One");
  const [faqData, setFaqData] = useState({
    One: { questionArabic: "", questionEnglish: "", answerArabic: "", answerEnglish: "" },
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleActiveButtonChange = (_, newActiveButton) => {
    if (newActiveButton !== null) setActiveButton(newActiveButton);
  };
  useEffect(() => {
    const fetchAllOrders = async () => {
      let order = 1;
      let fetchedData = {};
      let fetchedButtons = [];
      let maxEmptyRequests = 3; // عدد محاولات فارغة قبل التوقف
      let emptyRequests = 0;
  
      while (emptyRequests < maxEmptyRequests) {
        try {
          const response = await axiosInstance.get(`/landing-page/faq/${order}`);
  
          if (!response.data || !response.data._id) {
            console.warn(`🚫 No valid data for order ${order}, skipping...`);
            emptyRequests++;
          } else {
            console.log(`✅ Order ${order} fetched:`, response.data);
            const buttonName = toWords(order).replace(/^\w/, (c) => c.toUpperCase());
            fetchedButtons.push(buttonName);
            fetchedData[buttonName] = {
              questionArabic: response.data.title.ar || "",
              questionEnglish: response.data.title.en || "",
              answerArabic: response.data.description.ar || "",
              answerEnglish: response.data.description.en || "",
            };
            emptyRequests = 0; // إعادة تعيين العدّاد عند العثور على بيانات صالحة
          }
        } catch (error) {
          console.error(`🚫 Error fetching order ${order}, skipping...`);
          emptyRequests++;
        }
        order++; // متابعة الطلبات حتى لو كان هناك طلب فارغ
      }
  
      setButtons(fetchedButtons);
      setFaqData(fetchedData);
      setActiveButton(fetchedButtons.length > 0 ? fetchedButtons[0] : "");
    };
  
    fetchAllOrders();
  }, []);
  
  
  
  const handleSave = async () => {
    if (!activeButton || !faqData[activeButton]) return;
  
    const order = buttons.indexOf(activeButton) + 1; // حساب رقم الطلب
    
    try {
      const response = await axiosInstance.patch(`/landing-page/faq/${order}`, {
        title: {
          ar: faqData[activeButton].questionArabic,
          en: faqData[activeButton].questionEnglish,
        },
        description: {
          ar: faqData[activeButton].answerArabic,
          en: faqData[activeButton].answerEnglish,
        },
      });
  
      console.log(`✅ Data for order ${order} updated successfully:`, response.data);
      alert("✅ تم حفظ التعديلات بنجاح!");
    } catch (error) {
      console.error(`🚫 Error updating order ${order}:`, error);
      alert("❌ فشل في حفظ التعديلات!");
    }
  };
  
  const handleDeleteQuestion = async () => {
    if (!activeButton) return;
  
    const order = buttons.indexOf(activeButton) + 1; // حساب رقم الطلب
  
    try {
      await axiosInstance.delete(`/landing-page/faq/${order}`);
      console.log(`🗑️ Order ${order} deleted successfully!`);
      
      // حذف الزر من الواجهة
      const newButtons = buttons.filter((btn) => btn !== activeButton);
      const newFaqData = { ...faqData };
      delete newFaqData[activeButton];
  
      setButtons(newButtons);
      setFaqData(newFaqData);
      setActiveButton(newButtons[0] || "");
  
      setOpenDeleteDialog(false);
      alert("✅ تم حذف السؤال بنجاح!");
    } catch (error) {
      console.error(`🚫 Error deleting order ${order}:`, error);
      alert("❌ فشل في حذف السؤال!");
    }
  };
  
  const handleAddButton = async () => {
    try {
      const response = await axiosInstance.post(`/landing-page/faq`, {
        title: { ar: "عنوان جديد", en: "New Title" }, // وضع قيمة افتراضية
        description: { ar: "إجابة جديدة", en: "New Answer" }, // وضع قيمة افتراضية
        IsViewd: true, // إضافة هذا الحقل كما هو مطلوب من الخادم
      });
  
      const newOrder = response.data.order; // الحصول على رقم الطلب الجديد من الخادم
      const newButtonName = toWords(newOrder).replace(/^\w/, (c) => c.toUpperCase());
  
      console.log(`✅ New FAQ added with order ${newOrder}:`, response.data);
  
      setButtons((prevButtons) => [...prevButtons, newButtonName]);
      setFaqData((prevFaqData) => ({
        ...prevFaqData,
        [newButtonName]: { questionArabic: "", questionEnglish: "", answerArabic: "", answerEnglish: "" },
      }));
      setActiveButton(newButtonName);
  
      alert("✅ تم إضافة سؤال جديد بنجاح!");
    } catch (error) {
      console.error(`🚫 Error adding new FAQ:`, error);
  
      if (error.response) {
        console.error("📌 Server Full Response:", error.response.data);
        alert(`❌ فشل في إضافة السؤال الجديد! التفاصيل: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("❌ فشل في إضافة السؤال الجديد! تحقق من الاتصال بالخادم.");
      }
    }
  };
  
  
  
  

  const handleInputChange = (field, value) => {
    setFaqData((prevFaqData) => ({
      ...prevFaqData,
      [activeButton]: { ...prevFaqData[activeButton], [field]: value },
    }));
  };

 

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "12px",
        backgroundColor: darkMode ? "#050A17" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        Landing Page / FAQ
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <ToggleButtonGroup
          value={activeButton}
          exclusive
          onChange={handleActiveButtonChange}
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
              p: "10px 20px",
              backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
              color: darkMode ? "#fff" : "#000",
              "&.Mui-selected": {
                backgroundColor: "#9022FF",
                color: "#fff",
              },
            },
          }}
        >
          {buttons.map((buttonName) => (
            <ToggleButton key={buttonName} value={buttonName}>
              {buttonName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button
          variant="outlined"
          onClick={handleAddButton}
          sx={{
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
              borderColor: "#9022FF",
              color: "#9022FF",
            },
          }}
        >
          Add another FAQ
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          label="Question (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={2}
          value={faqData[activeButton]?.questionArabic || ""}
          onChange={(e) => handleInputChange("questionArabic", e.target.value)}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
          }}
        />
        <TextField
          label="Question (English)"
          placeholder="Write here"
          multiline
          rows={2}
          value={faqData[activeButton]?.questionEnglish || ""}
          onChange={(e) => handleInputChange("questionEnglish", e.target.value)}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
          }}
        />
        <TextField
          label="Answer (Arabic)"
          placeholder="اكتب هنا"
          multiline
          rows={6}
          value={faqData[activeButton]?.answerArabic || ""}
          onChange={(e) => handleInputChange("answerArabic", e.target.value)}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
          }}
        />
        <TextField
          label="Answer (English)"
          placeholder="Write here"
          multiline
          rows={6}
          value={faqData[activeButton]?.answerEnglish || ""}
          onChange={(e) => handleInputChange("answerEnglish", e.target.value)}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            borderRadius: "12px",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
        onClick={handleSave}
          variant="contained"
          sx={{
            borderRadius: "12px",
            padding: "10px 20px",
            background: "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
            },
          }}
          
        >
          Save Changes
        </Button>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          startIcon={<DeleteIcon sx={{ color: "#FF2A66" }} />}
          sx={{
            backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
            color: darkMode ? "#FF2A66" : "#000",
            fontWeight: "bold",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: darkMode ? "#9022FF" : "#f5f5f5",
            },
          }}
        >
          Delete Question
        </Button>
      </Box>

      <Dialog
  open={openDeleteDialog}
  onClose={() => setOpenDeleteDialog(false)}
  PaperProps={{
    style: {
      backgroundColor: darkMode ? "#050A17" : "#fff",
      color: darkMode ? "#fff" : "#000",
      borderRadius: "24px", // جعل الحواف دائرية
      width: "400px", // جعل العرض صغيرًا مثل مربع
      padding: "20px",
    },
  }}
>
  <DialogTitle
    sx={{
      color: "#FF2A66",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textAlign: "center", // توسيط النص
    }}
  >
    Delete Question
  </DialogTitle>
  <DialogContent>
    <DialogContentText
      sx={{
        fontSize: "1.2rem",
        color: darkMode ? "#ccc" : "#333",
        textAlign: "center", // توسيط النص
      }}
    >
      Are you sure you want to Log Out?
    </DialogContentText>
  </DialogContent>
  <DialogActions
    sx={{
      display: "flex",
      justifyContent: "center", // توسيط الأزرار
      gap: 2,
      mt: 2,
    }}
  >
    <Button
      onClick={() => setOpenDeleteDialog(false)}
      sx={{
        background: "linear-gradient(238deg, #E9BA00, #FF2A66)",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "24px", // حواف دائرية
        padding: "8px 20px",
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleDeleteQuestion}
      sx={{
        backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
        color: darkMode ? "#FF2A66" : "#000",
        fontWeight: "bold",
        borderRadius: "24px", // حواف دائرية
        padding: "8px 20px",
      }}
    >
      Log Out
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default FAQPage;
