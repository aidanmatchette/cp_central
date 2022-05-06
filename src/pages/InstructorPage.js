import GoogleCalendar from "../components/GoogleCalendar";
import { useContext, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import theme from '../utils/theme.js'
import { ThemeProvider } from "@mui/material/styles";
import { Button, Box } from '@mui/material'
import { DayContext } from "../context/DayProvider";
import { useAxios } from "../utils/useAxios";

function InstructorPage() {    
    
    const { landingRaw, setDirty } = useContext(DayContext)
    const backend = useAxios() 
    console.log(landingRaw)
    
    const refreshLecture = () => {
        backend.post("/api/refresh_lesson/", {"id": landingRaw.lessons[0].id}).then((result) => {
            setDirty(true)
        })
        // TODO: Check after rewired
    }
          
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
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
                            <Button onClick={ refreshLecture }>
                                Refresh Icon
                            </Button>
                        </div>
                        <div className="readme">
                            {/*{landingRaw && landingRaw?.curriculum[0] && <ReactMarkdown remarkPlugins={[remarkGfm]}>{landingRaw.curriculum[0]}</ReactMarkdown>}*/}
                        </div>
                       
        
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default InstructorPage 
