import { Box } from "@mui/system";
import React from "react";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Dialog, IconButton, Stack, Typography, DialogActions, Button, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function Header() {
  const exo2 = "'Exo 2', sans-serif";
  const fontExo = {
    fontFamily: exo2,
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: "22px",
    color: "#4A5759",
    display: "flex",
    alignItems: "center",
    WebkitUserSelect: "none",
  };

  const sourceCode = "'Source Code Pro', monospace";
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
  var link = <a href={"https://github.com/emirhanozk/Typester"}>GitHub link.</a>;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function openDialog() {}

  return (
    <Stack
      justifyContent={"space-between"}
      direction="row"
      sx={{
        position: "fixed",
        top: "0%",
        minWidth: "300px",
        width: "60vw",
        height: "70px",
        background: "#B0C4B1",
        boxShadow: "0px 10px 25px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "0px 0px 30px 30px}",
      }}
    >
      <Box
        className="leftPart"
        sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "15px", width: "140px", marginLeft: "30px", height: "45px" }}
      >
        <KeyboardIcon sx={{ color: "#4A5759", width: "45px", height: "45px" }} />
        <Typography sx={fontExo}>Typester</Typography>
      </Box>
      <Stack direction="row" spacing={2} className="rightPart" sx={{ marginRight: "30px", alignItems: "center", marginTop: "5px" }}>
        <IconButton onClick={handleClickOpen} sx={{ width: "35px", height: "35px" }}>
          <InfoIcon sx={{ width: "30px", height: "30px", color: "#4A5759" }} />
        </IconButton>
      </Stack>

      <Dialog PaperProps={{ style: { borderRadius: "20px", backgroundColor: "#B0C4B1" } }} sx={{ backdropFilter: "blur(8px)" }} open={open} onClose={handleClose}>
        <DialogTitle sx={{ ...fontStyle, color: "black", fontWeight: "800", fontSize: "24px" }}>{"Info.."}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...fontStyle, fontWeight: "500", fontSize: "18px" }}>Typester, a monkeytype alike typing app. {link}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ ...fontStyle, fontWeight: "500", fontSize: "18px", color: "black", marginRight: "10px" }} autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
