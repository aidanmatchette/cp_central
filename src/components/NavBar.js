import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { AppBar, Container, Drawer, IconButton, MenuItem, Select, Toolbar, Typography, FormControl, InputLabel, Box, Button } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideBar from './SideBar.js'


function NavBar() {
  const {signout, isSideBarOpen, setIsSideBarOpen} = useContext(AuthContext)
  const navigate = useNavigate()
  
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }; 

  return (
    <ThemeProvider theme={theme}>
      <AppBar color='transparent' position='static'>
        <Container >
          
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
              <IconButton onClick={toggleSideBar}>
                <MenuRoundedIcon />
              </IconButton>            
              <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="80" alt='cp-logo'/>
                <Typography onClick={() => navigate('/')} sx={{fontWeight: 'bold', fontSize:30, cursor: 'pointer'}}>Central</Typography>
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', marginLeft: 5 }}>
                        <Button sx={{'hover': {backgroundColor:'secondary'}}} onClick={() => navigate('/instructorPage')} size='large' >Instructor Page</Button>
                        <Button sx={{'hover': {backgroundColor:'secondary'}}} onClick={() => navigate('/studentPage')} size='large' >Student Page</Button>
                        <Button onClick={() => navigate('/login')} size='large' >LOG IN</Button>
                    </Box> 
                    <Box sx={{flexGrow: 1, justifyContent: 'flex-end', display: 'flex', marginLeft: 5 }} >
                        <FormControl color="secondary" size="small" sx={{ m: 1, minWidth: 120, justifyContent: 'fex-end'}}>
                            <InputLabel color="secondary" id="select-common-links-label">Common Links</InputLabel>
                            <Select labelId="select-common-links" id="select-standard"
                                value={"TEST"} label="Common Links" color="secondary">
                            <MenuItem value={'test'}>LINK 1</MenuItem>
                            <MenuItem value={'test'}>LINK 2</MenuItem>
                            <MenuItem value={'test'}>LINK 3</MenuItem>
                            <MenuItem value={'test'}>LINK 4</MenuItem>
                            <MenuItem value={'test'}>LINK 5</MenuItem> 

                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px'}}>
                      <Button onClick={signout} variant='contained' color="secondary" size='large' 
                        sx={{justifyContent: 'flex-end'}}>Log Out</Button>
                    </Box> 
                <Drawer open={isSideBarOpen} anchor="left" onClose={toggleSideBar}>
                  <SideBar /> 
                </Drawer>
            </Toolbar>
        </Container>
      </AppBar> 
    </ThemeProvider>

  );
    
}
export default NavBar

