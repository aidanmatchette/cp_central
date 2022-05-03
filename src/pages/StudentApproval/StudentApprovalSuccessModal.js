import { Modal, Button } from "react-bootstrap";

function StudentApprovalSuccessModal(props) {

  const { showModal, setShowModal, successfullyAddedStudents, setSuccessfullyAddedStudents } = props;

  const handleClose = () => {
    setSuccessfullyAddedStudents([])
    setShowModal(false);
  }


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successfullyAddedStudents.map((student, index) => {
          return <div key={student.studentName + index}>{student.studentName} added to {student.cohortName}</div>
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}



export default StudentApprovalSuccessModal