import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Timer(props) {
  const fontStyle = {
    margin: "-0.18px",
    userSelect: "none",
    webkitUserSelect: "none",
    fontFamily: "Source Code Pro",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "26px",
    color: "#b0c4b1",
  };
  return (
    <Box sx={{ width: "90%", maxWidth: "1300px" }}>
      <Typography sx={{ ...fontStyle }}>{props.time}</Typography>
    </Box>
  );
}
