import GoogleCalendar from "../components/GoogleCalendar";
import { DayContext } from "../context/DayProvider";
import { useContext, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function StudentPage() {    
    const { landingRaw } = useContext(DayContext) 
    console.log(landingRaw)
           
    return (
        <div>
            <div className="student-landing-container">
                <div className="google-calander">
                    <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} /*calendarID can be dynamic to each cohort, for now defaults to quebec*/ />
                </div>
                <div className="todays-info">
                    <div className="days-topics">
                        <div className="topics-title">
                            <h1>Today's Topics</h1>
                        </div>
                    </div>
                    <div className="lecture-readme">
                        <div className="readme-title">
                            <h1>README</h1>
                        </div>
                        <div className="readme">
                            {landingRaw?.curriculum[0] && <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw.curriculum[0]}</ReactMarkdown>}
                        </div>
                       
        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentPage
