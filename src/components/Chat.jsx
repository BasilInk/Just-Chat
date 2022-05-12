import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import { Context } from "../index";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import Loader from "./Loader";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: "3px",
}));

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [inputValue, setInputValue] = useState("");

  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(100));
  const [messages, loading] = useCollectionData(q, { idField: "id" });

  function handleValue(event) {
    setInputValue(event.target.value);
  }

  const sendMessage = async () => {
    addDoc(messagesRef, {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: inputValue,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setInputValue("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        style={{ height: window.innerHeight - 50 }}
        container
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          p={"80px"}
          sx={{
            width: "100%",
            height: "90%",
            backgroundColor: "#8F8EBF30",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Grid
            container
            justifyContent={"center"}
            direction={"column"}
            wrap={"wrap"}
          >
            {messages.map((message) => (
              <Stack

                spacing={2}
                key={(((1 + Math.random()) * 0x10000) | 0)
                  .toString(16)
                  .substring(1)}
              >
                <Item
                  style={{
                    width: "45%",
                    marginLeft: user.uid === message.uid ? "auto" : "inherit"
                  }}
                >
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    borderBottom={`1px solid #8F8EBF`}
                  >
                    <Avatar
                      src={message.photoURL}
                      sx={{
                        mr: "8px",
                        mb: "3px",
                      }}
                    />
                    <div className="messageTextName">{message.displayName}</div>
                  </Grid>
                  <div className="messageTextMain">{message.text}</div>
                </Item>
              </Stack>
            ))}
          </Grid>
        </Box>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          direction={"row"}
        >
          <TextField
            value={inputValue}
            onChange={(event) => handleValue(event)}
            variant={"outlined"}
            placeholder={"enter your message"}
            sx={{
              flex: "3 1 auto",
            }}
          />
          <Button
            onClick={() => sendMessage()}
            variant="outlined"
            sx={{
              border: "1px solid #4F4D8C",
              padding: "11px 15px",
              marginLeft: "10px",
              backgroundColor: "inherit",
              color: "#4F4D8C",
              flex: "1 1 auto",
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
