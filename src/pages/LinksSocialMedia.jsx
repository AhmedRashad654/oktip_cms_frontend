import Facebook from "./icons/Facebook";
import Twitter from "./icons/Twitter";
import Whatsappicon from "./icons/Whatsappicon";
import Telegram from "./icons/Telegram";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios/axios";
import { Box, IconButton } from "@mui/material";

export default function LinksSocialMedia({ theme, language }) {
  function getSocialMedia() {
    return axiosInstance.get(`/social-media`);
  }

  const { data } = useQuery({
    queryKey: ["getSocialMedia", language],
    queryFn: getSocialMedia,
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "20px",
        mt: 3,
      }}
    >
      <IconButton
        href={data?.data?.Facebook}
        sx={{
          backgroundColor: theme === "dark" ? "#090F21" : "#0059FF",
          padding: "9px",
          height: "40px",
          "&:hover": {
            backgroundColor: "blue",
          },
        }}
      >
        <Facebook />
      </IconButton>
      <IconButton
        href={data?.data?.xWebsite}
        sx={{
          color: "#FF2A66",
          backgroundColor: "black",
          padding: "11px",
          height: "40px",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <Twitter />
      </IconButton>
      <IconButton
        href={data?.data?.WhatsApp}
        sx={{
          color: "#FF2A66",
          backgroundColor: theme === "dark" ? "#090F21" : "#DFE3E7",
          padding: "11px",
          height: "40px",
        }}
      >
        <Whatsappicon />
      </IconButton>
      <IconButton
        href={data?.data?.Telegram}
        sx={{
          color: "#FF2A66",
          backgroundColor: theme === "dark" ? "#090F21" : "#DFE3E7",
          padding: "11px",
          height: "40px",
        }}
      >
        <Telegram />
      </IconButton>
    </Box>
  );
}
