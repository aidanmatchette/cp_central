import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import {DayContext} from "../context/DayProvider";
import {useAxios} from "../utils/useAxios";
import {
    Box, Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    Input,
    List,
    ListItem,
    MenuItem,
    Select
} from "@mui/material";
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
                // TODO not page refreshing on custom questionnaires (works for regular)
                // Need to pull directly
            })
    }

    const CreateQuestionnaire = () => {
        return (
            <Box style={{textAlign:"center"}}>

                <h1 >Create new</h1>
                <form onSubmit={createQuestionnaire}>
                    <Input name={'originator'} type={'hidden'} value={user.id} placeholder={"User ID"} />
                    <Input name={'name'} type={'text'} defaultValue={`Pair Programming Feedback - ${landingRaw?.date}`}
                           placeholder={"User ID"} fullWidth/>
                    <Input name={'group'} type={'hidden'} value={user.id} placeholder={"User ID"} />
                    <Select defaultValue={allChoices.questionnaireTypes[0][0]} name={'type'} fullWidth>
                        {allChoices.questionnaireTypes.map((qType) => {
                            return (
                                <MenuItem key={qType[0]} value={qType[0]}>
                                    {qType[1]}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormControlLabel control={<Checkbox name={'is_viewable'} type={'checkbox'}/>} label={"Viewable?"} />
                    <Button type={"submit"}>Create</Button>
                </form>
            </Box>
        )
    }

    return (
        <Box sx={{marginInline: "20%", marginTop: "2rem"}}>
            {user?.is_superuser && <CreateQuestionnaire/>}
            <h2>Current Questionnaires</h2>
            <List className="box-shadow">
                {landingRaw?.questionnaires.map((q) => {
                    return (
                        <ListItem key={q.id}>
                            {user?.is_superuser &&
                                <IconButton onClick={() => navigate(`/questionnaireEdit/${q.id}`)}>
                                    <Edit/>
                                </IconButton>
                            }
                            <IconButton onClick={() => navigate(`/questionnaireFill/${q.id}`)}>
                                <Article/>
                            </IconButton>
                            {q.name}
                        </ListItem>
                    )
                })}
            </List>

        </Box>
    )
}