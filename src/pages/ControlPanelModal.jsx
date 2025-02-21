import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Logo from "./icons/Logo";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { url } from "../axios/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ControlPanelModal = ({ isOpen, handleClose, theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const modalBackgroundColor = theme === "dark" ? "#00040F" : "#F5F5F5";
  const inputBackgroundColor = theme === "dark" ? "#050A17" : "#FFFFFF";
  const buttonBackground =
    "linear-gradient(238deg, #E9BA00 -48.58%, #FF2A66 59.6%)";
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const input = event.target.value;

    setEmail(input);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function handleLogin() {
    if (!email) return alert("Email is required");
    if (!password) return alert("Password is required");

    try {
      const response = await axios.post(
        `${url}/auth/signin`,
        { email, password },
        { headers: { "x-app-token": "OKPIN" } }
      );
      alert("Hello, Login Successful!");
      localStorage.setItem("tokenOktpn", response?.data?.data);
      navigate("/dashboard");
    } catch {
      alert("Date wrong !");
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="control-panel-modal-title"
      aria-describedby="control-panel-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: "70%", xs: "90%" },
          bgcolor: modalBackgroundColor,
          borderRadius: "20px",
          boxShadow: 24,
          paddingY: 4,
        }}
      >
        {/* شعار */}
        <Typography
          id="control-panel-modal-title"
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
        >
          <Logo />
        </Typography>

        <Box sx={{ width: "90%", mx: "auto" }}>
          {/* الحقول */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
              Email
            </Typography>
            <TextField
              fullWidth
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              sx={{
                mb: 1,
                background: inputBackgroundColor,
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  height: "60px",
                  position: "relative",
                },
              }}
              InputProps={{
                style: { color: theme === "dark" ? "white" : "black" },
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme === "dark" ? "#CCCCCC" : "#555555",
                        fontSize: "12px",
                      }}
                    >
                      {email.length}/22
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
              Password
            </Typography>
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              sx={{
                mb: 2,
                background: inputBackgroundColor,
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  height: "60px",
                },
              }}
              InputProps={{
                style: { color: theme === "dark" ? "white" : "black" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      sx={{ color: "#FF2A66" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* الأزرار */}
          <Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: buttonBackground,
                color: "#FFFFFF",
                textTransform: "none",
                height: "60px",
                fontSize: "16px",
                fontWeight: "bold",
                mb: 2,
                "&:hover": { opacity: 0.9 },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: theme === "dark" ? "#FFFFFF" : "#000000",
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
                textTransform: "none",
                height: "60px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: theme === "dark" ? "#CCCCCC" : "#333333",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ControlPanelModal;
