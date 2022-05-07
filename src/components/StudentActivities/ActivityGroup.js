import { useContext } from 'react'
import { DayContext } from '../../context/DayProvider'
import { Container, Row, Col } from 'react-bootstrap'

function ActivityGroup(props) {

  let { landingRaw, setDirty, dirty } = useContext(DayContext)

  /* 
  Only grabs the two most recent groups in the off chance that more than 1 activity is generated in a day
  then filters out null values for if there are 0 or 1 groups 
  */
  let allGroups = landingRaw ? [...landingRaw.activity_groups] : null
  let groups = allGroups && [allGroups.pop(), allGroups.pop()].filter((group) => group)

  const handleRefresh = () => setDirty(!dirty)

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center'>
        <h1 className="d-inline-block">My groups</h1>
        <button onClick={handleRefresh}>Refresh</button>
      </Container>
      <Container>
        <Row className='d-flex justify-content-center'>
          {groups && groups.length
            ? groups.map((group) => {
              return (
                <Col>
                  <p><strong>{group.activity.name} / Group {group && group.group_number}</strong></p>
                  {group.members.map((member) => <p>{member.first_name} {member.last_name}</p>)}
                </Col>
              )
            })
            : <h4>No groups for this day</h4>
          }
        </Row>
      </Container>
    </>
  )
}

export default ActivityGroup