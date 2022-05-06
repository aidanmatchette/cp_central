import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, IconButton,
    Input,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useAxios} from "../../utils/useAxios";
import {AuthContext} from "../../context/AuthProvider";
import {Delete, Edit} from "@mui/icons-material";

export default function QuestionItem({question, setParentDirty}) {
    const [isEditAnswers, setIsEditAnswers] = useState(false)
    const [isEditQuestion, setIsEditQuestion] = useState(false)
    const [questOptions, setQuestOptions] = useState()
    const [dirty, setDirty] = useState(true)
    const {allChoices} = useContext(AuthContext)
    const backend = useAxios()

    useEffect(() => {
        setDirty(false)
        backend.get(`/api/v1/question/${question.id}/responses/`)
            .then((res) => {
                // console.log("question", res?.data)
                setQuestOptions(res?.data?.question_options)
            })
    }, [dirty])

    const addResponse = (e) => {
        e.preventDefault()
        backend.post('/api/v1/question_option/', new FormData(e.target))
            .then((res) => {
                // console.log("add post", res)
                setDirty(true)
            })
    }

    const saveQuestion = (e) => {
        e.preventDefault()
        backend.patch(`/api/v1/question/${question.id}/`, new FormData(e.target))
            .then((res) => {
                // console.log("updated question", res)
                setDirty(true)
                setIsEditQuestion(false)
                setParentDirty(true)
            })
    }

    const deleteResponse = (opt) => {
        backend.delete(`/api/v1/question_option/${opt.id}/`)
            .then(()=>setDirty(true))
    }

    return (
        <ListItem>
            <Button onClick={() => setIsEditQuestion(true)}>Edit Question</Button>
            <Button onClick={() => setIsEditAnswers(true)}>Edit Answers</Button>
            <ListItemText>
                {question.text}
            </ListItemText>

            {/*Edit Question*/}
            <Dialog open={isEditQuestion} onClose={() => setIsEditQuestion(false)}>
                <form onSubmit={saveQuestion}>
                    <DialogContent>
                        <Input name={'text'} fullWidth placeholder={"Question"} defaultValue={question.text}/>
                        <Select name={'response_type'}
                                defaultValue={question?.response_type}
                                fullWidth
                                label={"Response Type"}
                        >
                            {allChoices?.questionResponseTypes.map((qrType) =>
                                <MenuItem key={qrType[0]} value={qrType[0]}>{qrType[1]}</MenuItem>
                            )}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"}>Save</Button>
                        <Button onClick={() => setIsEditQuestion(false)}>Close</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/*Edit Answers*/}
            <Dialog open={isEditAnswers} onClose={() => setIsEditAnswers(false)} sx={{height:"75vh"}}>
                <DialogContent>
                    <form onSubmit={addResponse}>
                        <Input name={'question_text'} type={'text'} placeholder={"Enter response"}/>
                        <Input name={'question'} type={'hidden'} defaultValue={question.id}/>
                        <Button type={"submit"}>Add</Button>
                    </form>
                    <List>
                        {questOptions?.map((opt) => {
                            return (
                                <ListItem key={opt.id} secondaryAction={
                                    <IconButton edge={'end'} aria-label={'delete'} onClick={()=>deleteResponse(opt)}>
                                        <Delete/>
                                    </IconButton>
                                }>
                                    <ListItemText>{opt.question_text}</ListItemText>

                                </ListItem>
                            )
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditAnswers(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )
}