import {useContext, useEffect, useState} from "react";
import {useAxios} from "../../utils/useAxios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Link,
    Stack,
    TextField,
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/theme.js";
import {AuthContext} from "../../context/AuthProvider";

export default function CohortLinks() {
    let backend = useAxios();
    const {user} = useContext(AuthContext)
    const [cohort, setCohort] = useState();
    const [links, setLinks] = useState();
    const [show, setShow] = useState(false);

    const refreshData = async () => {
        const rawLanding = await backend.get("api/student/landing/");
        setLinks(rawLanding.data?.cohort?.metadata);
        setCohort(rawLanding.data?.cohort);
    };

    useEffect(() => {
        refreshData().then();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        await backend.patch(`api/v1/cohort/${cohort.group.id}/`, new FormData(e.target));
        await refreshData();
        setShow(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <h4 className={"text-center"}>Cohort Links</h4>

            {user?.is_superuser &&
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setShow(true)}
                    fullWidth
                >
                    Edit
                </Button>
            }

            <Stack alignItems={"center"} marginTop={1}>
                {links &&
                    Object.keys(links).map((description, i) => (
                        <Link key={i} target="_blank" href={links[description]}>
                            {description}
                        </Link>
                    ))}
            </Stack>

            <Dialog open={show} onClose={() => setShow(false)} fullWidth>
                <form onSubmit={handleSave}>
                    <DialogContent>
                        <h2>{cohort?.group.name} Links</h2>
                        <TextField
                            fullWidth
                            multiline
                            defaultValue={JSON.stringify(links, null, 2)}
                            name={"metadata"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"}>Save</Button>
                        <Button onClick={() => setShow(false)}>Close</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </ThemeProvider>
    );
}
