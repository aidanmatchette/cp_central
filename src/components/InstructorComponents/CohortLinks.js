import {useEffect, useState} from 'react'
import {useAxios} from '../../utils/useAxios'
import {Button, Dialog, DialogActions, DialogContent, Link, Stack, TextField} from "@mui/material";

export default function CohortLinks() {
    let backend = useAxios()
    const [cohort, setCohort] = useState()
    const [links, setLinks] = useState();
    const [show, setShow] = useState(false);

    const refreshData = async () => {
        const rawLanding = await backend.get('api/student/landing/')
        setLinks(rawLanding.data?.cohort?.metadata)
        setCohort(rawLanding.data?.cohort)
        // console.log("cohort log", rawLanding)
    }

    useEffect(() => {
        refreshData().then()
    }, [])

    const handleSave = async (e) => {
        e.preventDefault()
        // console.log("id", cohort.group.id)
        await backend.patch(`api/v1/cohort/${cohort.group.id}/`, new FormData(e.target))
        await refreshData()
        setShow(false)
    }

    return (<>
        <h4 className={"text-center"}>Cohort Links</h4>
        <Button className="btn-orange" onClick={() => setShow(true)} fullWidth>
            Edit
        </Button>

        <Stack alignItems={'center'} marginTop={1}>
            {links && Object.keys(links).map((description, i) =>
                <Link key={i} href={links[description]}>{description}</Link>
            )}
        </Stack>
        <Dialog open={show} onClose={() => setShow(false)} fullWidth>
            <form onSubmit={handleSave}>
                <DialogContent>
                    <h2>{cohort?.group.name} Links</h2>
                    <TextField fullWidth
                               multiline
                               defaultValue={JSON.stringify(links, null, 2)}
                               name={'metadata'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Save</Button>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>)
}