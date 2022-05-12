import { Box, Button, Container, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        className="loginContainer"
      >
        <Grid>
          <Box p={5}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "inherit",
                color: "#4F4D8C",
              }}
              onClick={login}
            >
              login with a google account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
