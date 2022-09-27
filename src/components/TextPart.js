import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import React from "react";

export default function TextPart() {
  const sourceCode = "'Source Code Pro', monospace";

  //single letter is 15px
  const fontStyle = {
    margin: "0px",
    userSelect: "none",
    webkitUserSelect: "none",
    opacity: "75%",
    fontFamily: "Source Code Pro",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "30px",
    color: "rgba(255, 255, 255, 0.65)",
  };

  const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
  
`;

  const indexOfIndex = React.useRef(14.5);
  const writeText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Id semper risus in hendrerit gravida. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Interdum velit laoreet id donec ultrices tincidunt arcu non. Amet porttitor eget dolor morbi non arcu. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Aliquet enim tortor at auctor urna nunc id cursus. Integer eget aliquet nibh praesent tristique magna. Pellentesque dignissim enim sit amet. Quisque non tellus orci ac auctor. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Viverra nam libero justo laoreet. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Ac tincidunt vitae semper quis lectus nulla at volutpat. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Tellus cras adipiscing enim eu turpis. Vitae congue eu consequat ac felis donec et. In iaculis nunc sed augue lacus viverra. Nibh mauris cursus mattis molestie a. Mauris cursus mattis molestie a iaculis at. Sollicitudin aliquam ultrices sagittis orci. Porttitor eget dolor morbi non arcu risus quis. Gravida cum sociis natoque penatibus et magnis dis. Eget nullam non nisi est sit amet facilisis magna.";
  const writeArray = writeText.split(" ");
  var letters = [];
  var LettersToRender = [];

  writeArray.forEach((element) => {
    var currentLetters = element.split("");
    letters.push(currentLetters);
  });

  letters.forEach((element) => {
    var reMappedLetters = element.map((letter) => <Typography sx={{ ...fontStyle }}>{letter}</Typography>);
    LettersToRender.push(
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        {reMappedLetters}
      </Grid>
    );
  });

  const refScroll = React.useRef();
  const refInput = React.useRef();

  function scrollText() {
    //refScroll.current.scrollBy({ top: 38, behavior: "smooth" });
    indexOfIndex.current = indexOfIndex.current + 14.5;
    document.getElementById("indexer").style.marginLeft = `${indexOfIndex.current + "px"}`;
  }

  function handleAnswerChange(event) {
    /*if (event.key === "y") {
      alert("The sky is your starting point!");
    */
    scrollText();
  }

  return (
    <Box sx={{ scale: "1" }}>
      <Stack direction="column" ref={refScroll} sx={{ maxWidth: "1000px", width: "85vw", overflowY: "hidden", maxHeight: "104px", scrollbarWidth: "0px" }}>
        <Stack className="textInfo"></Stack>
        <input ref={refInput} autoFocus type="text" style={{ opacity: "0%" }} onKeyPress={handleAnswerChange} />
        <Grid container spacing={1.8}>
          <div
            id="indexer"
            style={{
              width: "2px",
              height: "30px",
              backgroundColor: "#B0C4B1",
              position: "absolute",
              marginTop: "14px",
              marginLeft: `14.5px`,
              animation: `${blink} 1s infinite ease`,
            }}
          />
          {LettersToRender}
        </Grid>
      </Stack>
      <Button sx={{ marginTop: "50px" }} onClick={scrollText} variant="outlined">
        Click to scroll!
      </Button>
    </Box>
  );
}
