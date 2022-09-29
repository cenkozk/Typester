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
    opacity: "40%",
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
      <Box item id={`${letters.indexOf(element)}word`} sx={{ margin: "0px", height: "30px" }}>
        {reMappedLetters}
      </Box>
    );
  });

  const refScroll = React.useRef();
  const refInput = React.useRef();
  const refGrid = React.useRef();
  const refIndex = React.useRef();

  const indexOfIndex = React.useRef(0);
  const indexOfWord = React.useRef(0);
  const nextRow = React.useRef(0);
  const linesPassed = React.useRef(1);

  var currentWord = LettersToRender[0];
  var currentLetter = currentWord.props.children[indexOfIndex.current].props.children;

  React.useEffect(() => {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
  }, []);

  function moveToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    indexOfIndex.current = 0;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14.41 + "px"}`;
  }

  function scrollText() {
    refGrid.current.scrollBy({ top: 40, behavior: "smooth" });
  }

  function moveIndex() {
    indexOfIndex.current = indexOfIndex.current + 1;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14.41 + "px"}`;
    currentLetter = currentWord.props.children[indexOfIndex.current].props.children;
    console.log(currentLetter);
  }

  const rowCalculation = React.useRef(0);
  function calculateWordsInARow() {
    var tempWidth = refGrid.current.getBoundingClientRect().width;
    var WordsInARow = 0;
    var tempPixels = 0;
    for (let i = rowCalculation.current; i < LettersToRender.length; i++) {
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

      if (indexOfWord.current == nextRow.current - 1 + rowCalculation.current) {
        console.log("next row!");
        rowCalculation.current += calculateWordsInARow();
        console.log(rowCalculation.current);
        if (linesPassed.current == 2) {
          linesPassed.current = 2;
          scrollText();
        } else {
          linesPassed.current += 1;
        }
      }

      //Increment index and go to the next word.
      indexOfWord.current++;
      currentWord = LettersToRender[indexOfWord.current];
      moveToWord();
      refInput.current.value = "";
      return;
    }

    //If word ended handle it here.
    if (currentWord.props.children.length - 1 == indexOfIndex.current) {
      console.log("word ended");
      refIndex.current.style.marginLeft = `${(indexOfIndex.current + 1) * 14.41 + "px"}`;
      return;
    }

    nextRow.current = calculateWordsInARow();
    console.log(nextRow.current, rowCalculation.current);
    //Move index 1 increment.
    moveIndex();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <input ref={refInput} autoFocus type="text" style={{ opacity: "0%", height: "20px" }} onKeyDown={handleAnswerChange} />
      <Grid
        ref={refGrid}
        sx={{ position: "relative", width: "90%", maxWidth: "2000px", height: "113px", overflow: "auto", gap: "10px 14.41px" }}
        container
        className="text-container"
      >
        <div ref={refIndex} style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1" }} />
        {LettersToRender}
      </Grid>
    </div>
  );
}
