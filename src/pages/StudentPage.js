import GoogleCalendar from "../components/GoogleCalendar";

function StudentPage() {    
    return (
        <div>
            <h1>This is the Authenticated student landing page</h1>
            <div className="student-landing-container">
                <div className="days-topics">
                    <h1>Todays topics section</h1> 
                </div>
                <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} /*calendarID can be dynamic to each cohort, for now defaults to quebec*/ />
            
            </div>
           
            <div className="lecture-readme">
                <h1>This will be the readme for the days lecture</h1> 
            </div>
        </div>
    )
}

export default StudentPage
