import GoogleCalendar from "../components/GoogleCalendar";
import {Button} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

export default function HomePage() {

    return (
        <div>
            <h1>Un-Authenticated landing page</h1>

      <Button ><FeedbackIcon fontSize={"large"} /> Feedback</Button>
            <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} /*calendarID can be dynamic to each cohort, for now defaults to quebec*/ />
        </div>
    )
} 
