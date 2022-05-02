function GoogleCalendar(props) {

  let { height, width, calendarID } = props

  let nonBlankCalendarID = calendarID == ''   //ternary that default to quebec calendar if CalendarID isn't passed into props
    ? "c_4lkirg4ugcjlpde4pm7gu4atfo%40group.calendar.google.com"
    : calendarID

  let calendarStyle = {
    border: "0",
    width: width,
    height: height,
    frameBorder: "0",
    scrolling: "no"
  }

  return (
    <iframe src={`https://calendar.google.com/calendar/embed?src=${nonBlankCalendarID}&ctz=America%2FChicago`} style={calendarStyle}></iframe>
  )
}

export default GoogleCalendar