import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import UserMetaData from "../components/BioPage/UserMetaData";
import UserLinks from "../components/BioPage/UserLinks";
import {AuthContext} from "../context/AuthProvider";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function BioPage() {
    const {userID} = useParams()
    const backend = useAxios()
    const {allChoices} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [dirty, setDirty] = useState(true)
    const [markdownEdit, setMarkdownEdit] = useState(false)

    useEffect(() => {
        backend.get(`/api/v1/user/${userID}/`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log("err", err)
            })
        setDirty(false)
    }, [userID, dirty])

    const saveUser = (e) => {
        e.preventDefault()
        backend.patch(`/api/v1/user/${userID}/`, new FormData(e.target))
            .then((res) => {
                console.log({res})
                setMarkdownEdit(false)
                setDirty(true)
            })
    }

    const imageChange = (e) => {
        let formData = new FormData()
        formData.append("avatar", e.target.files[0])
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        backend.patch(`/api/v1/user/${userID}/`, formData, headers)
            .then((res) => setDirty(true))
    }

    const renderMarkdown = () => {
        if (markdownEdit){
            return <TextField multiline
                              rows={20}
                              defaultValue={user.markdown}
                              fullWidth
                              name={"markdown"}
            />
        }
        return (
            <div onClick={()=>setMarkdownEdit(true)}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {user.markdown}
            </ReactMarkdown>
            </div>
        )
    }

    if (!user) return <></>

    return (
        <Grid container marginTop={4} spacing={1}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4}>
                <h3 style={{textAlign: "center"}}>{user.first_name} {user.last_name}</h3>
                <span>{user.email}</span>
                <img src={user.avatar} alt={"Avatar"} width={'100%'} style={{borderRadius: "30%"}}/>
                <input accept={"image/*"}
                       type={"file"}
                       name={"avatar"}
                       onChange={imageChange}
                />
                <UserLinks userID={userID} links={user.links} setDirty={setDirty}/>
            </Grid>
            <Grid item xs={6}>
                {/*too lazy to do a proper lookup on default group or change the serializer*/}
                <h3>{user.groups[0].name} Cohort</h3>
                <UserMetaData metadata={user.metadata} userID={userID} setUser={setUser}/>
                <form onSubmit={saveUser}>
                    <Select name={"timezone"} defaultValue={user.timezone} label={"Time Zone"} sx={{marginTop: "1rem"}}>
                        {allChoices.timeZones.map((tz, index) =>
                            <MenuItem key={index} value={tz[0]}>{tz[0]} {tz[1]}</MenuItem>)}
                    </Select>
                    <Button type={"submit"}>Save</Button>
                    <hr/>
                    <h3>User Information</h3>
                    {renderMarkdown()}
                </form>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
    )
}