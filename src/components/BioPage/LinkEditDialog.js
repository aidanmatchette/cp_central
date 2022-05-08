import {Button, Dialog, DialogActions, DialogContent, IconButton, Input, MenuItem, Select} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useContext, useState} from "react";
import {useAxios} from "../../utils/useAxios";
import {AuthContext} from "../../context/AuthProvider";

export default function LinkEditDialog({refreshData, link}) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const backend = useAxios()
    const {allChoices} = useContext(AuthContext)

    const saveLink = async (e) => {
        e.preventDefault()
        await backend.put(`/api/v1/user_link/${e.target.id.value}/`, new FormData(e.target))
        await refreshData()
        setDialogOpen(false)
    }

    const deleteLink = async (id) => {
        await backend.delete(`/api/v1/user_link/${id}/`)
        await refreshData()
    }

    return (<>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
            <form onSubmit={saveLink}>
                <DialogContent>
                    <Input type={'hidden'} name={'id'} defaultValue={link.id}/>
                    <Input type={'hidden'} name={'user'} defaultValue={link.user}/>
                    <Select name={"link_type"}
                            defaultValue={link.link_type}
                            fullWidth
                            label={"URL type"}
                    >
                        {allChoices.userLinkTypes.map((tLink) =>
                            <MenuItem key={tLink[0]} value={tLink[0]}>{tLink[1]}</MenuItem>)}
                    </Select>
                    <Input name={"name"}
                           type={"text"}
                           fullWidth
                           defaultValue={link.name}
                           placeholder={"Display name for link"}
                    />
                    <Input name={"url"}
                           type={"url"}
                           fullWidth
                           defaultValue={link.url}
                           placeholder={"URL for link"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Save</Button>
                    <Button onClick={() => deleteLink(link.id)}>Delete</Button>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        <IconButton edge={false} aria-label={"edit"} onClick={() => setDialogOpen(true)}>
            <Edit/>
        </IconButton>
    </>)
}