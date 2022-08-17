import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Drawer, IconButton, Menu } from "@mui/material";
import Cookies from "universal-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ListM, { Title } from "./ListNavBar";

function NavBar() {
  const cookies = new Cookies();
  const [open, setOpen] = useState(false);
  const local = async () => {
    return await window.local.pathname;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    cookies.remove("id");
    window.location.href = "./";
  };

  return (
    <Box sx={{ flexGrow: 1, mb:3 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            <Title />

            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
              <ListM />
            </Drawer>
          </Typography>

          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={logout}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
