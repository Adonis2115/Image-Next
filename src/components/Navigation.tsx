import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import NewImageModal from "./NewImageModal";
import { useRouter } from "next/router";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  function goHome() {
    router.push("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={goHome}
          >
            Image-Resize
          </Typography>
          <Button color="inherit" onClick={handleOpen}>
            Add Image
          </Button>
          <NewImageModal open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
