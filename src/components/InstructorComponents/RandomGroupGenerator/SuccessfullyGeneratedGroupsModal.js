import { Modal, Button } from 'react-bootstrap'

function SuccessfullyGeneratedGroupsModal(props) {

  let { activity, showModal, setShowModal } = props
  let groups = activity && activity.activity_groups

  return activity && (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {activity.name.split(' ')[0] + 's Created'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {groups.map((group, index) => {
          return (
            <div className='mt-4' key={'group-' + index}>
              <h4>Group {group.group_number}</h4>
              {group.members.map((member, mIndex) => {
                return (
                  <p key={'group' + index + mIndex}>{`${member.first_name} ${member.last_name}`}</p>
                )
              })}
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)} style={{ color: 'white' }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessfullyGeneratedGroupsModal