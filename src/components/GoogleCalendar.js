import { useContext, useState } from "react"
import { DayContext } from "../context/DayProvider"
import { Container, Spinner } from 'react-bootstrap'
import { Button, Dialog, DialogActions } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function GoogleCalendar(props) {

  let { landingRaw } = useContext(DayContext)
  const [vis, setVis] = useState(false)
  let { height, width } = props

  let calendarID = landingRaw && landingRaw.cohort.calendar_key

  let calendarStyle = {
    border: "0",
    width: width,
    height: height,
    frameBorder: "0",
    scrolling: "no"
  }

  return (
    <div>
      <Button onClick={() => setVis(true)}><CalendarMonthIcon /></Button>
      <Dialog open={vis} onClose={() => setVis(false)} fullWidth>
        <Container className="d-flex justify-content-center mt-3">
          {calendarID
            ? <iframe src={`https://calendar.google.com/calendar/embed?src=${calendarID}&ctz=America%2FChicago`}
              style={calendarStyle}></iframe>
            :
            <div className='d-inline-block d-flex justify-content-center align-items-center'
              style={calendarStyle}><Spinner
                animation="border" /></div>}
        </Container>
        <DialogActions>
          <Button onClick={() => setVis(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default GoogleCalendar