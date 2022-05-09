import {useContext, useEffect, useState} from "react";
import {DayContext} from "../context/DayProvider";
import {Col, Container, Row} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {useAxios} from "../utils/useAxios";
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";
import CohortLinks from "../components/InstructorComponents/CohortLinks";
import CreateGroup from "../components/InstructorComponents/CreateGroup";

function InstructorPage() {

    const backend = useAxios()
    const {landingRaw} = useContext(DayContext)
    const [topic, setTopic] = useState(null);

    let lesson = landingRaw ? landingRaw.lessons[0] : null
    let topicID = lesson ? lesson.topic : null

    useEffect(() => {
        backend.get(`api/v1/topic/${topicID}`)
            .then(res => setTopic(res.data))
    }, [topicID])


    return (
        <Container>
            <Row className={'mt-3'}>
                <Col className={'tall-content'}>
                    {lesson?.markdown ?
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw?.lessons[0].markdown}</ReactMarkdown> :
                        <p>No Markdown for this lesson :(</p>
                    }
                </Col>
                <Col xs={3} className={'tall-content side-content'}>
                    <Row>
                        <Col xs={12}>
                            <h4 className="text-center mt-1">Topics</h4>
                            <ul>
                                <li>{topic?.title}</li>
                            </ul>
                        </Col>
                        <Col xs={12}>
                            <LessonLinksCard links={lesson?.lesson_links} cardStyle={{height: '100%', margin: '1%'}}/>
                        </Col>
                        <Col xs={12}>
                            <CreateGroup/>
                        </Col>
                        <Col xs={12}>
                            <CohortLinks />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default InstructorPage


