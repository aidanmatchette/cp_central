import { Card, Col, Container, Form, Row } from 'react-bootstrap'

function StudentApprovalCard(props) {

  let { student, cohorts, assignedStudents, setAssignedStudents } = props
  let requestedCohort = student.metadata ? cohorts.filter((cohort) => cohort.group.id == student.metadata.cohort_requested)[0] : ''

  const handleCohortChange = (e) => {
    let pendingStudent = {
      'studentID': student.id,
      'cohortID': e.target.value,
      'cohortName': e.target.value == 'false' ? 'false' : cohorts.filter((cohort) => cohort.group.id == e.target.value)[0].group.name,
      'studentName': `${student.first_name} ${student.last_name}`
    }

    if (pendingStudent.cohortID != "false") {
      setAssignedStudents([...assignedStudents, pendingStudent])
    }
    else {
      console.log(console.log(e.target.value))
      setAssignedStudents([...assignedStudents.filter((student) => student.studentID != pendingStudent.studentID)])
    }
  }

  return (
    <Card className="mt-2">
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Text>
                {student.first_name + " " + student.last_name}
                <br />
                {student.email}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                Requested Cohort:
                <br />
                {requestedCohort && requestedCohort.group.name}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <Form.Select onChange={handleCohortChange} size="lg">
                  <option value={false}>Unassigned</option>
                  {cohorts.map((cohort) => {
                    return (
                      <option key={cohort.group.name} value={cohort.group.id}>{cohort.group.name}</option>
                    )
                  })}
                </Form.Select>
              </Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card >
  )
}

export default StudentApprovalCard