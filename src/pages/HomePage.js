import GoogleCalendar from "../components/GoogleCalendar";

export default function HomePage() {

    return (
        <div>
            <h1>Un-Authenticated landing page</h1>
            <GoogleCalendar width={'500px'} height={'500px'} calendarID={''} /*calendarID can be dynamic to each cohort, for now defaults to quebec*/ />
        </div>
    )
} 
