import {Col} from "react-bootstrap";
import {Check, CheckBoxOutlineBlank, Remove} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAxios } from "../utils/useAxios";
import { useContext, useState } from "react";
import { DayContext } from "../context/DayProvider";
import {AuthContext} from "../context/AuthProvider";

export default function PostComment({data}) {

    const {user} = useContext(AuthContext)
    const backend = useAxios()
    const { setDirty } = useContext(DayContext)
    const [select, setSelect] = useState(false)
    const [comment, setComment] = useState(true)
    const canEdit = (user?.id == data?.originator?.id) || user?.is_superuser

    console.log(data)

    const deleteComment = (id) => {
        backend.delete(`/api/v1/forum_comment/${id}`).then((res) => {
            console.log(res)
            setComment(false)
        })
    }

    const renderDeleteBtn = () => {
        return (        
            <IconButton onClick={() => deleteComment(`${data.id}`)}>
                <Remove/>
            </IconButton>
        )
    }

    const selectComment = () => {
        backend.patch(`/api/v1/forum_comment/${data.id}/`, {"accepted_answer": "true"}).then((res) => {
            console.log(res)
            setSelect(true)
        })
    }
    const renderCheckbox = () => {
        if (canEdit) {
            return <IconButton onClick={() => selectComment()}><CheckBoxOutlineBlank/></IconButton>
        }
        return null
    }

    const displayComments = () => {
        return (
            <>
                <Col xs={1}>{data?.accepted_answer || select ? <Check/> : renderCheckbox() }</Col>
                <Col xs={10} className={"comment-top"}>{data?.originator?.first_name} {data?.originator?.last_name}</Col>
                <Col xs={1}></Col>
                <Col xs={2}></Col>
                <Col xs={9}>{data?.body} </Col>
                <Col xs={1}> { canEdit && renderDeleteBtn() }</Col>
            </> )
    }

    return (
        <>
            { comment && displayComments()}
        </>    
        )
    }