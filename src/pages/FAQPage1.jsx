import React, { useState } from "react";
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
import API from "./icons/API";

const FAQPage1 = ({ darkMode }) => {
  const [buttons, setButtons] = useState(["One"]);
  const [activeButton, setActiveButton] = useState("One");
  const [faqData, setFaqData] = useState({
    One: { questionArabic: "", questionEnglish: "", answerArabic: "", answerEnglish: "" },
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleActiveButtonChange = (_, newActiveButton) => {
    if (newActiveButton !== null) setActiveButton(newActiveButton);
  };

  const handleAddButton = () => {
    const nextNumber = buttons.length + 1;
    const newButtonName = toWords(nextNumber).replace(/^\w/, (c) => c.toUpperCase());
    setButtons((prevButtons) => [...prevButtons, newButtonName]);
    setFaqData((prevFaqData) => ({
      ...prevFaqData,
      [newButtonName]: { questionArabic: "", questionEnglish: "", answerArabic: "", answerEnglish: "" },
    }));
    setActiveButton(newButtonName);
  };

  const handleInputChange = (field, value) => {
    setFaqData((prevFaqData) => ({
      ...prevFaqData,
      [activeButton]: { ...prevFaqData[activeButton], [field]: value },
    }));
  };

  const handleDeleteQuestion = () => {
    const newButtons = buttons.filter((btn) => btn !== activeButton);
    const newFaqData = { ...faqData };
    delete newFaqData[activeButton];

    setButtons(newButtons);
    setFaqData(newFaqData);
    setActiveButton(newButtons[0] || "");

    setOpenDeleteDialog(false);
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
     <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <API  />
            <Typography variant="h6" component="h1">
            API page / FAQ
            </Typography>
          </Box>

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
          onClick={() => console.log(faqData)}
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

export default FAQPage1;
