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
    const {allChoices, user} = useContext(AuthContext)
    const [userBio, setUserBio] = useState(null)
    const [dirty, setDirty] = useState(true)
    const [markdownEdit, setMarkdownEdit] = useState(false)
    const canEdit = (user?.id == userBio?.id) || user?.is_superuser

    useEffect(() => {
        backend.get(`/api/v1/user/${userID}/`)
            .then((res) => {
                setUserBio(res.data)
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
        if (markdownEdit) {
            return <TextField multiline
                              rows={20}
                              defaultValue={userBio.markdown}
                              fullWidth
                              name={"markdown"}
            />
        }
        return (
            <div onClick={() => setMarkdownEdit(canEdit && true)}>
                <h3><strong>User Information</strong></h3>
                <div id="markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {userBio.markdown}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }

    if (!userBio) return <></>

    return (
        <Grid container marginTop={4} spacing={1}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4} id="gridOne" textAlign={"center"}>
                <h3 style={{textAlign: "center"}}><strong>{userBio.first_name} {userBio.last_name}</strong></h3>
                <img src={userBio.avatar} alt={"Avatar"} width={'100%'} style={{borderRadius: "30%", width: "300px"}}/>
                <br/>
                {canEdit &&
                    <input accept={"image/*"}
                           type={"file"}
                           name={"avatar"}
                           onChange={imageChange}
                    />
                }
                <br/>
                <div className="gridOne-content">
                    <div id="content-items">
                        <h5><strong>Email:</strong></h5>
                        <span>{userBio.email}</span>
                        <h5 id="connect"><strong> Connect with me:</strong></h5>
                        <UserLinks userID={userID} links={userBio.links} setDirty={setDirty} canEdit={canEdit}/>
                    </div>
                </div>

            </Grid>
            <Grid item xs={6} sx={{marginLeft:"2rem"}} id="gridTwo">
                {/*too lazy to do a proper lookup on default group or change the serializer*/}
                <div id="gridTwo-content">
                    <h3><strong>{userBio?.groups[0]?.name} Cohort</strong></h3>
                    <UserMetaData metadata={userBio.metadata} userID={userID} setUser={setUserBio}/>
                    <form onSubmit={saveUser}>
                        <Select name={"timezone"} defaultValue={userBio.timezone} label={"Time Zone"}
                                sx={{marginTop: "1rem"}} id="gridTwo-form">
                            {allChoices.timeZones.map((tz, index) =>
                                <MenuItem key={index} value={tz[0]}>{tz[0]} {tz[1]}</MenuItem>)}
                        </Select>
                        {canEdit && <Button type={"submit"}>Save</Button>}
                        <hr/>
                        {renderMarkdown()}
                    </form>
                </div>

            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
    )
}