import { Box } from "@mui/system";
import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import TimerIcon from "@mui/icons-material/Timer";
import { motion } from "framer-motion";

export default function Header() {
  const exo2 = "'Exo 2', sans-serif";
  const fontExo = {
    fontFamily: exo2,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    color: "#4A5759",
    display: "flex",
    alignItems: "center",
    WebkitUserSelect: "none",
  };

  const sourceCode = "'Source Code Pro', monospace";
  const fontStyle = {
    margin: "-0.18px",
    userSelect: "none",
    webkitUserSelect: "none",
    fontFamily: "Source Code Pro",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    color: "#FFFFFFA5",
    color: "#6e7779",
  };

  const [selectedTime, setSelectedTime] = React.useState(35);

  return (
    <Stack
      component={motion.div}
      initial={{ scale: 0.9 }}
      animate={{
        scale: [null, 0.95],
        opacity: ["0%", "100%"],
      }}
      transition={{
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001,
        duration: 0.5,
        delay: 0.25,
      }}
      whileHover={{ scale: 1.0 }}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        width: "80%",
        maxWidth: "400px",
        height: "35px",
        backgroundColor: "#B0C4B1",
        borderRadius: "1000px",
        alignItems: "center",
        marginBottom: "30px",
        boxShadow: "0px 5px 10px 5px rgba(0, 0, 0, 0.15)",
      }}
    >
      <TimerIcon sx={{ color: "#4A5759", marginLeft: "5px", marginRight: "5px" }} />
      <Stack spacing={1} direction="row" sx={{ color: "#4A5759", marginLeft: "10px" }}>
        <Typography sx={{ ...fontExo, opacity: selectedTime != 20 ? "50%" : "100%" }}>20</Typography>
        <Typography sx={{ ...fontExo, opacity: selectedTime != 35 ? "50%" : "100%" }}>35</Typography>
        <Typography sx={{ ...fontExo, opacity: selectedTime != 50 ? "50%" : "100%" }}>50</Typography>
      </Stack>
    </Stack>
  );
}
