import {useContext, useEffect, useState} from "react";
import {DayContext} from "../context/DayProvider";
import {Col, Container, Row} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";
import CohortLinks from "../components/InstructorComponents/CohortLinks";
import CreateGroup from "../components/InstructorComponents/CreateGroup";

function InstructorPage() {
    const {date, getLandingData} = useContext(DayContext);
    const [landingRaw, setLandingRaw] = useState()

    let lesson = landingRaw ? landingRaw.lessons[0] : null
        const refreshData = async () => {
        setLandingRaw(await getLandingData())
    }

    useEffect(() => {
        refreshData().then()
        if (process.env.REACT_APP_USE_POLLING === 'true') {
            const timer = setInterval(refreshData, 5000)
            return () => clearInterval(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return (
        <Container>
            <Row className={'mt-3'}>
                <Col className={'tall-content lesson noScroll'}>
                    {lesson?.markdown ?
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw?.lessons[0].markdown}</ReactMarkdown> :
                        <p>No Markdown for this lesson :(</p>
                    }
                </Col>
                <Col xs={3} className={'tall-content pageSection noScroll'}>
                    <Row>
                        <Col xs={12}>
                            <h4>Topics</h4>
                            <ul>
                                {landingRaw?.lessons.map((lesson) => <li key={lesson.id}>{lesson.topic?.title}</li>)}
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


