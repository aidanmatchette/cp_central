import {Col} from "react-bootstrap";
import {Check, Remove} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAxios } from "../utils/useAxios";
import { useContext } from "react";
import { DayContext } from "../context/DayProvider";
import {AuthContext} from "../context/AuthProvider";

export default function PostComment({data}) {

    const {user} = useContext(AuthContext)
    const backend = useAxios()
    const { setDirty } = useContext(DayContext)
    const canEdit = (user?.id == data?.originator?.id) || user?.is_superuser

    console.log(data)

    const deleteComment = (id) => {
        backend.delete(`/api/v1/forum_comment/${id}`).then((res) => {
            console.log(res)
            window.location.reload()
        })
    }

    const renderDeleteBtn = () => {
        return (        
            <IconButton onClick={() => deleteComment(`${data.id}`)}>
                <Remove/>
            </IconButton>
        )
    }
        return (
            <>
                <Col xs={1}>{data?.accepted_answer ? <Check/> : null}</Col>
                <Col xs={10}
                     className={"comment-top"}>{data?.originator?.first_name} {data?.originator?.last_name}</Col>
                <Col xs={1}></Col>
                <Col xs={2}></Col>
                <Col xs={9}>{data?.body} </Col>
                <Col xs={1}>
                        { canEdit && renderDeleteBtn() }     
                </Col>
            </>
        )
    }