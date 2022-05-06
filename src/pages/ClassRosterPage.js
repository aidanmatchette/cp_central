import { useEffect, useState } from "react"; 
import { useAxios } from "../utils/useAxios";
import { TableContainer, Box, Container, Switch, Table, TableBody, Paper, TableRow, TableHead, FormGroup, FormControlLabel, TableCell, Typography, Button } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from "react-router-dom";


function ClassRosterPage() {
  
  const backend = useAxios()
  const [roster, setRoster] = useState([])
  const [checkedIn, setCheckedIn] = useState(false)
  
  useEffect(() => {
    backend.get('api/roster/').then(response => {
      console.log('roster -response', response.data)
      setRoster(response.data.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())))
    })
  },[])
  
  
  const handleSwitchClick = () => {
    setCheckedIn(!checkedIn)
    if (!checkedIn) {
      backend.get('api/instructor/checkin/').then(response => {
        console.log('checked in ------>',response.data)
        // setRoster(response.data.sort((a, b) => a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase())))
      })
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
            <Link to={`/biopage/${member.id}`}>{member.first_name} </Link>
        </TableCell> 
        <TableCell align="center">{member.last_name}</TableCell>
        <TableCell align="center">{memberType}</TableCell> 
        <TableCell align="center">{member.timezone}</TableCell> 
        <TableCell align="center">{member.email}</TableCell> 
        <TableCell align="center"><a href={member.links[0].url} target="_blank"><LinkedInIcon sx={{fontSize: '30px'}} /></a></TableCell> 
        <TableCell align="center"><a href={member.links[1]?.url} target="_blank"><GitHubIcon sx={{fontSize: '30px'}}/></a></TableCell> 
      </TableRow> 
        
    )     
  })
  
  console.log(roster)
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
