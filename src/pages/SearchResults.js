import {useNavigate, useParams} from "react-router-dom";
import {useAxios} from "../utils/useAxios";
import {useContext, useEffect, useState} from "react";
import {DayContext} from "../context/DayProvider";
import {List, ListItemButton} from "@mui/material";

export default function SearchResults() {
    const {keyword} = useParams()
    const {setDate} = useContext(DayContext)
    const [results, setResults] = useState(null)
    const backend = useAxios()
    const navigate = useNavigate()

    const isResult = () => {
        for (let arr in results)
            if (results[arr].length > 0)
                return true
        return false
    }

    useEffect(() => {
        backend.get('/api/search/', {params: {keyword: keyword}})
            .then((res) => setResults(res.data))
    }, [keyword])

    // TODO refactor this out to use route with params
    const navigateToLesson = (lesson) => {
        setDate(new Date(lesson.date))
        navigate('/student-dashboard')
    }

    if (!isResult()) return <h1>No results</h1>

    return (
        <div className={'search-results'}>

            {results.lessons.length > 0 && <>
                <h2>Lessons</h2>
                <List dense>
                    {results.lessons.map((result) =>
                        <ListItemButton key={result.id} onClick={() => navigateToLesson(result)}>
                            {result.title}
                        </ListItemButton>
                    )}
                </List>
            </>}

            {results.links.length > 0 && <>
                <h2>Links</h2>
                <List dense>
                    {results.links.map((result) =>
                        <ListItemButton key={result.id}>
                            <a href={result.url}>{result.url}</a>
                        </ListItemButton>
                    )}
                </List>
            </>}

            {results.posts.length > 0 && <>
                <h2>Forums</h2>
                <List dense>
                    {results.posts.map((result) =>
                        <ListItemButton key={result.id} onClick={() => navigate(`/forumTopic/${result.forum.id}`)}>
                            {result.title}
                        </ListItemButton>
                    )}
                </List>
            </>}

            {results.comments.length > 0 && <>
                <h2>Forum Comments</h2>
                <List dense>
                    {results.comments.map((result) =>
                        <ListItemButton key={result.id} onClick={() => console.log(result)}>
                            {result.body}
                        </ListItemButton>
                    )}
                </List>
            </>}
        </div>
    )
}