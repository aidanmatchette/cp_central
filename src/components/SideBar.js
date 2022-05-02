import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { Collapse, Divider, ListItemButton, ListItemIcon, ListItemText, List, ListItem, Button, Box} from '@mui/material'
import { styled, ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';



const listItems = [
  {
    listIcon: <HomeRoundedIcon />,
    listText: "Home"
  },
  {
    listIcon: <EventNoteRoundedIcon />,
    listText: "Lecture"
  },
  {
    listIcon: <PeopleAltRoundedIcon />,
    listText: "Students"
  }
];



function SideBar() {
  const navigate = useNavigate()
  
  const [open, setOpen] = useState(false) 
  
  const menuSideBarContainer = {
    width: 250,
    height: "100%",
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center'
  }
  const CentralSideBar = styled(List)({
    '& .MuiListItemButton-root': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  });
  
  const handleClick = () => {
    setOpen(!open) 
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex'}}>
        {/* <List style={menuSideBarContainer} sx={{justifyContent: 'center', alignItems: 'center'}}> */}
        <CentralSideBar component="nav" disablePadding>
          <ListItemButton component="a" href="https://codeplatoon.org" target="_blank" sx={{justifyContent:'center'}}>
            <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="80" alt='cp-logo'/>
          </ListItemButton>
          <Divider />

          {listItems.map((listItem, index) => (
            <ListItem color="primary" sx={{justifyContent: 'center'}} button key={index}>
              {/* <ListItemIcon > */}
              {/*   {listItem.listIcon} */}
              {/* </ListItemIcon> */}
              <ListItemIcon >{listItem.listIcon}</ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          ))}
          <ListItem button onClick={handleClick} >
            <ListItemIcon><QuestionAnswerRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Questionnaires'} />
            {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </ListItem>
          <Box sx={{
              bgcolor: open ? '#c2c2c2' : null,
            }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItemButton >
              <ListItemText primary="Pair Programming" />
            </ListItemButton>
            <ListItemButton >
              <ListItemText primary="All Questionnaires" />
            </ListItemButton>
          </Collapse>
          </Box>
          <ListItem button onClick={handleClick} >
            <ListItemIcon><GitHubIcon /></ListItemIcon>
            <ListItemText primary={'GitHub'} />
              {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </ListItem>
          <Box sx={{
              bgcolor: open ? '#c2c2c2' : null,
            }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItemButton >
              <ListItemText primary="Curriculum" />
            </ListItemButton>
            <ListItemButton >
              <ListItemText primary="All Questionnaires" />
            </ListItemButton>
          </Collapse>
          </Box>

        {/* <List style={menuSideBarContainer}  sx={{justifyContent: 'space-between', alignItems: 'center'}}>  */}
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" sx={{justifyContent: 'center', width: '80%', mt: 3 }}>Daily Check-In</Button>
          </Box>
        {/* </List> */}
        {/* </List> */}
        </CentralSideBar>
      </Box>
    </ThemeProvider>

  );
    
}
export default SideBar

