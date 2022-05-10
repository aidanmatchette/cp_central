import {useContext, useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {
    Box,
    Button,
    FormControlLabel,
    Icon,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../utils/theme";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {Link} from "react-router-dom";
import {Check} from "@mui/icons-material";
import {DayContext} from "../context/DayProvider";
import dayjs from "dayjs";

export default function ClassRosterPage() {
    const backend = useAxios();
    const [roster, setRoster] = useState([]);
    const [checkedIn, setCheckedIn] = useState(false);
    const {date} = useContext(DayContext);

    const sortFirst = (a, b) =>
        a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())

    const refreshData = async () => {
        const params = {params: {date: dayjs(date).format("YYYY-MM-DD")}}
        const result = await backend.get('/api/instructor/checkin/', params)
        setRoster(result.data.sort(sortFirst));
    }

    useEffect(() => {
        refreshData().then()
        if (process.env.REACT_APP_USE_POLLING === 'true') {
            const timer = setInterval(refreshData, 3000)
            return () => clearInterval(timer)
        }
    }, [date]);

    const presentColor = (member) => {
        if (checkedIn)
            if (member.present)
                return "lightgreen"
            else
                return "yellow"
        return ""
    }

    const classTable = roster?.map((member, index) => {
        const gitHub = member.links.find((link) => link.link_type === 1)?.url
        const linkedIn = member.links.find((link) => link.link_type === 2)?.url

        let memberType;
        if (member.is_superuser) {
            memberType = "Instructor";
        } else if (member.is_staff && !member.is_superuser) {
            memberType = "TA";
        } else {
            memberType = "Student";
        }
        return (
            <TableRow
                key={member.id}
                sx={{"&:last-child td, &:last-child th": {border: 0}, backgroundColor: presentColor(member)}}
            >
                <TableCell component="th" scope="row">
                    {checkedIn && member.present &&
                        <Icon>
                            <Check/>
                        </Icon>
                    }
                    <Button component={Link} to={`/biopage/${member.id}`}
                            sx={{":hover": {color: "#118888"}}}>{member.first_name}</Button>
                    {/*<Link className="bio-link" to={`/biopage/${member.id}`}>{member.first_name}</Link>*/}
                </TableCell>
                <TableCell align="center">{member.last_name}</TableCell>
                <TableCell align="center">{memberType}</TableCell>
                <TableCell align="center">{member.timezone}</TableCell>
                <TableCell align="center">{member?.email}</TableCell>
                <TableCell align="center">
                    <IconButton href={linkedIn} target="_blank" sx={{":hover": {color: "#118888"}}}>
                        <LinkedInIcon sx={{fontSize: "30px"}}/>
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton href={gitHub} target="_blank" sx={{":hover": {color: "#118888"}}}>
                        <GitHubIcon sx={{fontSize: "30px"}}/>
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: "auto", width: "80%"}}>
                <FormControlLabel
                    control={<Switch checked={checkedIn} onChange={() => setCheckedIn(!checkedIn)}/>}
                    label="Checked-In"
                    sx={{fontWeight: 800}}
                />
            </Box>
            <TableContainer component={Paper} sx={{margin: "auto", width: "80%"}}>
                <Table sx={{minWidth: 550}} aria-label="simple table">
                    <TableHead sx={{backgroundColor: "rgba(255, 85, 0, .8)"}}>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Member Type</TableCell>
                            <TableCell align="center">Time Zone</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">LinkedIn</TableCell>
                            <TableCell align="center">GitHub</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{classTable}</TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}