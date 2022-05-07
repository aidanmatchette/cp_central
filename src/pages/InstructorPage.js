import { useContext, useEffect, useState } from "react";
import { DayContext } from "../context/DayProvider";
import GroupsCard from "../components/InstructorComponents/RandomGroupGenerator/GroupsCard";
import { Container, Row, Col, Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAxios } from "../utils/useAxios";
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";

function InstructorPage() {

    const backend = useAxios()
    const { landingRaw } = useContext(DayContext)
    const [topic, setTopic] = useState(null);

    let lesson = landingRaw ? landingRaw.lessons[0] : null
    let topicID = lesson ? lesson.topic : null

    useEffect(() => {
        backend.get(`api/v1/topic/${topicID}`)
            .then(res => setTopic(res.data))
    }, [topicID])


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '92vh', width: '100vw' }}>
                <Row style={{ height: '95%' }}>
                    <Col className="shadow" style={{ width: '45vw', padding: '1rem', height: '90%', margin: 'auto', overflow: 'scroll', overflowX: 'hidden' }}>
                        {lesson && lesson.markdown
                            ?
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw?.lessons[0].markdown}</ReactMarkdown>
                            : <p>No Markdown for this lesson :(</p>
                        }
                    </Col>
                    <Col style={{ width: '45vw', padding: '1rem' }}>
                        <Row style={{ height: '45%', margin: '5%' }}>
                            <Col>
                                <Card className="shadow" border="primary" style={{ height: '100%' }}>
                                    <h4 className="text-center mt-1">Topics</h4>
                                    <ul>
                                        <li>{topic && topic.title}</li>
                                    </ul>
                                </Card>
                            </Col>
                            <Col>
                                <LessonLinksCard links={lesson?.lesson_links} />
                            </Col>
                        </Row>
                        <Row style={{ height: '45%', margin: '5%' }}>
                            <Col>
                                <GroupsCard />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default InstructorPage