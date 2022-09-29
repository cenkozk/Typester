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
    var reMappedLetters = element.map((letter) => <letter style={{ ...fontStyle }}>{letter}</letter>);
    LettersToRender.push(
      <Box item sx={{ margin: "0px", height: "30px" }}>
        {reMappedLetters}
      </Box>
    );
  });

  const refScroll = React.useRef();
  const refInput = React.useRef();
  const refGrid = React.useRef();
  const refIndex = React.useRef();

  const indexOfIndex = React.useRef(14.41);
  var indexOfWord = 0;
  var indexOfWordInARow = 0;
  var currentWord = LettersToRender[0];

  function scrollText() {
    //refScroll.current.scrollBy({ top: 38, behavior: "smooth" });
    indexOfIndex.current = indexOfIndex.current + 14.41;
    document.getElementById("indexer").style.marginLeft = `${indexOfIndex.current + "px"}`;
  }

  function calculateWordsInARow() {
    var tempWidth = refGrid.current.getBoundingClientRect().width;
    var WordsInARow = 0;
    var tempPixels = 0;
    for (let i = 0; i < LettersToRender.length; i++) {
      tempPixels += LettersToRender[i].props.children.length * 14.41 + 14.41;
      if (tempPixels < tempWidth) {
        WordsInARow++;
      } else {
        if (tempPixels - 14.41 < tempWidth) {
          WordsInARow++;
        }
        return WordsInARow;
      }
    }
  }

  function handleAnswerChange(event) {
    if (event.key === " ") {
      //If not any letter is written, don't accept the space input.
      if (refInput.current.value === "" || refInput.current.value === " ") {
        refInput.current.value = "";
        return;
      }

      console.log(calculateWordsInARow());

      //Increment index and go to the next word.
      indexOfWord++;
      indexOfWordInARow++;
      currentWord = LettersToRender[indexOfWord];
      refInput.current.value = "";
    }

    console.log(refIndex.current, currentWord);
    //scrollText();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div ref={refIndex} style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1" }} />
      <input ref={refInput} autoFocus type="text" style={{ opacity: "100%", height: "20px" }} onKeyPress={handleAnswerChange} />
      <Grid ref={refGrid} sx={{ width: "90%", maxWidth: "2000px", height: "113px", overflow: "auto", gap: "10px 14.41px" }} container className="text-container">
        {LettersToRender}
      </Grid>
    </div>
  );
}
