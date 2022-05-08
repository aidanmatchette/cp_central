import {Button, Dialog, DialogActions, DialogContent, IconButton, Input, MenuItem, Select} from "@mui/material";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";
import {useAxios} from "../../utils/useAxios";
import {Add} from "@mui/icons-material";

export default function LinkAddDialog({userID, refreshData}) {
    const {allChoices} = useContext(AuthContext)
    const backend = useAxios()
    const [showAdd, setShowAdd] = useState(false)

    const addLink = async (e) => {
        e.preventDefault()
        await backend.post('/api/v1/user_link/', new FormData(e.target))
        setShowAdd(false)
        await refreshData()
    }

    return (<>
        <Dialog open={showAdd} onClose={() => setShowAdd(false)} fullWidth>
            <form onSubmit={addLink}>
                <DialogContent>
                    <Input type={'hidden'} name={'user'} defaultValue={userID}/>
                    <Select name={"link_type"}
                            defaultValue={0}
                            fullWidth
                            label={"URL type"}
                    >
                        {allChoices.userLinkTypes.map((tLink) =>
                            <MenuItem key={tLink[0]} value={tLink[0]}>{tLink[1]}</MenuItem>)}
                    </Select>
                    <Input name={"name"}
                           type={"text"}
                           fullWidth
                           defaultValue={"http://"}
                           placeholder={"Display name for link"}
                    />
                    <Input name={"url"}
                           type={"url"}
                           fullWidth
                           defaultValue={"http://"}
                           placeholder={"URL for link"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Save</Button>
                    <Button onClick={() => setShowAdd(false)}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        <IconButton onClick={() => setShowAdd(true)}>
            <Add/>
        </IconButton>
    </>)
}