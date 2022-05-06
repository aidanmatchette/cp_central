import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import {DayContext} from "../context/DayProvider";
import {useAxios} from "../utils/useAxios";
import {IconButton, List, ListItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Article, Edit} from "@mui/icons-material";

export default function Questionnaires() {
    const {user, allChoices} = useContext(AuthContext)
    const {landingRaw, setDirty} = useContext(DayContext)
    const backend = useAxios()
    const navigate = useNavigate()

    console.log({landingRaw})
    const createQuestionnaire = (e) => {
        e.preventDefault()
        backend.post('/api/v1/questionnaire/generate/', new FormData(e.target))
            .then((res) => {
                console.log({res})
                setDirty(true)
            })
    }

    const CreateQuestionnaire = () =>{
        return (
            <>
            <h1>Create new</h1>
            <form onSubmit={createQuestionnaire}>
                <input name={'originator'} type={'hidden'} value={user.id} placeholder={"User ID"}/>
                <input name={'name'} type={'text'} defaultValue={`Pair Programming Feedback - ${landingRaw?.date}`}
                       placeholder={"User ID"}/>
                <input name={'group'} type={'hidden'} value={user.id} placeholder={"User ID"}/>
                {/*<label htmlFor={'is_viewable'}>Hidden?</label>*/}
                <input name={'is_viewable'} type={'checkbox'}/>
                <select defaultValue={allChoices.questionnaireTypes[0][0]} name={'type'}>
                    {allChoices.questionnaireTypes.map((qType) => {
                        return (
                            <option key={qType[0]} value={qType[0]}>
                                {qType[1]}
                            </option>
                        )
                    })}
                </select>
                <button type={"submit"}>Create</button>
            </form>
            </>
        )
    }

    return (
        <div>
            {user?.is_superuser && <CreateQuestionnaire/>}
            <h2>Current Questionnaires</h2>
            <List>
                {landingRaw?.questionnaires.map((q)=>{
                    return(
                        <ListItem key={q.id}>
                            {user?.is_superuser &&
                                <IconButton onClick={() => navigate(`/questionnaireEdit/${q.id}`)}>
                                    <Edit/>
                                </IconButton>
                            }
                            <IconButton onClick={()=>navigate(`/questionnaireFill/${q.id}`)}>
                                <Article/>
                            </IconButton>
                            {q.name}
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}