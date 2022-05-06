import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Box, Input} from "@mui/material";

export default function QuestionnaireFill() {
    const {questionnaireID} = useParams()
    const [fillQuestion, setFillQuestion] = useState()
    const backend = useAxios()

    useEffect(() => {
        backend.post(`/api/v1/filled_questionnaire/start/`, {questionnaireID: questionnaireID})
            .then((res) => {
                console.log("start", res.data)
                setFillQuestion(res.data)
            })
    }, [questionnaireID])

    const Question = ({q}) => {
        const getAnswer = () => {
            // searches through responses to see if there is an answered response to the question "q"
            let answers = fillQuestion.question_responses.filter((e)=>e.question.id===q.id)
            if (answers == []) return null
            return answers[0]
        }

        const saveInfo = (e) => {
            let data = {
                fquestionnaireID: fillQuestion.id,
                questionID: q.id,
                response_text: e.target.value
            }
            backend.post('/api/v1/question_option/save_answer/', data)
                .then((res)=>{
                    // console.log("saved", res.data)
                    setFillQuestion(res.data)
                })
        }

        return (
            //
            <div>
                <div> {q.text} </div>
                <Input name={'text'} placeholder={"Answer"} defaultValue={getAnswer()?.response_text} onBlur={saveInfo}/>
            </div>
        )
    }

    return (
        <Box sx={{marginInline: "20%", marginTop: "2rem"}}>
            <h2>{fillQuestion?.questionnaire?.name}</h2>
            {fillQuestion?.questionnaire?.questions?.map(q => <Question key={q.id} q={q}/>)}
        </Box>
    )
}