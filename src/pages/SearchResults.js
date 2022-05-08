import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../utils/useAxios";
import { useContext, useEffect, useState } from "react";
import { DayContext } from "../context/DayProvider";
import { AuthContext } from "../context/AuthProvider";

export default function SearchResults() {
    const { keyword } = useParams()
    const { setDate } = useContext(DayContext)
    const { user } = useContext(AuthContext)
    const [results, setResults] = useState()
    const backend = useAxios()
    const navigate = useNavigate()

    useEffect(() => {
        backend.get('/api/search/', { params: { keyword: keyword } })
            .then((res) => setResults(res.data))
    }, [])

    const navigateToLesson = (lesson) => {
        setDate(new Date(lesson.date))
        navigate('/student-dashboard')
    }

    if (!results) return <h1>no results</h1>

    return (
        <div>
            <h2>Feedback</h2>
            <ul>
                {/*TODO validate search results for feedback once feedback implemented*/}
                {results.feedback.map((result) => <li>ToDo</li>)}
            </ul>
            <h2>Lessons</h2>
            <ul>
                {results.lessons.map((result) => {
                    return (
                        <li key={result.id} onClick={() => navigateToLesson(result)}>{result.title}</li>
                    )
                })}
            </ul>
            <h2>Links</h2>
            <ul>
                {results.links.map((result) => {
                    return (
                        <li key={result.id}><a href={result.url}>{result.url}</a></li>
                    )
                })}
            </ul>
        </div>
    )
}