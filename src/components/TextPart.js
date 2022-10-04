import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import React from "react";
const randomWords = require("random-words");
const lerp = require("lerp");

export default function TextPart() {
  const sourceCode = "'Source Code Pro', monospace";
  const [lettersRandom, setLettersRandom] = React.useState(randomWords({ exactly: 50, minLength: 5 }));

  //single letter is 15px
  const fontStyle = {
    margin: "-0.18px",
    userSelect: "none",
    webkitUserSelect: "none",
    fontFamily: "Source Code Pro",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    color: "#FFFFFFA5",
    color: "#6e7779",
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

  const writeArray = lettersRandom;
  var letters = [];
  var LettersToRender = [];

  writeArray.forEach((element) => {
    var currentLetters = element.split("");
    letters.push(currentLetters);
  });

  //Shuffle array
  //letters = letters.sort((a, b) => 0.5 - Math.random());

  letters.forEach((element) => {
    var reMappedLetters = element.map((letter) => (
      <letter data-istrue="false" style={{ ...fontStyle }}>
        {letter.toLowerCase()}
      </letter>
    ));
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
  const isWordEnded = React.useRef(false);

  var currentWord = LettersToRender[0];
  var currentLetter = currentWord.props.children[indexOfIndex.current];

  var lastInputForAndroid = "";

  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }

  React.useEffect(() => {
    nextRow.current = calculateWordsInARow();
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
  }, []);

  function moveIndexAnim() {
    //Implement move index animaton here.
    update();
    var px = parseInt(refIndex.current.style.marginLeft);
    function update() {
      if (isWordEnded.current == true) return;
      px = lerp(px, indexOfIndex.current * 14, 0.2);
      refIndex.current.style.marginLeft = `${px + "px"}`;
      if (indexOfIndex.current * 14 - 0.1 < px) {
        return;
      }
      requestAnimationFrame(update);
    }
  }

  function moveIndexAnimBackwards() {
    //Implement move index backwards animaton here.
    var px = parseInt(refIndex.current.style.marginLeft);
    update();
    function update() {
      px = lerp(px, indexOfIndex.current * 14, 0.2);
      refIndex.current.style.marginLeft = `${px + "px"}`;
      if (indexOfIndex.current * 14 + 0.1 > px) {
        return;
      }
      requestAnimationFrame(update);
    }
  }

  function moveToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    indexOfIndex.current = 0;
    isWordEnded.current = false;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    currentLetter = currentWord.props.children[indexOfIndex.current];
  }

  function returnToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    indexOfIndex.current = 0;
    currentLetter = currentWord.props.children[indexOfIndex.current];

    //Move indexer to last word and then we'll set indexOfIndex to last letter.
    var letterHTML = document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current + 1];
    var parentElementHTML = letterHTML.parentElement;
    // letterCountOnAWord has a index element so there is one more element.
    var letterCountOnAWord = parentElementHTML.childElementCount;
    indexOfIndex.current = letterCountOnAWord - 2;
    refIndex.current.style.marginLeft = `${(indexOfIndex.current + 1) * 14 + "px"}`;

    //Remove if there's underline
    for (let i = 1; i < letterCountOnAWord; i++) {
      parentElementHTML.children[i].style.textDecoration = "none";
    }
  }

  function scrollText() {
    refGrid.current.scrollBy({ top: 40, behavior: "smooth" });
  }

  function moveIndex() {
    indexOfIndex.current = indexOfIndex.current + 1;
    //refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    moveIndexAnim();
    currentLetter = currentWord.props.children[indexOfIndex.current];
  }

  function moveIndexBackwards() {
    indexOfIndex.current = isWordEnded.current ? indexOfIndex.current : indexOfIndex.current - 1;
    //refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    var wordEndedIndex = isWordEnded.current == true ? -1 : 0;
    moveIndexAnimBackwards();
    currentLetter = currentWord.props.children[indexOfIndex.current];
  }

  const rowCalculation = React.useRef(0);
  function calculateWordsInARow() {
    var tempWidth = refGrid.current.getBoundingClientRect().width;
    var WordsInARow = 0;
    var tempPixels = 0;
    var tempLetters = 0;
    for (let i = rowCalculation.current; i < LettersToRender.length; i++) {
      tempLetters += LettersToRender[i].props.children.length + 1;
      tempPixels = tempLetters * 14;
      if (tempPixels < tempWidth) {
        WordsInARow++;
      } else {
        if (tempPixels - 14 < tempWidth) {
          WordsInARow++;
        }
        return WordsInARow;
      }
    }
  }

  function handleAnswerChange(event) {
    var letterHTML = document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current + 1];
    var parentElementHTML = letterHTML.parentElement;
    // letterCountOnAWord has a index element so there is one more element.
    var letterCountOnAWord = parentElementHTML.childElementCount;

    if (event.code == "Space") {
      //If no letter is written, don't accept the space input.
      if (refInput.current.value === "" || refInput.current.value === " ") {
        refInput.current.value = "";
        return;
      }

      //Calculate the next row.
      nextRow.current = calculateWordsInARow();
      console.log(nextRow.current);

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

      //If there's a error in a word underline letters.
      var tempTrues = 0;
      for (let i = 1; i < letterCountOnAWord; i++) {
        if (parentElementHTML.children[i].getAttribute("data-istrue") == "true") {
          tempTrues++;
        }
      }

      if (tempTrues == letterCountOnAWord - 1) {
        console.log("word true");
      } else {
        for (let i = 1; i < letterCountOnAWord; i++) {
          parentElementHTML.children[i].style.textDecoration = "underline";
          parentElementHTML.children[i].style.textDecorationColor = "#d6646f";
        }
      }

      //Increment index and go to the next word.
      isWordEnded.current = true;
      indexOfWord.current++;
      currentWord = LettersToRender[indexOfWord.current];
      moveToWord();
      refInput.current.value = "";
      return;
    }

    if (event.code == "Backspace") {
      //If we're on the first word return but go to the prevWord if it's not.
      if (indexOfIndex.current + 1 == 1) {
        if (indexOfWord.current == 0) return;

        indexOfWord.current--;
        currentWord = LettersToRender[indexOfWord.current];
        //Becuase we're on the last letter make wordEnded true.
        isWordEnded.current = true;
        returnToWord();
        return;
      }

      //Clear the prev letter's styling and value.
      var prevLetter = isWordEnded.current
        ? document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current + 1]
        : document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current];
      prevLetter.style.color = "#6e7779";
      prevLetter.setAttribute("data-istrue", "false");
      moveIndexBackwards();
      isWordEnded.current = isWordEnded.current == true ? false : isWordEnded.current;
      return;
    }
    //Handle wrong and true key hit.
    if (event.key === currentLetter.props.children.toLowerCase()) {
      //If word ended return
      if (isWordEnded.current == true) return;

      letterHTML.style.color = "#FFFFFFA5";
      letterHTML.setAttribute("data-istrue", "true");
    } else {
      //If word ended return
      if (isWordEnded.current == true) return;
      letterHTML.style.color = "#d6646f";
    }

    //If word ended handle it here.
    if (currentWord.props.children.length - 1 == indexOfIndex.current) {
      console.log("word ended");
      isWordEnded.current = true;
      var px = parseInt(refIndex.current.style.marginLeft);
      update();
      function update() {
        if (isWordEnded.current == false) return;
        px = lerp(px, (indexOfIndex.current + 1) * 14, 0.3);
        refIndex.current.style.marginLeft = `${px + "px"}`;
        if ((indexOfIndex.current + 1) * 14 - 0.1 < px) {
          return;
        }
        requestAnimationFrame(update);
      }
      return;
    }
    //Move index 1 increment.
    moveIndex();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "100px" }}>
      <input ref={refInput} autoFocus type="text" style={{ position: "absolute", top: "0%", opacity: "0%", height: "20px" }} onKeyDown={handleAnswerChange} />
      <Grid ref={refGrid} sx={{ position: "relative", height: "113px", overflow: "auto", gap: "10px 14px" }} container className="text-container" alignItems="flex-start">
        <div ref={refIndex} className="indexer" style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1" }} />
        {LettersToRender}
      </Grid>
    </div>
  );
}
