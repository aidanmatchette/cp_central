import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Input, Link,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText, MenuItem, Select
} from "@mui/material";
import {Add, Edit} from "@mui/icons-material";
import {useAxios} from "../../utils/useAxios";

export default function UserLinks({links, setDirty, userID}) {
    const {allChoices} = useContext(AuthContext)
    const backend = useAxios()
    const [showAdd, setShowAdd] = useState(false)

    const saveLink = (e) => {
        e.preventDefault()
        let d = new FormData(e.target)
        backend.put(`/api/v1/user_link/${e.target.id.value}/`, d)
            .then((res)=>console.log("put", res))
        setDirty(true)
    }

    const deleteLink = (id) => {
      backend.delete(`/api/v1/user_link/${id}/`)
            .then((res)=>console.log("delete", res))
        setDirty(true)
    }

    const addLink = (e) => {
        e.preventDefault()
        backend.post('/api/v1/user_link/', new FormData(e.target))
            .then((res)=>console.log({res}))
        setShowAdd(false)
        setDirty(true)
    }

    const LinkDialog = ({dialogOpen, setDialogOpen, link}) => {
        return (
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
                        <Button onClick={()=>deleteLink(link.id)}>Delete</Button>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

    const AddDialog = () =>{
        return (
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
        )
    }

    const UserLink = ({link}) => {
        const [dialogOpen, setDialogOpen] = useState(false)

        return (
            <ListItem>
                <LinkDialog {...{dialogOpen, setDialogOpen, link}} />
                <IconButton edge={false} aria-label={"edit"} onClick={() => setDialogOpen(true)}>
                    <Edit/>
                </IconButton>
                <Link id="social-links" href={link.url}><strong>{link.name}</strong></Link>
            </ListItem>
        )
    }

    return (
        <List id="user-links">
            {links.map((link) => <UserLink key={link.id} link={link}/>)}
                <AddDialog />
            <IconButton onClick={()=>setShowAdd(true)}>
                <Add/>
            </IconButton>
        </List>
    )
}