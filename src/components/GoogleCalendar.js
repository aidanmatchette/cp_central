import { useContext, useState } from "react"
import { DayContext } from "../context/DayProvider"
import { Container, Spinner } from 'react-bootstrap'
import { Button, Dialog, DialogActions } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme.js";


function GoogleCalendar(props) {

  let { landingRaw } = useContext(DayContext)
  const [vis, setVis] = useState(false)
  let { height, width } = props

  let calendarID = landingRaw && landingRaw.cohort.calendar_key

  let calendarStyle = {
    border: "0",
    // TODO add back height and width
    width: "500px",
    height: "500px",
    frameBorder: "0",
    scrolling: "no"
  }

  return (
    <ThemeProvider theme={theme}>
      <Button sx={{ width: "80%", mt: 3 }} color="secondary" variant="outlined" onClick={() => setVis(true)}><CalendarMonthIcon fontSize={"large"} /> Calendar</Button>
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
    </ThemeProvider>
  )
}

export default GoogleCalendar
