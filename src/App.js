import { Box, Fade } from "@mui/material";
import React from "react";
import "./App.css";
import Header from "./components/Header";
import TextPart from "./components/TextPart";
import Timer from "./components/Timer";
function App() {
  const [timeLength, setTimeLength] = React.useState(30);
  const [time, setTime] = React.useState(0);

  /*React.useEffect(() => {
    for (let i = 0; i < timeLength; i++) {
      setTimeout(() => {
        setTime(i);
      }, i * 1000);
    }
  }, []);*/

  return (
    <div className="app">
      <Header />
      <Fade in={true}>
        <Box sx={{ width: "90%", maxWidth: "1300px" }}>
          <Timer time={time.toString()} />
          <TextPart />
        </Box>
      </Fade>
    </div>
  );
}

export default App;
