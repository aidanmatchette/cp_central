import { useAxios } from "../utils/useAxios";
import { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme.js";

export default function Forum() {
  const backend = useAxios();
  const [forums, setForums] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    backend.get("/api/v1/forum").then((res) => {
      // console.log({res})
      setForums(res.data);
    });
  }, []);
  let codeImage =
    "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const ForumListItem = ({ forum }) => {
    const doNavigate = (e) => {
      e.preventDefault();
      navigate(`/forumTopic/${forum.id}`);
    };

    return (
      <ListItemButton
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          display: "inline-block",
          // border: "1px solid rgba(191, 191, 191, 0.29)",
          borderRadius: 3,
          textAlign: "center",
          width: "50%",
          margin: "auto",
          color: "white",
          mt: 1,
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.99)",
            transition: "background 1s, color 1s",
          },
        }}
        onClick={doNavigate}
      >
        <ListItemText>{forum.name}</ListItemText>
      </ListItemButton>
    );
  };

  return (
    <Container>
      <Box
        sx={{
          backgroundImage: `url(${codeImage})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: 700, color: "rgba(0, 0, 0, 0.85)" }}
          component="h1"
        >
          FORUMS
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {forums?.map((forum, index) => (
            <ForumListItem key={index} forum={forum} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
