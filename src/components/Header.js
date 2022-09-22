import { Box } from "@mui/system";
import React from "react";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Stack, Typography } from "@mui/material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ScoreIcon from "@mui/icons-material/Score";

export default function Header() {
  const exo2 = "'Exo 2', sans-serif";
  const fontExo = {
    fontFamily: exo2,
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "22px",
    color: "#4A5759",
    display: "flex",
    alignItems: "center",
    WebkitUserSelect: "none",
  };

  return (
    <Stack
      justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between", xl: "space-between" }}
      direction="row"
      sx={{
        position: "fixed",
        top: "0%",
        minWidth: "300px",
        width: "60vw",
        height: "70px",
        background: "#B0C4B1",
        boxShadow: "0px 10px 25px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "0px 0px 30px 30px}",
      }}
    >
      <Box
        className="leftPart"
        sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "15px", width: "140px", marginLeft: "30px", height: "45px" }}
      >
        <KeyboardIcon sx={{ color: "#4A5759", width: "45px", height: "45px" }} />
        <Typography sx={fontExo}>Typester</Typography>
      </Box>
      <Stack direction="row" spacing={2} className="rightPart" sx={{ marginTop: "20px", marginRight: "30px" }}></Stack>
    </Stack>
  );
}
