import { Box, Fade } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import "./App.css";
import Header from "./components/Header";
import TextPart from "./components/TextPart";
import TextPartSettings from "./components/TextPartSettings";
import Shortcuts from "./components/Shortcuts";
import Timer from "./components/Timer";
import TimerModule from "tiny-timer";

function App() {
  //Anim bools
  const [isAnimOpen, setIsAnimOpen] = React.useState(true);

  const [timeLength, setTimeLength] = React.useState(35);
  const [timeModule, setTimeModule] = React.useState(new TimerModule({ stopwatch: true }));
  const [time, setTime] = React.useState(0);
  const [gameState, setGameState] = React.useState("idle");
  const [wordTyped, setWordTyped] = React.useState(0);
  const [lettersTyped, setLettersTyped] = React.useState(0);

  //Game ref
  const gameRef = React.useRef(null);

  //Count time.
  React.useEffect(() => {
    //On end time.
    timeModule.on("done", () => {
      stopTheGame();
    });

    if (gameState == "started") {
      timeModule.start(timeLength * 1000); // run for 5 seconds
      return;
    }
    if (gameState == "stopped") {
      timeModule.stop(); // stop the timer
      console.log("Typed word count: " + wordTyped);
      return;
    }

    //Set time.
    timeModule.on("tick", (ms) => setTime(parseInt(Math.floor(timeModule.time) / 1000)));
  }, [gameState]);

  //Handle game start.
  function startTheGame() {
    if (gameState == "started") return;
    setGameState("started");
    console.log("start");
    setIsAnimOpen(false);
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

  //Handle game stop.
  function stopTheGame() {
    if (gameState == "stopped") return;
    setTime(timeLength);
    setGameState("stopped");
    setIsAnimOpen(true);
  }

  //Handle game idle.
  function idleTheGame() {
    setGameState("idle");
    setTime(0);
    setIsAnimOpen(true);
    timeModule.stop();
  }

  function openAnimsRemotely(bool) {
    setIsAnimOpen(bool);
  }

  //Handle typed words.
  function setWordTypedFunc(count) {
    setWordTyped(count);
  }

  //Handle typed letters.
  function setLettersTypedFunc(count) {
    setLettersTyped(count);
    console.log(count);
  }

  function changeTimeFunc(time) {
    setTimeLength(time);
    //Restart game
    console.log("restart");
    setTime(0);
    gameRef.current.restartGame();
  }

  return (
    <div className="app">
      <Header isHeaderOpen={isAnimOpen} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "15vh" }}>
        <TextPartSettings changeTime={(time) => changeTimeFunc(time)} isAnimOpen={isAnimOpen} />
        <Box
          component={motion.div}
          animate={{
            scale: [0.95, 1],
            opacity: ["0%", "100%"],
          }}
          sx={{ width: "90%", maxWidth: "1200px" }}
        >
          <Timer key={time} time={time} />
          <TextPart
            ref={gameRef}
            handleGameStart={startTheGame}
            isAnimOpen={isAnimOpen}
            openAnimsRemotely={openAnimsRemotely}
            gameState={gameState}
            handleWordTyped={setWordTypedFunc}
            handleLettersTyped={setLettersTypedFunc}
            timeModule={timeModule}
            idleTheGame={idleTheGame}
          />
          <Shortcuts />
        </Box>
      </Box>
    </div>
  );
}

export default App;
