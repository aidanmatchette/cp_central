import GoogleCalendar from "../components/GoogleCalendar";
import { DayContext } from "../context/DayProvider";
import { useContext, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import theme from '../utils/theme.js'
import { ThemeProvider } from "@mui/material/styles";
import { Button, Box } from '@mui/material'
import { useAxios } from "../utils/useAxios";
import GenerateFeedback from '../components/GenerateFeedback'

function StudentPage() {    
    const { landingRaw, setDirty } = useContext(DayContext) 
    console.log(landingRaw)
    const backend = useAxios()
    
    const handleCheckin = () => {
        console.log('check-in')
        backend.post('/api/v1/user/checkin/').then(response => {
           console.log(response)
            setDirty(true)
        })
    }
           
    return (
        <ThemeProvider theme={theme}>
            {!landingRaw?.is_checked_in && 
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button color="secondary" variant="contained" onClick={handleCheckin} sx={{width:"100%",mr:2, ml: 2, mt: 2}}>Daily Check-In</Button>
            </Box>}
            <div className="student-landing-container">
                <div className="smaller-flex-container">
                    <div className="google-calander">
                         {/* <GoogleCalendar width={'500px'} height={'500px'} calendarID={''}  */}
                        <div className="links">
                            <h1>LINKS</h1>
                            <a href="https://google.com" target="_blank">Google Calendar</a>
                        </div>
                        <div className="links other-section">
                            <GenerateFeedback />
                        </div>
                    </div>
                    <div className="days-topics">
                        <div className="topics-title">
                            <h1>Today's Topics</h1>
                        </div>
                    </div>
                </div>
                <div className="lecture-readme">
                    <div className="readme-title">
                        <h1>README</h1>
                    </div>
                    <div className="readme">
                        {landingRaw?.lessons[0].markdown && <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw?.lessons[0].markdown}</ReactMarkdown>}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default StudentPage
