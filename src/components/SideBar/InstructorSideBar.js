import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import { DayContext } from "../../context/DayProvider";
import { Collapse, Divider, ListItemButton, ListItemIcon, ListItemText, List, ListItem, Button, Box} from '@mui/material'
import { styled, ThemeProvider } from "@mui/material/styles";
import theme from '../../utils/theme.js'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import {listItems} from './SideBarData.js'
import { useAxios } from "../../utils/useAxios";


function SideBar() {
  const navigate = useNavigate()
  const { setDirty } = useContext(DayContext) 

  
  const [questionOpen, setQuestionOpen] = useState(false) 
  const [githubOpen, setGithubOpen] = useState(false)
  
  const backend = useAxios()
  const handleGenerateCheckin = () => {
      console.log('generate check-in')
      backend.post('/api/instructor/checkin/').then(response => {
         console.log(response)
          setDirty(true)
      })
  }


  
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
  
  // const handleClick = () => {
  //   setOpen(!open) 
  // }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex'}}>
        {/* <List style={menuSideBarContainer} sx={{justifyContent: 'center', alignItems: 'center'}}> */}
        <CentralSideBar component="nav" disablePadding>
          <ListItemButton component="a" href="https://codeplatoon.org" target="_blank" sx={{justifyContent:'center', height: '35px'}}>
            <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="80" alt='cp-logo'/>
            <h4>Instructors</h4>
          </ListItemButton>
          <Divider />

          {listItems.map((listItem, index) => (
            <ListItem color="primary" sx={{justifyContent: 'center'}} button onClick={() => navigate(listItem.link)} key={index}>
              {/* <ListItemIcon > */}
              {/*   {listItem.listIcon} */}
              {/* </ListItemIcon> */}
              <ListItemIcon >{listItem.listIcon}</ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          ))}
    
          <ListItem button onClick={() => setQuestionOpen(!questionOpen)} >
            <ListItemIcon><QuestionAnswerRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Questionnaires'} />
            {questionOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </ListItem>
          <Box sx={{
              bgcolor: questionOpen ? '#c2c2c2' : null,
            }}>
          <Collapse in={questionOpen} timeout="auto" unmountOnExit>
            <ListItemButton >
              <ListItemText primary="Pair Programming" />
            </ListItemButton>
            <ListItemButton >
              <ListItemText primary="All Questionnaires" />
            </ListItemButton>
          </Collapse>
          </Box>
    
          <ListItem button onClick={() => setGithubOpen(!githubOpen)} >
            <ListItemIcon><GitHubIcon /></ListItemIcon>
            <ListItemText primary={'GitHub'} />
              {githubOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </ListItem>
          <Box sx={{
              bgcolor: githubOpen ? '#c2c2c2' : null,
            }}>
          <Collapse in={githubOpen} timeout="auto" unmountOnExit>
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
            <Button color="secondary" variant="contained" onClick={handleGenerateCheckin} sx={{width: '80%', mt: 3}}>Generate Check-In</Button>
          </Box>
        {/* </List> */}
        {/* </List> */}
        </CentralSideBar>
      </Box>
    </ThemeProvider>

  );
    
}
export default SideBar

