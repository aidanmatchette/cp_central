import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { Button } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthProvider"
import { useAxios } from "../../utils/useAxios";
import StudentApprovalCard from "./StudentApprovalCard";
import StudentApprovalSuccessModal from "./StudentApprovalSuccessModal";
import theme from "../../utils/theme";

function StudentApprovalPage(props) {

  const backend = useAxios()
  const user = useContext(AuthContext)

  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [cohorts, setCohorts] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [successfullyAddedStudents, setSuccessfullyAddedStudents] = useState([])

  useEffect(() => {
    backend.get('api/v1/cohort').then(res => {
      console.log('cohort', res.data)
      setCohorts(res.data)
    })
    backend.get('/api/super_info/').then(res => {
      let users = res.data.awaiting_approval
      setUnassignedStudents(users)
    })
  }, [assignedStudents])


  const handleSave = async () => {
    let studentsPendingBackendUpdate = [...assignedStudents]
    let successes = []
    if (studentsPendingBackendUpdate.length) {
      while (studentsPendingBackendUpdate.length != 0) {
        let student = studentsPendingBackendUpdate[0]
        let requestBody = { 'cohort_id': student.cohortID }
        let response = await backend.patch(`api/v1/user/${student.studentID}/add_to_cohort/`, requestBody)
        if (response.status == 204) {
          successes.push(studentsPendingBackendUpdate.shift())
        }
      }
      setAssignedStudents(studentsPendingBackendUpdate)
      setSuccessfullyAddedStudents(successes)
      setShowModal(true)
    }
    else {
      alert('An error occurred')
    }
  }

  const renderStudentCards = () => {
    return unassignedStudents.map((student) => {
      return (
        <StudentApprovalCard
          key={student.id}
          student={student}
          cohorts={cohorts}
          assignedStudents={assignedStudents}
          setAssignedStudents={setAssignedStudents} />
      )
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className="d-flex justify-content-center flex-column">
        <StudentApprovalSuccessModal
          showModal={showModal}
          setShowModal={setShowModal}
          successfullyAddedStudents={successfullyAddedStudents}
          setSuccessfullyAddedStudents={setSuccessfullyAddedStudents} />
        <Button className="mt-2" variant="contained" color="secondary" onClick={assignedStudents.length ? handleSave : () => alert('No changes have been made')}>
          Save All
        </Button>
        {unassignedStudents.length && cohorts
          ? renderStudentCards()
          : <h3 className="text-center mt-4">No Pending Students</h3>
        }
      </Container>
    </ThemeProvider>
  )
}

export default StudentApprovalPage