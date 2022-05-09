import {useAxios} from "../utils/useAxios";
import {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Forum() {
    const backend = useAxios()
    const [forums, setForums] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        backend.get('/api/v1/forum')
            .then((res) => {
                // console.log({res})
                setForums(res.data)
            })
    }, [])

    const ForumListItem = ({forum}) => {

        const doNavigate = (e) => {
            e.preventDefault()
            navigate(`/forumTopic/${forum.id}`)
        }

        return (
            <ListItemButton onClick={doNavigate}>
                <ListItemText>
                    {forum.name}
                </ListItemText>
            </ListItemButton>
        )
    }

    return (
        <>
            <h1>Forums</h1>
            <List>
                {forums?.map((forum, index) =>
                    <ForumListItem key={index} forum={forum}/>
                )}
            </List>
        </>
    )
}