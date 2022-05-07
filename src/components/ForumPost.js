import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Button, IconButton, Input} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import PostComment from "./PostComment";
import {useAxios} from "../utils/useAxios";

export default function ForumPost({post}) {
    const [expanded, setExpanded] = useState(false)
    const [forumPost, setForumPost] = useState(post)
    const backend = useAxios()

    const addComment = async (e) => {
        e.preventDefault()
        let result = await backend.post(`/api/v1/forum_post/${forumPost.id}/add_comment/`, new FormData(e.target))
        setForumPost(result.data)
    }

    return (
        <Row>
            <form onSubmit={addComment} className={'highlight-teal'}>
                <Row>
                    <Col xs={3}>{forumPost?.originator?.first_name} {forumPost?.originator?.last_name}</Col>
                    <Col xs={9}><strong>{forumPost?.title}</strong></Col>
                    <Col className={'mt-3'} xs={12}>{forumPost?.body}</Col>
                </Row>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={7}>
                        <Input name={"body"} fullWidth defaultValue={""}/>
                    </Col>
                    <Col xs={2}>
                        <Button type={"submit"}>Add Comment</Button>
                    </Col>
                    <Col xs={2}>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ExpandLess/> : <ExpandMore/>}
                            {forumPost?.forum_comments.length}
                        </IconButton>
                    </Col>
                    {expanded && forumPost?.forum_comments.map((comment) =>
                        <PostComment key={comment.id} data={comment}/>)}
                </Row>
            </form>
        </Row>
    )
}