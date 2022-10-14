import { Box } from "@mui/system";
import React from "react";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Dialog, IconButton, Stack, Typography, DialogActions, Button, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

export default function Header(props) {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var link = <a href={"https://github.com/emirhanozk/Typester"}>GitHub link.</a>;
  var isHeaderOpenStatus = props.isHeaderOpen;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Stack
        justifyContent={"space-between"}
        direction="row"
        sx={{
          position: "sticky",
          minWidth: "300px",
          width: "60vw",
          height: "100px",
          background: "#B0C4B1",
          boxShadow: "0px 10px 25px 10px rgba(0, 0, 0, 0.25)",
          borderRadius: "0px 0px 30px 30px}",
        }}
        component={motion.div}
        initial={{ y: "-100%" }}
        animate={
          isHeaderOpenStatus
            ? {
                y: "-30%",
              }
            : {
                y: "-120%",
              }
        }
        transition={{
          type: "spring",
          damping: 8,
          stiffness: 100,
          restDelta: 0.001,
          duration: 0.3,
          delay: !isHeaderOpenStatus ? 0 : 0.2,
          bounce: 0.25,
        }}
      >
        <Box
          className="leftPart"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
            duration: 0.3,
          }}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "45px", width: "140px", marginLeft: "30px", height: "45px" }}
        >
          <KeyboardIcon sx={{ color: "#4A5759", width: "45px", height: "45px" }} />
          <Typography sx={fontExo}>Typester</Typography>
        </Box>
        <Stack direction="row" spacing={2} className="rightPart" sx={{ marginRight: "30px", alignItems: "center", marginTop: "35px" }}>
          <IconButton onClick={handleClickOpen} component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} sx={{ width: "35px", height: "35px" }}>
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
    </Box>
  );
}
