import { useContext } from "react";
import { DayContext } from "../context/DayProvider";
import { Form, Button } from "react-bootstrap";
import { Container } from "@mui/material";
import LinkList from "../components/LinkList";
import { useAxios} from "../utils/useAxios";

function LessonLinksPage() {

  const backend = useAxios()
  const { landingRaw, setDirty } = useContext(DayContext)
  console.log(landingRaw)

  const addLink = (e) => {
    e.preventDefault()
    let linkData = { 
      "lesson": landingRaw.lessons[0].id,
      "url": e.target.url.value,
      "description": e.target.description.value,
      "link_type": 3,
      "originator": landingRaw.my_info.id
    }
    backend.post("/api/v1/lesson_link/", linkData).then((res) => {
      console.log(res)
      setDirty(true)
    })
  }

  return (
    <div id="main-link">
      <Container component="main" maxWidth="xs">
        <br/>
        <h3>More resources for {landingRaw.lessons[0].title}</h3> 
        <LinkList />
      </Container>
      <Container component="main" maxWidth="xs">
        <Form onSubmit={ addLink }>
          <h4>Add another resource for this topic.</h4>
          <Form.Group controlId="add-link">
            <Form.Label>Url:</Form.Label>
            <Form.Control required name="url" type="text" placeholder="Enter a url..." />
            <Form.Label>Description:</Form.Label>
            <Form.Control required name="description" type="text" placeholder="Add a description..." />
          </Form.Group>
          <br/>
          <Button type="submit">
          Add Link
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default LessonLinksPage;