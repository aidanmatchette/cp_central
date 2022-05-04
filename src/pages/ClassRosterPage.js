import { useEffect, useState } from "react"; 
import { useAxios } from "../utils/useAxios";
import { TableContainer, Table, TableBody, Paper, TableRow, TableHead, TableCell, Typography, Button } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



function ClassRosterPage() {
  
  const backend = useAxios()
  const [roster, setRoster] = useState([])
  
  useEffect(() => {
    backend.get('api/roster/').then(response => {
      console.log('roster -response', response.data)
      setRoster(response.data)
    })
  },[])
  
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
        {member.first_name} 
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
      <TableContainer component={Paper} sx={{margin: "auto", mt: 5, width: '80%'}}>
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
