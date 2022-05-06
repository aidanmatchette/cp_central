import {useContext, useEffect, useState} from "react";
import { useAxios } from "../utils/useAxios";
import {
    TableContainer,
    Box,
    Container,
    Switch,
    Table,
    TableBody,
    Paper,
    TableRow,
    TableHead,
    FormGroup,
    FormControlLabel,
    TableCell,
    Typography,
    Button,
    Icon
} from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from "react-router-dom";
import {Check} from "@mui/icons-material";
import {DayContext} from "../context/DayProvider";


function ClassRosterPage() {
  
  const backend = useAxios()
  const [roster, setRoster] = useState([])
  const [checkedIn, setCheckedIn] = useState(false)
    const [checkedInIds, setcheckedInIds] = useState([])
    const {landingRaw} = useContext(DayContext)
  
  useEffect(() => {
    backend.get('api/roster/').then(response => {
      // console.log('roster -response', response.data)
      setRoster(response.data.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())))
    })
  },[landingRaw])
  
  
  const handleSwitchClick = () => {
    setCheckedIn(!checkedIn)
    if (!checkedIn) {
      backend.get('api/instructor/checkin/',{"params":{"date":landingRaw.date}})
          .then(response => {
        console.log('checked in ------>',response.data)
              setcheckedInIds(response.data?.checked_in)
        // setRoster(response.data.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())))
      })
    }else{
        setcheckedInIds([])
    }
  }

  const classTable = roster?.map((member, index) => {
    let memberType = null
    if (member.is_superuser) {
      memberType = "Instructor" 
    } else if(member.is_staff && !member.is_superuser) {
      memberType = "TA"
    } else {
      memberType = "Student"
    }
    return (
      <TableRow 
        key={member.first_name} 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row">
            {checkedInIds?.includes(member.id) && <Icon><Check/></Icon>}
            <Link to={`/biopage/${member.id}`}>{member.first_name} </Link>
        </TableCell> 
        <TableCell align="center">{member.last_name}</TableCell>
        <TableCell align="center">{memberType}</TableCell> 
        <TableCell align="center">{member.timezone}</TableCell> 
        <TableCell align="center">{member?.email}</TableCell>
          {/*TODO this should be a lookup instead of pulling index (they may have more than one or none)*/}
        <TableCell align="center"><a href={member?.links[0]?.url} target="_blank"><LinkedInIcon sx={{fontSize: '30px'}} /></a></TableCell>
        <TableCell align="center"><a href={member?.links[1]?.url} target="_blank"><GitHubIcon sx={{fontSize: '30px'}}/></a></TableCell>
      </TableRow> 
        
    )     
  })
  
  // console.log(roster)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{margin: "auto",  width: '80%'}}>
          <FormControlLabel control={<Switch  checked={checkedIn} onChange={handleSwitchClick}/> } label="Checked-In" sx={{fontWeight: 800}}/>
      </Box>
      <TableContainer component={Paper} sx={{margin: "auto",  width: '80%'}}>
      <Table sx={{ minWidth: 550,}} aria-label="simple table">
        <TableHead sx={{backgroundColor: "rgba(255, 85, 0, .4)"}}>
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
        <TableBody>
        {classTable}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider> 
  );
}


export default ClassRosterPage 
