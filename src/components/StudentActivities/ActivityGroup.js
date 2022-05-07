import { useContext } from 'react'
import { DayContext } from '../../context/DayProvider'
import { Container, Row, Col } from 'react-bootstrap'
import { Button, Alert } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme.js";



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
    <ThemeProvider theme={theme}>
      <Container className='d-flex justify-content-center align-items-center'>
        <Button color="secondary" variant='contained' sx={{mt:3, width: '90%', display: 'flex', justifyContent: 'center'}} onClick={handleRefresh}>Refresh Groups</Button>
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
            : <Alert sx={{backgroundColor: 'rgba(0, 0, 0, 0.31)', color: 'rgba(255, 173, 0, 0.97)'}} severity="warning">There are currently no groups created!</Alert>
          }
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default ActivityGroup
