import {Col} from "react-bootstrap";
import {Check} from "@mui/icons-material";

export default function PostComment({data}) {
        return (
            <>
                <Col xs={1}>{data?.accepted_answer ? <Check/> : null}</Col>
                <Col xs={10}
                     className={"comment-top"}>{data?.originator?.first_name} {data?.originator?.last_name}</Col>
                <Col xs={1}></Col>
                <Col xs={2}></Col>
                <Col xs={10}>{data?.body} </Col>
            </>
        )
    }