import {useAxios} from "../utils/useAxios";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import FeedbackItem from "../components/FeedbackItem";

export default function Retro() {
    const backend = useAxios()
    const [feedback, setFeedback] = useState()

    const checkChange = async () => {
        // console.log("checking for changes")
        const result = await backend.get('/api/v1/feedback/retro/')
        if (JSON.stringify(feedback) !== JSON.stringify(result.data)) {
            console.log("change detected")
            setFeedback(result.data)
        }
    }

    useEffect(() => {
        checkChange().then()
        if (process.env.REACT_APP_USE_POLLING === 'true') {
            const timer = setInterval(checkChange, 3000)
            return () => clearInterval(timer)
        }
    }, [])

    return (
        <Container>
            <Row className={"mt-3"}>
                <Col/>
                <Col xs={10}>
                    <Row className={'pageSection primary'}>
                        <Col xs={12}>
                            <h1>Retro feedback</h1>
                            <hr/>
                        </Col>
                        <Col>
                            {feedback?.map((e) =>
                                <FeedbackItem key={e.id} item={e}/>)}
                        </Col>
                    </Row>
                </Col>
                <Col/>
            </Row>
        </Container>
    )
}