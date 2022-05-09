import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Button, Container, Grid, MenuItem, Select, TextField} from "@mui/material";
import UserMetaData from "../components/BioPage/UserMetaData";
import UserLinks from "../components/BioPage/UserLinks";
import {AuthContext} from "../context/AuthProvider";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import BioImage from "../components/BioPage/BioImage";
import {Col, Row} from "react-bootstrap";

export default function BioPage() {
    const {userID} = useParams()
    const backend = useAxios()
    const {allChoices, user} = useContext(AuthContext)
    const [userBio, setUserBio] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const canEdit = (user?.id == userBio?.id) || user?.is_superuser

    const id = userID ? userID : user.id

    const refreshData = async () => {
        // Get own bio page if not specified in params
        const results = await backend.get(`/api/v1/user/${id}/`)
        setUserBio(results.data)
    }

    useEffect(() => {
        refreshData().then()
    }, [userID])

    const saveUser = async (e) => {
        e.preventDefault()
        const result = await backend.patch(`/api/v1/user/${id}/`, new FormData(e.target))
        console.log({result})
        setIsEdit(false)
        setUserBio(result.data)
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
            <>
                <h3><strong>User Information</strong></h3>

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {userBio.markdown}
                </ReactMarkdown>

            </>
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
        <form onSubmit={saveUser}>
            <Row className={'mx-5 mt-4'}>
                <Col className={'pageSection primary'}> <Row>
                    <Col xs={12}>
                        <EditToggle/>
                        {/*too lazy to do a proper lookup on default group or change the serializer*/}
                        <div>
                            <h3><strong>{userBio?.groups[0]?.name} Cohort</strong></h3>
                            <UserMetaData metadata={userBio.metadata} edit={isEdit}/>
                        </div>

                    </Col>

                    <Col xs={12}>
                        <Markdown/>
                    </Col>

                </Row> </Col>
                <Col className={'pageSection secondary'} xs={5}> <Row>

                    <Col className={'text-center'} xs={12}>
                        <h3>
                            <strong>{userBio.first_name} {userBio.last_name}</strong>
                        </h3>
                        <BioImage canEdit={canEdit} avatar={userBio.avatar} userID={userID}/>
                    </Col>

                    <Col xs={12} className={'text-center'}>
                        <h5><strong>{userBio.email}</strong></h5>

                        <Select name={"timezone"}
                                defaultValue={userBio.timezone}
                                label={"Time Zone"}
                                sx={{marginTop: "1rem"}}
                                inputProps={{readOnly: !isEdit}}
                        >
                            {allChoices.timeZones.map((tz, index) =>
                                <MenuItem key={index} value={tz[0]}>{tz[0]} {tz[1]}</MenuItem>)}
                        </Select>
                    </Col>

                    <Col xs={12}>
                        <h5><strong> Connect with me</strong></h5>
                        <UserLinks userID={userID} propLinks={userBio.links} canEdit={canEdit}/>
                    </Col>

                </Row>
                </Col>
            </Row>
        </form>
    )
}