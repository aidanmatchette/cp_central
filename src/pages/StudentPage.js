import {DayContext} from "../context/DayProvider";
import {useContext, useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Col, Container, Row} from "react-bootstrap";
import {useAxios} from "../utils/useAxios";
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";
import CohortLinks from "../components/InstructorComponents/CohortLinks";
import {Alert, Box, Button, List, ListItem} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../utils/theme.js";


function StudentPage() {
    const {date, getLandingData} = useContext(DayContext);
    const backend = useAxios();

    const [groups, setGroups] = useState(null);
    const [landingRaw, setLandingRaw] = useState()

    let lesson = landingRaw ? landingRaw.lessons[0] : null;
    let firstName = landingRaw ? landingRaw.my_info.first_name : null;
    let lastName = landingRaw ? landingRaw.my_info.last_name : null;

    const refreshData = async () => {
        const results = await backend.get("/api/v1/activity_group/my_groups/");
        setGroups(results.data);
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

    const handleCheckin = async () => {
        // console.log("check-in");
        await backend.post("/api/v1/user/checkin/")
        refreshData().then()
    };

    return (
        <Container>
            {!landingRaw?.is_checked_in && (
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <ThemeProvider theme={theme}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleCheckin}
                            sx={{width: "100%", mr: 2, mt: 2}}
                        >
                            Daily Check-In
                        </Button>
                    </ThemeProvider>

                </Box>
            )}
            <Row className={"mt-3"}>
                <Col className={"tall-content lesson noScroll"}>
                    {lesson?.markdown ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {landingRaw?.lessons[0].markdown}
                        </ReactMarkdown>
                    ) : (
                        <p>No Markdown for this lesson :(</p>
                    )}
                </Col>
                <Col xs={3} className={"tall-content pageSection noScroll secondary"}>
                    <Row>
                        <Col xs={12}>
                            <h4>Welcome</h4>
                            <h6>
                                {firstName} {lastName}
                            </h6>
                        </Col>
                        <Col xs={12}>
                            <h4>Topics</h4>
                            <ul>
                                {landingRaw?.lessons.map((lesson) => <li key={lesson.id}>{lesson.topic?.title}</li>)}
                            </ul>
                        </Col>
                        <Col xs={12}>
                            <LessonLinksCard
                                links={lesson?.lesson_links}
                                cardStyle={{height: "100%", margin: "1%"}}
                            />
                        </Col>
                        <Col xs={12}>
                            <h4>Your Groups</h4>
                            {groups ? (
                                <List dense>
                                    {groups?.map((a, index) => (
                                        <div key={index}>
                                            <h6>{a.activity.name}</h6>
                                            <List dense className={"list-box"}>
                                                {a.members.map((member, index2) =>
                                                    <ListItem key={index2}>
                                                        {member.first_name} {member.last_name}
                                                    </ListItem>
                                                )}
                                            </List>
                                        </div>
                                    ))}
                                </List>
                            ) : (
                                <Alert
                                    sx={{
                                        borderRadius: 4,
                                        backgroundColor: "rgba(39, 170, 245, 0.44)",
                                        color: "black",
                                        justifyContent: "center",
                                    }}
                                    severity="info"
                                >
                                    No active groups
                                </Alert>
                            )}
                        </Col>
                        <Col xs={12}>
                            <CohortLinks/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentPage;
