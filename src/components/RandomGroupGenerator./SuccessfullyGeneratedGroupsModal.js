import { Modal, Button } from 'react-bootstrap'

function SuccessfullyGeneratedGroupsModal(props) {

  let { groups, showModal, setShowModal } = props

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Successfully Generated Groups
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {groups && groups.map((group, index) => {
          return (
            <div className="my-5" key={'group-' + index}>
              <h4>Group {index + 1}</h4>
              {
                group.members.map((member, mIndex) => <p key={'group-' + index + '-' + mIndex}>{member.first_name}</p>)
              }
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessfullyGeneratedGroupsModal