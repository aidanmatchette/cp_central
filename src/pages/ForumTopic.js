import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import ForumPost from "../components/ForumPost";

export default function ForumTopic() {
    const {topicID} = useParams()
    const backend = useAxios()
    const [forum, setForum] = useState()

    useEffect(() => {
        console.log("topicId", topicID)
        backend.get(`/api/v1/forum/${topicID}/posts/`)
            .then((res) => {
                console.log({res})
                setForum(res.data)
            })
    }, [])

    return (
        <div>
            <h1 style={{textAlign: "center", marginTop: "1rem"}}>{forum?.name}</h1>
            <Row>
                <Col>

                Add a post
                </Col>
            </Row>
            <Row>
                <Col/>
                <Col xs={9}>{forum?.forum_posts?.map((post) =>
                    <ForumPost key={post.id} post={post}/>)}</Col>
                <Col/>
            </Row>

        </div>
    )
}