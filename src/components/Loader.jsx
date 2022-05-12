import { Box, Container, Grid } from "@mui/material";

export default function Loader() {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        className="loginContainer"
      >
        <Grid>
          <Box p={5}>
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
