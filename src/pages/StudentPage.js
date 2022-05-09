import { DayContext } from "../context/DayProvider";
import { useState, useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Col, Container, Row } from "react-bootstrap";
import { useAxios } from "../utils/useAxios";
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";
import CohortLinks from "../components/InstructorComponents/CohortLinks";
import CreateGroup from "../components/InstructorComponents/CreateGroup";
import { Alert } from "@mui/material";

function StudentPage() {
  const { landingRaw, setDirty } = useContext(DayContext);
  console.log("landing raw =====", landingRaw);
  const backend = useAxios();

  const [topic, setTopic] = useState(null);

  let lesson = landingRaw ? landingRaw.lessons[0] : null;
  let topicID = lesson ? lesson.topic : null;
  let firstName = landingRaw ? landingRaw.my_info.first_name : null;
  let lastName = landingRaw ? landingRaw.my_info.last_name : null;
  let groups = landingRaw ? landingRaw.my_info.groups : null;

  useEffect(() => {
    backend.get(`api/v1/topic/${topicID}`).then((res) => setTopic(res.data));
  }, [topicID]);

  const handleCheckin = () => {
    console.log("check-in");
    backend.post("/api/v1/user/checkin/").then((response) => {
      // console.log(response)
      setDirty(true);
    });
  };

  return (
    <Container>
      <Row className={"mt-3"}>
        <Col className={"tall-content lesson"}>
          {lesson?.markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {landingRaw?.lessons[0].markdown}
            </ReactMarkdown>
          ) : (
            <p>No Markdown for this lesson :(</p>
          )}
        </Col>
        <Col xs={3} className={"tall-content side-content"}>
          <Row>
            <Col xs={12}>
              <h4 className="text-center mt-1">Welcome</h4>
              <h6 className="text-center mt-1">
                {firstName} {lastName}
              </h6>
            </Col>
            <Col xs={12}>
              <h4 className="text-center mt-1">Topics</h4>
              <ul>
                <li>{topic?.title}</li>
              </ul>
            </Col>
            <Col xs={12}>
              <LessonLinksCard
                links={lesson?.lesson_links}
                cardStyle={{ height: "100%", margin: "1%" }}
              />
            </Col>
            <Col xs={12}>
              <h4 className="text-center mt-1">Your Groups</h4>
              {groups?.length > 0 ? (
                groups.map((group) => {
                  return group.name;
                })
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
              <CohortLinks />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentPage;
