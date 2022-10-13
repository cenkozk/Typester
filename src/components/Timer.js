import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
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
    <Box sx={{ width: "14.41px" }}>
      <Typography
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{
          scale: [0.8, 1],
        }}
        transition={{
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
          duration: 0.25,
        }}
        sx={{ ...fontStyle, marginBottom: "6px" }}
      >
        {props.time}
      </Typography>
    </Box>
  );
}
