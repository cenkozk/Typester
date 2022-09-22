import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function TextPart() {
  const sourceCode = "'Source Code Pro', monospace";
  const fontStyle = {
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

  const writeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque molestie vulputate. Vestibulum ullamcorper magna vel tincidunt consequat.";
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

  function scrollText() {
    refScroll.current.scrollBy({ top: 300, behavior: "smooth" });
    console.log(refScroll.current);
  }

  return (
    <Box>
      <Stack direction="column" sx={{ maxWidth: "1000px", width: "80vw", overflowY: "scroll", maxHeight: "102px", scrollbarWidth: "0px" }}>
        <Stack className="textInfo"></Stack>
        <Grid container ref={refScroll} spacing={1}>
          {LettersToRender}
        </Grid>
      </Stack>
      <Button onClick={scrollText} variant="outlined">
        Click to scroll!
      </Button>
    </Box>
  );
}
