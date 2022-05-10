import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import ForumPost from "../components/ForumPost";
import {Button, TextField, Typography} from "@mui/material";
import theme from "../utils/theme";
import {ThemeProvider} from "@mui/material/styles";

export default function ForumTopic() {
  const { topicID } = useParams();
  const backend = useAxios();
  const [forum, setForum] = useState();

  const refreshTopic = async () => {
    const result = await backend.get(`/api/v1/forum/${topicID}/posts/`);
    setForum(result.data);
  };

    useEffect(() => {
        refreshTopic().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicID])

  const addPost = async (e) => {
    e.preventDefault();
    await backend.post(
      `/api/v1/forum/${topicID}/add_post/`,
      new FormData(e.target)
    );
    refreshTopic().then();
  };

  return (
    <Row className={"mt-2 title-row"}>
      <Col xs={12} className="forum-topic-header ">
        <Typography variant="h2" sx={{ fontWeight: 900 }}>
          {forum?.name}
        </Typography>
        <hr/>
      </Col>

      <Row>
        <Col xs={4} className={"inputForm ms-5 mt-2"}>
          <form onSubmit={addPost}>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              width="100%"
              alt=""
              style={{ borderRadius: "1rem" }}
            />
            <TextField
              name="title"
              label="Title"
              type="text"
              fullWidth
              defaultValue={""}
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              name="body"
              label="Post Details"
              type="text"
              fullWidth
              multiline
              defaultValue={""}
              rows={6}
              sx={{ marginTop: "1rem" }}
            />
            <ThemeProvider theme={theme}>
              <Button
                fullWidth
                type={"submit"}
                color="secondary"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Add Post
              </Button>
            </ThemeProvider>
          </form>
        </Col>
        <Col xs={7} className={"mx-3 pageSection secondary"}>
          {forum?.forum_posts?.map((post) => (
            <ForumPost key={post.id} post={post} refreshTopic={refreshTopic} />
          ))}
        </Col>
      </Row>
    </Row>
  );
}
