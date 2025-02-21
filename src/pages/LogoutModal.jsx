import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function LogoutModal( { open, handleClose, handleLogout, darkMode } ) {
  const navigate = useNavigate()
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px", // حواف دائرية
          backgroundColor: darkMode ? "#131D32" : "#fff", // دعم الوضع المظلم والفاتح
          color: darkMode ? "#fff" : "#000", // لون النصوص بناءً على الوضع
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#FF2A66",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Log Out
      </DialogTitle>
      <DialogContent>
        <Typography align="center">
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: "12px", // حواف دائرية
            padding: "8px 24px",
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
          Cancel
        </Button>
        <Button
          onClick={ () => {
            localStorage.removeItem( "tokenOktpn" )
            navigate("/")
          } }
          sx={{
            borderRadius: "12px",
            padding: "8px 24px",
            backgroundColor: darkMode ? "#0F172A" : "#131D32", // لون الزر يتغير حسب الوضع
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: darkMode ? "#050A17" : "#0F172A", // لون التحويم يتغير أيضًا
            },
          }}
        >
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutModal;
