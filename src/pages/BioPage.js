import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Grid} from "@mui/material";

export default function BioPage() {
    const {userID} = useParams()
    const backend = useAxios()
    const [user, setUser] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        backend.get(`/api/v1/user/${userID}/`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [userID])

    const handleSubmit = (e) =>{

    }
    if (!user) return <></>

    return (
        <form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={1}>
                {edit ? <button onClick={() => setEdit(false)}>Save</button> :
                    <button onClick={() => setEdit(true)}>Edit</button>}
            </Grid>
            <Grid item xs={3}>
                <img src={user.avatar} alt={"Avatar"} width={'100%'}/>
                <h3>{user.first_name} {user.last_name}</h3>
            </Grid>
            <Grid item xs>
                <ul>Links
                    {user.links.map((link) => <li key={link.id}>({link.link_type}) - <a href={link.url}>{link.name}</a>
                    </li>)}
                </ul>
            </Grid>
            <Grid item xs={4}>
                {edit ?
                    <textarea defaultValue={JSON.stringify(user.metadata)} rows={8} cols={50} name={'metadata'}/> :
                    <p>{JSON.stringify(user.metadata)}</p>
                }
            </Grid>

        </Grid>
        </form>
    )
}