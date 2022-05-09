import { DayContext } from "../context/DayProvider";
import { useState, useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Col, Container, Row } from "react-bootstrap";
import { useAxios } from "../utils/useAxios";
import LessonLinksCard from "../components/InstructorComponents/LessonLinksCard";
import CohortLinks from "../components/InstructorComponents/CohortLinks";
import CreateGroup from "../components/InstructorComponents/CreateGroup";
import { Alert, List, ListItem} from "@mui/material";
import dayjs from "dayjs";
import ActivityGroupItem from "../components/InstructorComponents/ActivityGroupItem";

function StudentPage() {
  const { landingRaw, date, setDirty } = useContext(DayContext);
  // console.log("landing raw =====", landingRaw);
  const backend = useAxios();

  const [topic, setTopic] = useState(null);
  const [groups, setGroups] = useState(null);

  let lesson = landingRaw ? landingRaw.lessons[0] : null;
  let topicID = lesson ? lesson.topic : null;
  let firstName = landingRaw ? landingRaw.my_info.first_name : null;
  let lastName = landingRaw ? landingRaw.my_info.last_name : null;

  useEffect(() => {
    backend.get(`api/v1/topic/${topicID}`).then((res) => setTopic(res.data));
    getGroups();
  }, [topicID]);

  const handleCheckin = () => {
    console.log("check-in");
    backend.post("/api/v1/user/checkin/").then((response) => {
      // console.log(response)
      setDirty(true);
    });
  };
  const getGroups = async () => {
    const params = {
      // optional
      params: {
        date: dayjs(date).format("YYYY-MM-DD"), // optional: defaults to today
        include_null_date: true, // optional: defaults to false
      },
    };
    const results = await backend.get("/api/v1/activity_group/my_groups/");
    console.log("results ===", results.data);
    setGroups(results.data);
  };

  const ActivityMember = ({member}) => <ListItem> {member.first_name} {member.last_name} </ListItem>
    
  return (
    <Container>
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
        <Col xs={3} className={"tall-content pageSection noScroll"}>
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
              <h4>Your Groups</h4>
              {groups ? (
                <List dense >
                  {groups?.map((a) => (
                    <> 
                    <h6>{a.activity.name}</h6>
                    <List dense className={"list-box"}>
                      {a.members.map((member) => (
                        <ActivityMember key={member.id} member={member} />
                      ))}
                    </List> 
                    </>
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
              <CohortLinks />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentPage;
