import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import React, { forwardRef, useImperativeHandle } from "react";
const randomWords = require("random-words");
const lerp = require("lerp");

function TextPart(props, ref) {
  const wordCount = React.useRef(100);
  const [lettersRandom, setLettersRandom] = React.useState(randomWords({ exactly: wordCount.current, maxLength: 5 }));
  const [renderPage, setRenderPage] = React.useState(true);

  const sourceCode = "'Source Code Pro', monospace";
  const Comfortaa = "'Comfortaa', cursive";
  //Single letter is 14px
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

  //Info about gama
  const [wordsTyped, setWordsTyped] = React.useState(0);
  const [wrongTypedLetters, setWrongTypedLetters] = React.useState([]);

  const writeArray = lettersRandom;
  const letters = React.useRef([]);
  const [LettersToRender, setLettersToRender] = React.useState([]);

  const refInput = React.useRef();
  const refGrid = React.useRef();
  const refIndexer = React.useRef();
  const refIndex = React.useRef();

  const indexOfIndex = React.useRef(0);
  const indexOfWord = React.useRef(0);
  const nextRow = React.useRef(0);
  const rowsPassed = React.useRef(0);
  const linesPassed = React.useRef(1);
  const isWordEnded = React.useRef(false);
  const currentWord = React.useRef();
  const currentLetter = React.useRef();

  //Generate array here.
  React.useEffect(() => {
    writeArray.forEach((element) => {
      var currentLetters = element.split("");
      letters.current.push(currentLetters);
    });

    //Shuffle array
    //letters.current = letters.current.sort((a, b) => 0.5 - Math.random());

    letters.current.forEach((element) => {
      var reMappedLetters = element.map((letter) => (
        <letter data-istrue="false" style={{ ...fontStyle }}>
          {letter.toLowerCase()}
        </letter>
      ));
      setLettersToRender((prevLetters) => [
        ...prevLetters,
        <Box item id={`${letters.current.indexOf(element)}word`} sx={{ margin: "0px", height: "30px" }}>
          {reMappedLetters}
        </Box>,
      ]);
    });
  }, [lettersRandom]);

  React.useEffect(() => {
    if (LettersToRender.length != wordCount.current) return;
    currentWord.current = LettersToRender[0];
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];
    nextRow.current = calculateWordsInARow();
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);

    //Focus to input if there's problem
    refInput.current.focus();
  }, [LettersToRender]);

  //Handle typed word count.
  React.useEffect(() => {
    props.handleWordTyped(wordsTyped);
  }, [wordsTyped]);

  const ifMoving = React.useRef(false);
  function moveIndexerAnim() {
    //Optimize move
    if (ifMoving.current == true) return;
    ifMoving.current = true;

    //Implement move index animaton here.
    update();
    var px = parseInt(refIndexer.current.style.marginLeft);
    var offset = refGrid.current.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    function update() {
      px = lerp(px, refIndex.current.getBoundingClientRect().left - offset, 0.2);
      refIndexer.current.style.marginLeft = `${px + "px"}`;
      if (refIndex.current.getBoundingClientRect().left - offset - 0.1 < px) {
        ifMoving.current = false;
        return;
      }
      requestAnimationFrame(update);
    }
  }

  const ifMovingBackwards = React.useRef(false);
  function moveIndexerAnimBackwards() {
    //Optimize move
    if (ifMovingBackwards.current == true) return;
    ifMovingBackwards.current = true;

    //Implement move index backwards animaton here.
    var px = parseInt(refIndexer.current.style.marginLeft);
    var offset = refGrid.current.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    update();
    function update() {
      px = lerp(px, refIndex.current.getBoundingClientRect().left - offset, 0.2);
      refIndexer.current.style.marginLeft = `${px + "px"}`;
      if (refIndex.current.getBoundingClientRect().left - offset + 0.1 > px) {
        ifMovingBackwards.current = false;
        return;
      }
      requestAnimationFrame(update);
    }
  }

  function moveIndexerNextRow() {
    //Implement move index animaton here.
    update();
    var px = parseInt(refIndexer.current.style.marginTop);
    function update() {
      px = lerp(px, rowsPassed.current * 40, 0.2);
      refIndexer.current.style.marginTop = `${px + "px"}`;
      if (rowsPassed.current * 40 - 0.1 < px) {
        ifMoving.current = false;
        return;
      }
      requestAnimationFrame(update);
    }
  }

  function moveToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    moveIndexerAnim();
    indexOfIndex.current = 0;
    isWordEnded.current = false;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];

    //Increase word typed
    setWordsTyped((prev) => prev + 1);
  }

  function returnToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    indexOfIndex.current = 0;
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];

    //Move indexer to last word and then we'll set indexOfIndex to last letter.
    var letterHTML = document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current + 1];
    var parentElementHTML = letterHTML.parentElement;
    // letterCountOnAWord has a index element so there is one more element.
    var letterCountOnAWord = parentElementHTML.childElementCount;
    indexOfIndex.current = letterCountOnAWord - 2;
    refIndex.current.style.marginLeft = `${(indexOfIndex.current + 1) * 14 + "px"}`;

    //Fill input
    var text = "";
    for (let i = 0; i < letterCountOnAWord; i++) {
      text += "t";
    }
    refInput.current.value = text + "t";
    //Make last pressed length of the word
    lastPressed.current = letterCountOnAWord + 1;

    //Move indexer backwards
    moveIndexerAnimBackwards();

    //Remove if there's underline
    for (let i = 1; i < letterCountOnAWord; i++) {
      parentElementHTML.children[i].style.textDecoration = "none";
    }

    //Decrease typed word count
    setWordsTyped((prev) => prev - 1);
  }

  function scrollText() {
    refGrid.current.scrollBy({ top: 40, behavior: "smooth" });
  }

  function moveIndex() {
    indexOfIndex.current = indexOfIndex.current + 1;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    //moveIndexAnim();
    moveIndexerAnim();
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];

    //Start the game if it's idle.
    if (props.gameState == "idle") {
      props.handleGameStart();
    }
  }

  function moveIndexBackwards() {
    indexOfIndex.current = isWordEnded.current ? indexOfIndex.current : indexOfIndex.current - 1;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    var wordEndedIndex = isWordEnded.current == true ? -1 : 0;
    moveIndexerAnimBackwards();
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];
  }

  function onInputLostFocus() {
    console.log("input focus lost");
    refInput.current.focus();
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

  const lastPressed = React.useRef(1);
  function handleAnswerChange(event) {
    //Don't accept input if game state stopped
    if (props.gameState == "stopped") return;
    //KeyPress for android
    var keyPressed = event.target.value.charAt(event.target.value.length - 1);
    keyPressed = lastPressed.current > event.target.value.length ? "<" : keyPressed;
    lastPressed.current = event.target.value.length;
    ////

    var letterHTML = document.getElementById(`${indexOfWord.current}word`).children[indexOfIndex.current + 1];
    var parentElementHTML = letterHTML.parentElement;
    // letterCountOnAWord has a index element so there is one more element.
    var letterCountOnAWord = parentElementHTML.childElementCount;

    if (keyPressed == " ") {
      //If no letter is written, don't accept the space input.
      if (refInput.current.value === "" || refInput.current.value === " " || refInput.current.value == "t ") {
        refInput.current.value = "t";
        return;
      }

      //Calculate the next row.
      nextRow.current = calculateWordsInARow();

      if (indexOfWord.current == nextRow.current - 1 + rowCalculation.current) {
        //Move indexer to next row and next word.
        rowsPassed.current++;
        moveIndexerNextRow();
        moveIndexBackwards();

        //Row calculation.
        rowCalculation.current += calculateWordsInARow();
        if (linesPassed.current == 2) {
          linesPassed.current = 2;
          scrollText();
        } else {
          linesPassed.current += 1;
        }
      }

      //If there's a error in a word underline letters.current.
      var tempFalses = 0;
      for (let i = 1; i < letterCountOnAWord; i++) {
        if (parentElementHTML.children[i].getAttribute("data-istrue") == "false") {
          tempFalses++;
        }
      }

      if (tempFalses == 0) {
      } else {
        for (let i = 1; i < letterCountOnAWord; i++) {
          parentElementHTML.children[i].style.textDecoration = "underline";
          parentElementHTML.children[i].style.textDecorationColor = "#d6646f";
        }
      }

      setWrongTypedLetters((prev) => prev + tempFalses);

      //Increment index and go to the next word.
      isWordEnded.current = true;
      indexOfWord.current++;
      currentWord.current = LettersToRender[indexOfWord.current];
      moveToWord();
      refInput.current.value = "t";
      lastPressed.current = 1;
      return;
    }

    if (keyPressed == "<") {
      //If we're on the first word return but go to the prevWord if it's not.
      if (indexOfIndex.current + 1 == 1) {
        if (indexOfWord.current == 0) return;

        indexOfWord.current--;
        currentWord.current = LettersToRender[indexOfWord.current];
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
    if (keyPressed === currentLetter.current.props.children.toLowerCase()) {
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
    if (currentWord.current.props.children.length - 1 == indexOfIndex.current) {
      isWordEnded.current = true;
      refIndex.current.style.marginLeft = `${(indexOfIndex.current + 1) * 14 + "px"}`;
      moveIndexerAnim();
      return;
    }
    //Move index 1 increment.
    moveIndex();
  }

  useImperativeHandle(ref, () => ({
    stopGame() {
      console.log("text part stopped(not yet).");
    },
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "100px" }}>
      <input ref={refInput} onBlur={onInputLostFocus} type="text" style={{ position: "absolute", top: "0%", opacity: "0%", height: "20px" }} onChange={handleAnswerChange} />
      <Grid ref={refGrid} sx={{ position: "relative", height: "113px", overflow: "auto", gap: "10px 14px" }} container className="text-container" alignItems="flex-start">
        <div ref={refIndexer} className="indexerVisual" style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1" }} />
        <div ref={refIndex} className="indexer" style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1", opacity: "0%" }} />
        {LettersToRender}
      </Grid>
    </div>
  );
}

export default forwardRef(TextPart);
