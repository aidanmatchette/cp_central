import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import UserMetaData from "../components/BioPage/UserMetaData";
import UserLinks from "../components/BioPage/UserLinks";
import {AuthContext} from "../context/AuthProvider";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import BioImage from "../components/BioPage/BioImage";

export default function BioPage() {
    const {userID} = useParams()
    const backend = useAxios()
    const {allChoices, user} = useContext(AuthContext)
    const [userBio, setUserBio] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const canEdit = (user?.id == userBio?.id) || user?.is_superuser

    const refreshData = async () => {
        // Get own bio page if not specified in params
        const id = userID ? userID : user.id
        const results = await backend.get(`/api/v1/user/${id}/`)
        setUserBio(results.data)
    }

    useEffect(() => {refreshData().then()}, [userID])

    const saveUser = (e) => {
        e.preventDefault()
        backend.patch(`/api/v1/user/${userID}/`, new FormData(e.target))
            .then((res) => {
                console.log({res})
                setIsEdit(false)
                setUserBio(res.data)
            })
    }


    const Markdown = () => {
        if (isEdit) {
            return <TextField multiline
                              rows={20}
                              defaultValue={userBio.markdown}
                              fullWidth
                              name={"markdown"}
            />
        }
        return (
            <div>
                <h3><strong>User Information</strong></h3>
                <div id="markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {userBio.markdown}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }

    const EditToggle = () => {
        const toggleEdit = (e) => {
            e.preventDefault()
            setIsEdit(!isEdit)
        }
        if (!canEdit) return null
        if (isEdit) return <Button type={"submit"}>Save</Button>
        return <Button onClick={toggleEdit}>Edit</Button>
    }

    if (!userBio) return <>No bio data</>

    return (
        <Grid container marginTop={4} spacing={1}>
            <Grid item xs={1}/>

            <Grid item xs={4} id="gridOne" textAlign={"center"}>
                <h3 style={{textAlign: "center"}}><strong>{userBio.first_name} {userBio.last_name}</strong></h3>
                <BioImage canEdit={canEdit} propAvatar={userBio.avatar} userID={userID}/>
                <div className="gridOne-content">
                    <div id="content-items">
                        <h5><strong>Email:</strong></h5>
                        <span>{userBio.email}</span>
                        <h5 id="connect"><strong> Connect with me:</strong></h5>
                        <UserLinks userID={userID} propLinks={userBio.links} canEdit={canEdit} />
                    </div>
                </div>
            </Grid>

            <Grid item xs={6} sx={{marginLeft: "2rem"}} id="gridTwo">
                <form onSubmit={saveUser}>
                    <EditToggle/>
                    {/*too lazy to do a proper lookup on default group or change the serializer*/}
                    <div id="gridTwo-content">
                        <h3><strong>{userBio?.groups[0]?.name} Cohort</strong></h3>
                        <UserMetaData metadata={userBio.metadata} edit={isEdit}/>
                        <Select name={"timezone"}
                                defaultValue={userBio.timezone}
                                label={"Time Zone"}
                                sx={{marginTop: "1rem"}}
                                inputProps={{readOnly: !isEdit}}
                        >
                            {allChoices.timeZones.map((tz, index) =>
                                <MenuItem key={index} value={tz[0]}>{tz[0]} {tz[1]}</MenuItem>)}
                        </Select>
                        <hr/>
                        <Markdown/>
                    </div>
                </form>
            </Grid>

            <Grid item xs={1}/>
        </Grid>
    )
}