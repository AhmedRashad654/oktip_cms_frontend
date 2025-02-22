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
  const [buttons, setButtons] = useState([]);
  // console.log(buttons);
  const [activeButton, setActiveButton] = useState("One");
  const [order, setOrder] = useState("");
  const [faqData, setFaqData] = useState("");
  const [data, setData] = useState({
    title: {
      ar: "",
      en: "",
    },
    description: {
      ar: "",
      en: "",
    },
    IsViewd: true,
  });
  // console.log(data);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleActiveButtonChange = (_, newActiveButton) => {
    if (newActiveButton !== null) setActiveButton(newActiveButton);
  };
  useEffect(() => {
    async function fetchAllOrders() {
      let order = 1;
      let fetchedData = {};
      let fetchedButtons = [];
      let maxEmptyRequests = 3; // عدد محاولات فارغة قبل التوقف
      let emptyRequests = 0;

      try {
        const response = await axiosInstance.get("/landing-page/faq");
        setButtons(response.data);
        // console.log(response.data);
        // if (!response.data || !response.data._id) {
        //   console.warn(`🚫 No valid data for order ${order}, skipping...`);
        //   emptyRequests++;
        // } else {
        //   const buttonName = toWords(order).replace(/^\w/, (c) =>
        //     c.toUpperCase()
        //   );
        //   fetchedButtons.push(buttonName);
        //   fetchedData[buttonName] = {
        //     questionArabic: response.data.title.ar || "",
        //     questionEnglish: response.data.title.en || "",
        //     answerArabic: response.data.description.ar || "",
        //     answerEnglish: response.data.description.en || "",
        //   };
        //   emptyRequests = 0; // إعادة تعيين العدّاد عند العثور على بيانات صالحة
        // }
      } catch (error) {
        emptyRequests++;
      }
      order++; // متابعة الطلبات حتى لو كان هناك طلب فارغ

      setActiveButton(fetchedButtons.length > 0 ? fetchedButtons[0] : "");
    }

    fetchAllOrders();
  }, []);
  let i = 1;
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

      // console.log(
      //   `✅ Data for order ${order} updated successfully:`,
      //   response.data
      // );
      alert("✅ تم حفظ التعديلات بنجاح!");
    } catch (error) {
      // console.error(`🚫 Error updating order ${order}:`, error);
      alert("❌ فشل في حفظ التعديلات!");
    }
  };
  //  seEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get("/landing-page/faq");
  //       console.log(res.data + " i fff"); // Use res.data instead of res.json()
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  function handelSelectedOrder(ord) {
    setOrder(ord);
  }

  const handleDeleteQuestion = async () => {
    try {
      const res = await axiosInstance.delete(`/landing-page/faq/${order}`);
      console.log(res);

      alert("✅ تم حذف السؤال بنجاح!");
    } catch (error) {
      alert("❌ فشل في حذف السؤال!");
    }
    // fetchAllOrders();
  };
  // useEffect(fetchAllOrders, [handleDeleteQuestion]);
  const getItemById = async (id) => {
    try {
      const res = await axiosInstance.get(`/landing-page/faq/${id}`); // Use 'id' here
      console.log("Fetched Data:", res.data);

      // Ensure the data structure matches the expected format
      setData((prevData) => ({
        ...prevData,
        title: {
          ar: res.data?.title?.ar || "",
          en: res.data?.title?.en || "",
        },
        description: {
          ar: res.data?.description?.ar || "",
          en: res.data?.description?.en || "",
        },
        IsViewd: res.data?.IsViewd ?? true,
      }));
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  async function handelEditByID() {
    if (order) {
      try {
        console.log(data);
        const response = await axiosInstance.patch(
          `/landing-page/faq/${order}`,
          {
            title: {
              ar: data?.title?.ar || "",
              en: data?.title?.en || "",
            },
            description: {
              ar: data?.description?.ar || "",
              en: data?.description?.en || "",
            },
            IsViewd: data?.IsViewd ?? true,
          }
        );

        console.log(
          `✅ Data for order ${order} updated successfully:`,
          response
        );
        alert("✅ تم حفظ التعديلات بنجاح!");
      } catch (error) {
        console.error("❌ Failed to update:", error);
        alert("❌ فشل في حفظ التعديلات!");
      }
    }
  }

  const handleAddButton = async () => {
    try {
      const response = await axiosInstance.post(`/landing-page/faq`, {
        title: {
          ar: data.title.ar,
          en: data.title.en,
        },
        description: {
          ar: data.description.ar,
          en: data.description.en,
        },
        IsViewd: true,
      });

      console.log(response);

      // setFaqData((prevFaqData) => ({
      //   ...prevFaqData,
      //   [newButtonName]: {
      //     questionArabic: "",
      //     questionEnglish: "",
      //     answerArabic: "",
      //     answerEnglish: "",
      //   },
      // }));
      // setActiveButton(newButtonName);
      // fetchAllOrders();
      alert("✅ تم إضافة سؤال جديد بنجاح!");
    } catch (error) {
      console.error(`🚫 Error adding new FAQ:`, error);

      if (error.response) {
        console.error("📌 Server Full Response:", error.response.data);
        alert(
          `❌ فشل في إضافة السؤال الجديد! التفاصيل: ${JSON.stringify(
            error.response.data
          )}`
        );
      }
    }
  };

  const handleInputChange = (section, lang, value) => {
    setData((prevFaqData) => ({
      ...prevFaqData,
      [section]: {
        ...prevFaqData[section],
        [lang]: value,
      },
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
            <ToggleButton
              onClick={() => {
                handelSelectedOrder(buttonName.order);
                getItemById(buttonName.order);
              }}
              key={buttonName._id}
              value={buttonName._id}
            >
              {i++}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button
          disabled={buttons.length === 8}
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
          value={data.title.ar}
          onChange={(e) => handleInputChange("title", "ar", e.target.value)}
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
          value={data.title.en}
          onChange={(e) => handleInputChange("title", "en", e.target.value)}
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
          value={data.description.ar}
          onChange={(e) =>
            handleInputChange("description", "ar", e.target.value)
          }
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
          value={data.description.en}
          onChange={(e) =>
            handleInputChange("description", "en", e.target.value)
          }
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handelEditByID}
          variant="contained"
          sx={{
            borderRadius: "12px",
            padding: "10px 20px",
            background:
              "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background:
                "linear-gradient(238deg, #FF2A66 -48.58%, #E9BA00 59.6%)",
            },
          }}
        >
          Save Changes
        </Button>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          // onClick={handleDeleteQuestion}
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
            Are you sure you want to Delete?
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
            onClick={() => {
              setOpenDeleteDialog(false);
              handleDeleteQuestion();
            }}
            sx={{
              backgroundColor: darkMode ? "#131D32" : "#f5f5f5",
              color: darkMode ? "#FF2A66" : "#000",
              fontWeight: "bold",
              borderRadius: "24px", // حواف دائرية
              padding: "8px 20px",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FAQPage;
