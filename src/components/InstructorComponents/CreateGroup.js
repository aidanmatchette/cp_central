import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControlLabel, List,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import dayjs from "dayjs";
import {useAxios} from "../../utils/useAxios";

export default function CreateGroup({refreshData}) {
    const [openAdd, setOpenAdd] = useState(false)
    const backend = useAxios()
    const currentDate = dayjs().format("YYYY-MM-DD")

    const addGroup = async (e) =>{
        e.preventDefault()
        let formData = new FormData(e.target)
        const result = await backend.post('/api/v1/activity/random_group/', formData)
        console.log({result})
    }

    return (<>
        <Button className={'btn-orange'} fullWidth onClick={() => setOpenAdd(true)}>Create Group</Button>
        <Dialog open={openAdd} onClose={() => setOpenAdd(!openAdd)}>
            <form onSubmit={addGroup}>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField name={'name'} defaultValue={`Pairs ${dayjs().format("MM-DD")}`} label={"Activity Name"}/>
                        <TextField name={'date'} defaultValue={currentDate} label={"Date"}/>
                        <TextField select defaultValue={2} label={"Group Size"} name={'group_size'}>
                            {[2, 3, 4, 5, 6].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                        </TextField>
                        <FormControlLabel control={<Checkbox name={'only_checked_in'} defaultChecked/>}
                                          label={"Only checked in"}/>
                        <FormControlLabel control={<Checkbox name={'include_staff'}/>}
                                          label={"Include Staff"}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Create</Button>
                    <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        <List>

        </List>
    </>)
}