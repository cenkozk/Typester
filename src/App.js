import { Box, Fade } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import "./App.css";
import Header from "./components/Header";
import TextPart from "./components/TextPart";
import TextPartSettings from "./components/TextPartSettings";
import Timer from "./components/Timer";
import TimerModule from "tiny-timer";

function App() {
  const [timeLength, setTimeLength] = React.useState(35);
  const [timeModule, setTimeModule] = React.useState(new TimerModule({ stopwatch: true }));
  const [time, setTime] = React.useState(0);
  const [gameState, setGameState] = React.useState("idle");
  const [wordTyped, setWordTyped] = React.useState(0);

  //Game ref
  const gameRef = React.useRef(null);

  //Count time.
  React.useEffect(() => {
    timeModule.on("tick", (ms) => setTime(parseInt(Math.floor(timeModule.time) / 1000)));
    timeModule.on("done", () => console.log("done!"));
    timeModule.on("statusChanged", (status) => console.log("status:", status));

    if (gameState == "started") {
      timeModule.start(timeLength * 1000); // run for 5 seconds
    }
  }, [gameState]);

  //End time.
  React.useEffect(() => {
    if (time != timeLength) return;
    console.log("time ended!", wordTyped);
    setGameState("stopped");
    gameRef.current.stopGame();
  }, [time]);

  //Handle game start.
  function startTheGame() {
    if (gameState == "started") return;
    setGameState("started");
    console.log("start");
  }

  //Handle game pause.
  function pauseTheGame() {
    if (gameState == "paused") return;
    setGameState("paused");
  }

  //Handle game resume.
  function resumeTheGame() {
    if (gameState == "started") return;
    setGameState("started");
  }

  //Handle typed words.
  function setWordTypedFunc(count) {
    setWordTyped(count);
  }

  return (
    <div className="app">
      <Header />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "15vh" }}>
        <TextPartSettings />
        <Box
          component={motion.div}
          animate={{
            scale: [0.95, 1],
            opacity: ["0%", "100%"],
          }}
          sx={{ width: "90%", maxWidth: "1200px" }}
        >
          <Timer key={time} time={time.toString()} />
          <TextPart ref={gameRef} handleGameStart={startTheGame} gameState={gameState} handleWordTyped={setWordTypedFunc} timeModule={timeModule} />
        </Box>
      </Box>
    </div>
  );
}

export default App;
