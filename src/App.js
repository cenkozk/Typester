import { Box, Fade } from "@mui/material";
import React from "react";
import "./App.css";
import Header from "./components/Header";
import TextPart from "./components/TextPart";
import Timer from "./components/Timer";
function App() {
  const [timeLength, setTimeLength] = React.useState(20);
  const [time, setTime] = React.useState(0);
  const [gameState, setGameState] = React.useState("idle");
  const [wordTyped, setWordTyped] = React.useState(0);

  //Game ref
  const gameRef = React.useRef(null);

  //Count time.
  React.useEffect(() => {
    if (gameState == "started") {
      for (let i = 1; i < timeLength + 1; i++) {
        setTimeout(() => {
          setTime(i);
        }, i * 1000);
      }
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

  //Handle typed words.
  function setWordTypedFunc(count) {
    setWordTyped(count);
  }

  return (
    <div className="app">
      <Header />
      <Fade in={true}>
        <Box sx={{ width: "90%", maxWidth: "1300px" }}>
          <Timer time={time.toString()} />
          <TextPart ref={gameRef} handleGameStart={startTheGame} gameState={gameState} handleWordTyped={setWordTypedFunc} />
        </Box>
      </Fade>
    </div>
  );
}

export default App;
