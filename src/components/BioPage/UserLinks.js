import {useState} from "react";
import {Link, List, ListItem} from "@mui/material";
import {useAxios} from "../../utils/useAxios";
import LinkAddDialog from "./LinkAddDialog";
import LinkEditDialog from "./LinkEditDialog";

export default function UserLinks({propLinks, userID, canEdit}) {
    const backend = useAxios()
    const [links, setLinks] = useState(propLinks)

    const refreshData = async () => {
        // TODO make a new endpoint for just grabbing user links instead of pulling the entire user
        const results = await backend.get(`/api/v1/user/${userID}/`)
        setLinks(results.data.links)
    }

    return (
        <List id="user-links" dense>
            {links.map((link) => {
                return (
                    <ListItem key={link.id}>
                        <LinkEditDialog {...{refreshData, link}} />
                        <Link id="social-links" target="_blank" href={link.url}>
                            <strong>{link.name}</strong>
                        </Link>
                    </ListItem>
                )
            })}
            {canEdit && <LinkAddDialog {...{userID, refreshData}}/>}
        </List>
    )
}
