import { useContext } from "react"
import { DayContext } from "../context/DayProvider"
import { Spinner } from 'react-bootstrap'

function GoogleCalendar(props) {

  let { landingRaw } = useContext(DayContext)

  let { height, width } = props

  let calendarID = landingRaw && landingRaw.cohort.calendar_key

  let calendarStyle = {
    border: "0",
    width: width,
    height: height,
    frameBorder: "0",
    scrolling: "no"
  }

  return calendarID
    ? <iframe src={`https://calendar.google.com/calendar/embed?src=${calendarID}&ctz=America%2FChicago`} style={calendarStyle} ></iframe >
    : <div className='d-inline-block d-flex justify-content-center align-items-center' style={calendarStyle}> <Spinner animation="border" /></div>

}

export default GoogleCalendar