import GoogleCalendar from "../components/GoogleCalendar";

function StudentPage() {    
    return (
        <div>
            <div className="student-landing-container">
               <div className="google-calander">
                    <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} /*calendarID can be dynamic to each cohort, for now defaults to quebec*/ />
                </div>
                <div className="todays-info">
                    <div className="days-topics">
                        <h1>Todays topics section</h1> 
                    </div>
                    <div className="lecture-readme">
                        <h1>This will be the readme for the days lecture</h1> 
        
                    </div>
                </div>
               
                 
            </div>
            
           
        </div>
    )
}

export default StudentPage
