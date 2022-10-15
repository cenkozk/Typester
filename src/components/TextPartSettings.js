import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { motion } from "framer-motion";

export default function TextPartSettings(props) {
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

  const [selectedTime, setSelectedTime] = React.useState(10);
  const didMount = React.useRef(false);

  React.useEffect(() => {
    //Do not rerender on initial load.
    if (didMount.current == false) {
      didMount.current = true;
      return;
    }
    console.log(selectedTime);
    props.changeTime(selectedTime);
  }, [selectedTime]);

  function setSelectedTimeFunc(num) {
    setSelectedTime(num);
  }

  var animStatus = props.isAnimOpen;

  return (
    <Stack
      component={motion.div}
      initial={{ scale: 0.9, opacity: "0%" }}
      animate={
        animStatus
          ? {
              scale: [null, 0.95],
              opacity: ["0%", "100%"],
            }
          : {
              scale: [null, 0.9],
              opacity: [null, "0%"],
            }
      }
      transition={{
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001,
        duration: 0.3,
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
        marginBottom: "20px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      }}
    >
      <TimerIcon sx={{ color: "#4A5759", marginLeft: "5px", marginRight: "5px" }} />
      <Stack spacing={1} direction="row" sx={{ color: "#4A5759", marginLeft: "10px" }}>
        <Typography
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedTimeFunc(5)}
          sx={{ ...fontExo, opacity: selectedTime != 5 ? "50%" : "100%" }}
        >
          5
        </Typography>
        <Typography
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedTimeFunc(10)}
          sx={{ ...fontExo, opacity: selectedTime != 10 ? "50%" : "100%" }}
        >
          10
        </Typography>
        <Typography
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedTimeFunc(20)}
          sx={{ ...fontExo, opacity: selectedTime != 20 ? "50%" : "100%" }}
        >
          20
        </Typography>
        <Typography
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={() => setSelectedTimeFunc(35)}
          sx={{ ...fontExo, opacity: selectedTime != 35 ? "50%" : "100%" }}
        >
          35
        </Typography>
        <Typography
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          onClick={() => setSelectedTimeFunc(60)}
          sx={{ ...fontExo, opacity: selectedTime != 60 ? "60%" : "100%" }}
        >
          60
        </Typography>
      </Stack>
    </Stack>
  );
}
