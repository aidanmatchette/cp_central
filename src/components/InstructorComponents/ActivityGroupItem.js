import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useAxios} from "../../utils/useAxios";

export default function ActivityGroupItem({activity, refreshData}) {
    const [openEdit, setOpenEdit] = useState(false)
    const backend = useAxios()

    const deleteActivity = async () => {
        await backend.delete(`/api/v1/activity/${activity.id}/`)
        setOpenEdit(false)
        await refreshData()
    }

    return (<>
        <ListItemButton onClick={() => setOpenEdit(true)}>
            <ListItemText>{activity.size}-{activity.name}</ListItemText>
        </ListItemButton>
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
            <DialogContent>
                <Row>
                    {activity?.activity_groups?.map((aGroup) => {
                        return (
                            <Col xs={4}>
                                <List className={'list-box'}>
                                    {aGroup.members.map((member) =>
                                        <ListItem>
                                            {member.first_name} {member.last_name}
                                        </ListItem>)}
                                </List>
                            </Col>
                        )
                    })}
                </Row>
            </DialogContent>
            <DialogActions>
                <Button color={'error'} onClick={deleteActivity}>Delete</Button>
                <Button onClick={() => setOpenEdit(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    </>)
}