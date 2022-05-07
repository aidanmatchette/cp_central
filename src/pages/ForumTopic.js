import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import ForumPost from "../components/ForumPost";
import {Button, TextField} from "@mui/material";

export default function ForumTopic() {
    const {topicID} = useParams()
    const backend = useAxios()
    const [forum, setForum] = useState()

    const refreshTopic = async () => {
        const result = await backend.get(`/api/v1/forum/${topicID}/posts/`)
        setForum(result.data)
    }

    useEffect(() => {
        refreshTopic().then()
    }, [topicID])

    const addPost = async (e) => {
        e.preventDefault()
        const result = await backend.post(`/api/v1/forum/${topicID}/add_post/`, new FormData(e.target))
        // console.log({result})
        refreshTopic().then()
        window.location.reload()
    }


    return (
        <Row>
            <Col xs={12}>
                <h1 style={{textAlign: "center", marginTop: "1rem"}}>{forum?.name}</h1>
            </Col>

            <Row>
                <Col xs={1}/>
                <Col xs={3}>
                    <form onSubmit={addPost}>
                        <TextField
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            defaultValue={""}
                            sx={{marginTop: "2rem"}}
                            />
                        <TextField
                            name="body"
                            label="Post Details"
                            type="text"
                            fullWidth
                            multiline
                            defaultValue={""}
                            rows={6}
                            sx={{marginTop: "1rem"}}
                            />
                        <Button fullWidth type={"submit"}>
                            Add Post
                        </Button>
                    </form>
                </Col>
                <Col xs={8}>{forum?.forum_posts?.map((post) =>
                    <ForumPost key={post.id} post={post}/>)}</Col>
                <Col/>
            </Row>

        </Row>
    )
}