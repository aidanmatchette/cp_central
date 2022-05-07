import {Col, Row} from "react-bootstrap";
import {Button, IconButton} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {useAxios} from "../utils/useAxios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {Delete} from "@mui/icons-material";

export default function FeedbackItem({item}) {
    const [feedback, setFeedback] = useState(item)
    const backend = useAxios()
    const {user, allChoices} = useContext(AuthContext)

    const topic = allChoices?.feedbackTopics?.find((item) => item[0] === feedback.topic)[1]
    const category = allChoices?.feedbackCategories?.find((item) => item[0] === feedback.category)[1]
    const canDelete = feedback?.user?.id === user.id

    useEffect(()=>{
        setFeedback(item)
    }, [item])
    const doVote = async (upvote = true) => {
        const result = await backend.post(`/api/v1/feedback/${feedback.id}/vote/`, {is_agreed: upvote})
        setFeedback(result.data)
    }

    const getVoteCount = (upvote = true) => feedback?.votes?.filter((item) => item.is_agreed === upvote).length

    const getMyVote = (upvote = true) => {
        const voteFilter = (item) => {
            return item.user === user.id && item.is_agreed === upvote
        }
        const myVote = feedback?.votes?.filter(voteFilter)
        if (myVote.length == 0) return ""
        if (upvote)
            return "success"
        return "error"
    }

    const VoteButtons = () => {
        return (
            <>
                <IconButton onClick={() => doVote(true)} size={'small'}>
                    <ThumbUpIcon color={getMyVote(true)}/>{getVoteCount(true)}
                </IconButton>
                <IconButton onClick={() => doVote(false)} size={'small'}>
                    <ThumbDownIcon color={getMyVote(false)}/>{getVoteCount(false)}
                </IconButton>
            </>
        )
    }

    const DeleteButton = () => {
        return (
            <>
                <Button color={"error"} size={'large'}>
                    <Delete/> Delete
                </Button>
            </>
        )
    }

    return (
        <Row className={'highlight-teal'}>
            <Col xs={3}>
                <Row>
                    <Col xs={12}><strong>{feedback.title}</strong></Col>
                    <Col xs={12}>
                        {canDelete ? <DeleteButton/> : <VoteButtons/> }
                    </Col>
                </Row>
            </Col>
            <Col xs={2}>
                <Row>
                    <Col xs={12}>{topic}</Col>
                    <Col xs={12}>{category}</Col>
                </Row>
            </Col>
            <Col>
                {feedback.description}
            </Col>
        </Row>
    )
}