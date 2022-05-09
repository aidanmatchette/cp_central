import {useState, useContext} from "react";
import {Col, Row} from "react-bootstrap";
import {Button, IconButton, Input, TextField} from "@mui/material";
import {ExpandLess, ExpandMore, Edit, Clear, Save} from "@mui/icons-material";
import PostComment from "./PostComment";
import {useAxios} from "../utils/useAxios";
import {AuthContext} from "../context/AuthProvider";

export default function ForumPost({post, refreshTopic}) {
    const {user} = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false)
    const [forumPost, setForumPost] = useState(post)
    const backend = useAxios()
    const canEdit = (user?.id == forumPost?.originator?.id) || user?.is_superuser
    const [editField, setEditField] = useState(false)

    const addComment = async (e) => {
        e.preventDefault()
        let result = await backend.post(`/api/v1/forum_post/${forumPost.id}/add_comment/`, new FormData(e.target))
        setForumPost(result.data)
    }
    const saveEditPost = async (e) => {
        e.preventDefault()
        console.log(e)
        backend.patch(`/api/v1/forum_post/${forumPost.id}/`, new FormData(e.target)).then((res) => {
            setEditField(false)
            setForumPost({...forumPost, body: res.data.body})
        })
    }

    const deletePost = () => {
        backend.delete(`/api/v1/forum_post/${forumPost.id}/`).then((res) => {
            console.log(res)
            refreshTopic()
        })
    }

    const renderBody = () => {
        if (editField) {
            return (
                <form onSubmit={ saveEditPost }>
                    <TextField 
                        name="body"
                        multiline
                        defaultValue={forumPost?.body}
                        style = {{width: 750}}
                    />
                    <IconButton type="submit">
                        <Save/>
                    </IconButton>
                </form>
                )
        }
        return `${forumPost?.body}`
    }

    const editButtons = () => {
        return <>
            <IconButton onClick={() => setEditField(true)}>
                <Edit/>
            </IconButton>
            <IconButton onClick={() => deletePost()}>
                <Clear/>
            </IconButton>
        </>
    }

    return (
        <Row className={'highlight-teal'}>
            
                <Row>
                    <Col xs={3}>{forumPost?.originator?.first_name} {forumPost?.originator?.last_name}</Col>
                    <Col xs={7}><strong>{forumPost?.title}</strong></Col>
                    <Col xs={2}>
                        {canEdit && editButtons() }
                    </Col>
                    <Col className={'mt-3'} xs={12}>{ renderBody() }</Col>
                </Row>
            <form onSubmit={addComment}>
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