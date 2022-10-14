import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import { motion } from "framer-motion";
import FocusIcon from "@mui/icons-material/PanToolAlt";
import RestartIcon from "@mui/icons-material/Autorenew";
import React, { forwardRef, useImperativeHandle } from "react";
const randomWords = require("random-words");
const lerp = require("lerp");

function TextPart(props, ref) {
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

  //Info about game
  const wordCount = React.useRef(100);
  const lastWordIndex = React.useRef(wordCount.current);
  const [lettersRandom, setLettersRandom] = React.useState(randomWords({ exactly: wordCount.current, maxLength: 5 }));
  const [lastWordToAdd, setLastWordToAdd] = React.useState();
  const [wordsTyped, setWordsTyped] = React.useState(0);
  const [lettersTyped, setLettersTyped] = React.useState(0);
  const [wrongTypedLetters, setWrongTypedLetters] = React.useState([]);

  const letters = React.useRef([]);
  const [LettersToRender, setLettersToRender] = React.useState([]);

  const refInput = React.useRef();
  const refGrid = React.useRef();
  const refIndexer = React.useRef();
  const refIndex = React.useRef();

  const indexOfIndex = React.useRef(0);
  const [offsetIndex, setOffsetIndex] = React.useState(0);
  const indexOfWord = React.useRef(0);
  const nextRow = React.useRef(0);
  const rowsPassed = React.useRef(0);
  const linesPassed = React.useRef(1);
  const currentWord = React.useRef(null);
  const currentLetter = React.useRef(null);

  const isWordEnded = React.useRef(false);
  const isPrevWordAllowed = React.useRef(false);
  const [isFocused, setIsFocused] = React.useState(true);

  //Generate array here.
  React.useEffect(() => {
    //Empty the arrays.
    letters.current = [];

    lettersRandom.forEach((element) => {
      var currentLetters = element.split("");
      letters.current.push(currentLetters);
    });

    letters.current.forEach((element) => {
      var reMappedLetters = element.map((letter) => (
        <letter data-istrue="false" style={{ ...fontStyle }}>
          {letter.toLowerCase()}
        </letter>
      ));

      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      };

      setLettersToRender((prevLetters) => [
        ...prevLetters,
        <Box item variants={item} component={motion.div} id={`${letters.current.indexOf(element)}word`} sx={{ margin: "0px", height: "30px" }}>
          {reMappedLetters}
        </Box>,
      ]);
    });
  }, [lettersRandom]);

  React.useEffect(() => {
    if (LettersToRender.length != wordCount.current) {
      console.log("return");
      return;
    }
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

  //Handle typed letter count.
  React.useEffect(() => {
    props.handleLettersTyped(lettersTyped);
  }, [lettersTyped]);

  function moveIndexerAnim() {
    if (!isFocused) setIsFocused(true);
    setOffsetIndex(refIndex.current.getBoundingClientRect().left - (refGrid.current.getBoundingClientRect().left - document.body.getBoundingClientRect().left));
  }

  function moveToWord() {
    document.getElementById(`${indexOfWord.current}word`).prepend(refIndex.current);
    indexOfIndex.current = 0;
    isWordEnded.current = false;
    refIndex.current.style.marginLeft = `${indexOfIndex.current * 14 + "px"}`;
    moveIndexerAnim();
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];

    //addAWordEndOfTheArrayAfterMove(); ----BUGGY AS FUCK....
    //Increase word typed
    setWordsTyped((prev) => prev + 1);
  }

  function addAWordEndOfTheArrayAfterMove() {
    var word = randomWords({ exactly: 1, maxLength: 5 });
    word = word[0];
    var currentLetters = word.split("");
    var reMappedLetters = [];
    currentLetters.forEach((element) => {
      reMappedLetters.push(
        <letter data-istrue="false" style={{ ...fontStyle }}>
          {element.toLowerCase()}
        </letter>
      );
    });
    setLettersToRender((prev) => [
      ...prev,
      <Box item id={`${lastWordIndex.current}word`} sx={{ margin: "0px", height: "30px" }}>
        {reMappedLetters}
      </Box>,
    ]);
    lastWordIndex.current = lastWordIndex.current + 1;
    console.log(indexOfWord.current);
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
    moveIndexerAnim();

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
    moveIndexerAnim();
    currentLetter.current = currentWord.current.props.children[indexOfIndex.current];
  }

  function onInputLostFocus() {
    console.log("input focus lost");

    //Pause the current timer.
    props.timeModule.pause();
    props.openAnimsRemotely(true);
    setIsFocused(false);
  }

  function onInputFocus(shouldOpenAnim) {
    var animBool = typeof shouldOpenAnim == Boolean ? true : props.isAnimOpen;
    console.log("input focus");
    refInput.current.focus();
    //Resume the current timer.
    props.timeModule.resume();
    props.openAnimsRemotely(animBool);
    setIsFocused(true);
  }

  function onGameTextPartRestart() {
    setOffsetIndex(0);
    setWordsTyped(0);
    setLettersRandom(randomWords({ exactly: wordCount.current, maxLength: 5 }));
    setLettersToRender([]);
    indexOfIndex.current = 0;
    indexOfWord.current = 0;
    nextRow.current = 0;
    rowsPassed.current = 0;
    rowCalculation.current = 0;
    linesPassed.current = 1;
    currentWord.current = null;
    currentLetter.current = null;
    lastPressed.current = 1;
    isWordEnded.current = false;
    //Clear the input
    refInput.current.value = "";
    //Focus if there's problem.
    props.idleTheGame();
    onInputFocus(true);
    props.openAnimsRemotely(true);
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
      setLettersTyped((prev) => prev++);
      return;
    }

    if (keyPressed == "<") {
      //If we're on the first word return but go to the prevWord if it's not.
      if (indexOfIndex.current + 1 == 1) {
        //Disable if prevWord isn't allowed.
        if (indexOfWord.current == 0 || !isPrevWordAllowed.current) return;

        indexOfWord.current--;
        currentWord.current = LettersToRender[indexOfWord.current];
        //Becuase we're on the last letter make wordEnded true.
        isWordEnded.current = true;
        returnToWord();
        setLettersTyped((prev) => prev++);
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
    setLettersTyped((prev) => prev++);
    moveIndex();
  }

  useImperativeHandle(ref, () => ({
    restartGame() {
      onGameTextPartRestart();
    },
  }));

  //Variant anim for words.
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      filter: isFocused ? "blur(0px)" : "blur(5px)",
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  return (
    <div
      onClick={onInputFocus}
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "100px",
        height: "113px",
      }}
    >
      {!isFocused && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 5,
            width: "90%",
            maxWidth: "1200px",
            height: "100px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FocusIcon sx={{ color: "#B0C4B1" }} />
          <Typography sx={{ ...fontStyle, color: "#B0C4B1", fontSize: "18px" }}>Click here to focus.</Typography>
        </Box>
      )}
      <input ref={refInput} onBlur={onInputLostFocus} type="text" style={{ position: "absolute", top: "0%", opacity: "0%", height: "20px" }} onChange={handleAnswerChange} />
      <Grid
        key={LettersToRender}
        component={motion.div}
        initial="hidden"
        animate={"show"}
        transition={{
          delay: 0.5,
        }}
        variants={container}
        ref={refGrid}
        sx={{
          position: "relative",
          height: "auto",
          overflow: "auto",
          gap: "10px 14px",
          margin: "0px",
          justifyContent: "flex-start",
          padding: "0px",
        }}
        container
        className="text-container"
        alignItems="flex-start"
      >
        <div ref={refIndex} className="indexer" style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1", opacity: "0%" }} />
        <motion.div
          ref={refIndexer}
          animate={{ x: offsetIndex, y: rowsPassed.current * 40 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="indexerVisual"
          style={{ margin: "0px", width: "2px", height: "30px", position: "absolute", backgroundColor: "#B0C4B1" }}
        />
        {LettersToRender}
      </Grid>
      <IconButton
        onClick={onGameTextPartRestart}
        component={motion.div}
        initial={{ scale: 0, rotate: 180 }}
        animate={{
          scale: [null, 1],
          rotate: 0,
        }}
        transition={{
          type: "spring",
          damping: 7,
          stiffness: 100,
          restDelta: 0.001,
          duration: 0.5,
        }}
        whileFocus={{ scale: 1.2, rotate: 90 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 1.4, rotate: 270 }}
        sx={{
          position: "absolute",
          height: "50px",
          width: "50px",
          borderRadius: "1000px",
          bottom: "-100px",
          color: "#B0C4B1",
          zIndex: 5,
          "&:hover": { background: "rgba(176, 196, 177, 0.1)" },
        }}
        variant="text"
      >
        <RestartIcon />
      </IconButton>
      <Box sx={{ position: "absolute", opacity: "100%" }}>{lastWordToAdd}</Box>
    </div>
  );
}

export default forwardRef(TextPart);
