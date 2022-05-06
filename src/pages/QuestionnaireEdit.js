import {useParams} from "react-router-dom";
import {Button, Input, Link, List} from "@mui/material";
import {useAxios} from "../utils/useAxios";
import {useEffect, useState} from "react";
import QuestionItem from "../components/Questionnaires/QuestionItem";

export default function QuestionnaireEdit() {
    const {questionnaireID} = useParams()
    const [dirty, setDirty] = useState(true)
    const [questionnaire, setQuestionnaire] = useState(null)
    const backend = useAxios()

    useEffect(() => {
        setDirty(false)
        backend.get(`/api/v1/questionnaire/${questionnaireID}/`)
            .then((res) => setQuestionnaire(res.data))
    }, [questionnaireID, dirty])

    const addQuestion = (e) => {
        e.preventDefault()
        backend.post('/api/v1/question/', new FormData(e.target))
            .then((res) => {
                console.log("question added", res)
                setDirty(true)
            })
    }

    return (
        <div>
            <h1>{questionnaire?.name}</h1>
            <form onSubmit={addQuestion}>
                <Input name={'text'} fullWidth placeholder={"Question"}/>
                <Input name={'questionnaire'} type={'hidden'} defaultValue={questionnaireID}/>
                <Button type={"submit"}>Add</Button>
            </form>
            <List>
                {questionnaire && questionnaire.questions.map((question) =>
                    <QuestionItem key={question.id} question={question} setParentDirty={setDirty}></QuestionItem>
                )}
            </List>
            <Link href={"/#/questionnaires"}>Back</Link>
        </div>
    )

}