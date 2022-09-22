import { Box } from "@mui/system";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0%",
        height: "50px",
        minWidth: "300px",
        width: "20%",
        background: "#B0C4B1",
        boxShadow: "0px -10px 25px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "0px 0px 30px 30px",
        transform: "rotate(180deg)",
      }}
    ></Box>
  );
}
