import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React from "react";

export default function TextPartResults(props) {
  const exo2 = "'Exo 2', sans-serif";
  const sourceCode = "'Source Code Pro', monospace";
  const fontStyle = {
    margin: "-0.18px",
    userSelect: "none",
    webkitUserSelect: "none",
    fontFamily: sourceCode,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "78px",
    color: "#7a9096",
    height: "auto",
    marginTop: "-20px",
  };
  const fontExo = {
    margin: "0px",
    fontFamily: exo2,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    color: "#b0c4b1",
    WebkitUserSelect: "none",
    height: "auto",
    textDecoration: "underline",
  };

  const boxSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3c474a",
    borderRadius: "50px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.24)",
    padding: "22px",
  };
  //Variant anim for results.
  const container = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 0.9,
      transition: {
        staggerChildren: 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
        restDelta: 0.001,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 0.9 },
  };

  const [grossWpm, setGrossWpm] = React.useState(0);
  const [netWpm, setNetWpm] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);

  React.useEffect(() => {
    //If game didn't ended do not return.
    if (props.gameState != "stopped") return;

    var keysPressed = props.lettersTyped;
    var wordsTyped = props.wordsTyped;
    var wrongLetters = props.wrongTypedLetters;
    var correctLetters = keysPressed - wrongLetters;
    console.log(keysPressed, wrongLetters, correctLetters);
    var timeLengthInMinute = props.timeLength / 60;
    var accuracy = Math.round((correctLetters / keysPressed) * 100);
    accuracy = accuracy < 0 ? 0 : accuracy;

    var grossWpm = Math.round(keysPressed / 5 / timeLengthInMinute);
    var netWpm = grossWpm - Math.round(wrongLetters / 5 / timeLengthInMinute);
    netWpm = netWpm < 0 ? 0 : netWpm;
    setGrossWpm(grossWpm);
    setNetWpm(netWpm);
    setAccuracy(accuracy);
  }, [props.gameState]);

  return (
    <Stack
      component={motion.div}
      initial="hidden"
      direction="row"
      animate="show"
      transition={{
        delay: 0.3,
      }}
      whileHover={{ scale: 0.95 }}
      variants={container}
      sx={{
        position: "absolute",
        marginBottom: "85px",
        columnGap: "20px",
        alignItems: "center",
        zIndex: 10,
        width: "100vw",
        overflow: "auto",
        padding: "20px",
      }}
    >
      <Box variants={item} component={motion.div} sx={{ ...boxSx, marginLeft: "auto" }}>
        <Typography sx={{ ...fontExo }}>NetWpm</Typography>
        <Typography sx={{ ...fontStyle }}>{netWpm}</Typography>
      </Box>
      <Box variants={item} component={motion.div} sx={{ ...boxSx }}>
        <Typography sx={{ ...fontExo }}>RawWpm</Typography>
        <Typography sx={{ ...fontStyle }}>{grossWpm}</Typography>
      </Box>
      <Box variants={item} component={motion.div} sx={{ ...boxSx, marginRight: "auto" }}>
        <Typography sx={{ ...fontExo }}>Accuracy</Typography>
        <Typography sx={{ ...fontStyle }}>{accuracy}%</Typography>
      </Box>
    </Stack>
  );
}
