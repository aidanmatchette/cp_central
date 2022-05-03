import GoogleCalendar from "../components/GoogleCalendar";
import { DayContext } from "../context/DayProvider";
import { useContext, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import theme from '../utils/theme.js'
import { ThemeProvider } from "@mui/material/styles";
import { Button, Box } from '@mui/material'
import { useAxios } from "../utils/useAxios";


function InstructorPage() {    
    const { landingRaw, setDirty } = useContext(DayContext) 
    console.log(landingRaw)
    const backend = useAxios()
    
    const handleGenerateCheckin = () => {
        console.log('generate check-in')
        backend.post('/api/instructor/checkin/').then(response => {
           console.log(response)
            setDirty(true)
        })
    }
           
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button color="secondary" variant="contained" onClick={handleGenerateCheckin} sx={{width: '80%', mt: 3}}>Generate Daily Check-In</Button>
            </Box>
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
        </ThemeProvider>
    )
}

export default InstructorPage 
