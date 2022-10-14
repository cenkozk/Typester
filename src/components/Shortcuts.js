import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React from "react";

export default function Shortcuts() {
  const exo2 = "'Exo 2', sans-serif";
  const fontKey = {
    fontFamily: exo2,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    color: "#4A5759",
    display: "flex",
    alignItems: "center",
    WebkitUserSelect: "none",
    padding: "3px",
  };

  function keyJSX(key) {
    return (
      <Box
        sx={{
          borderRadius: "5px",
          height: "auto",
          width: "auto",
          backgroundColor: "#b0c4b1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontStyle: fontKey,
          boxShadow: "0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.24)",
        }}
      >
        {key}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        opacity: "100%",
        display: "flex",
        flexDirection: "row",
        columnGap: "5px",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        height: "auto",
        fontFamily: fontKey,
        color: "#b0c4b1",
        padding: "20px",
      }}
    >
      Press {keyJSX("Tab")} + {keyJSX("Enter")} or click to restart.
    </Box>
  );
}
