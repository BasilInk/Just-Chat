import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { Context } from "../index";
import { signOut } from "firebase/auth";

export default function Navbar() {
  
  const { auth } = useContext(Context);

  const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#4F4D8C",
        }}
      >
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Just Chat
            </Typography>
            {user ? (
              <Button
                className="btnLink"
                onClick={() => signOut(auth)}
                variant="outlined"
                color="inherit"
              >
                Logout
              </Button>
            ) : (
              <NavLink to={LOGIN_ROUTE} className="btnLink">
                <Button variant="outlined" color="inherit">
                  Login
                </Button>
              </NavLink>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}




