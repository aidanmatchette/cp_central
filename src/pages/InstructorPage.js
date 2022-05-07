import GoogleCalendar from "../components/GoogleCalendar";
import { useContext, useEffect, useState } from "react";
import { DayContext } from "../context/DayProvider";
import RandomGroupGenerator from "../components/InstructorComponents/RandomGroupGenerator/RandomGroupGenerator";
import { Container, Row, Col, Card } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAxios } from "../utils/useAxios";

function InstructorPage() {

    const backend = useAxios()
    const { landingRaw } = useContext(DayContext)
    const [topic, setTopic] = useState(null);

    let lesson = landingRaw ? landingRaw.lessons[0] : null
    let topicID = lesson ? lesson.topic : null

    console.log(landingRaw)

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
                                <Card className="shadow" border="primary" style={{ height: '100%' }}>
                                    <h4 className="text-center mt-1">Links</h4>
                                    <ul>
                                        {lesson?.lesson_links?.map((link, index) => {
                                            return (
                                                <li key={index}><a href={link.url}>{link.description ? link.description : 'No Description'}</a></li>
                                            )
                                        })}
                                    </ul>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ height: '45%', margin: '5%' }}>
                            <Col>
                                <Card className="shadow" border="primary" style={{ height: '100%' }}>
                                    <h4 className="text-center mt-1">Widgets</h4>
                                    <RandomGroupGenerator />
                                    <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default InstructorPage


// {landingRaw?.lessons[0].markdown && <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw?.lessons[0].markdown}</ReactMarkdown>}
