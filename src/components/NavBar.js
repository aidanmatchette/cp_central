import { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { AppBar, Container, Drawer, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography, FormControl, InputLabel, Box, Button } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideBar from './SideBar/SideBar.js'
import InstructorSideBar from './SideBar/InstructorSideBar.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DayContext } from "../context/DayProvider";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function NavBar() {
  const { signout, isSideBarOpen, setIsSideBarOpen, user, token } = useContext(AuthContext)
  const { landingRaw, date, setDate } = useContext(DayContext)
  const navigate = useNavigate()

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const DateButton = forwardRef(({ value, onClick }, ref) => (
    <ThemeProvider theme={theme}>
      <Button color="primary" variant='contained' size="large" onClick={onClick} >{value}</Button>
    </ThemeProvider>
  ))
  return (
    <ThemeProvider theme={theme}>
      <AppBar color='transparent' position='static'>
        <Container >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton onClick={toggleSideBar}>
              <MenuRoundedIcon />
            </IconButton>
            <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="80" alt='cp-logo' />
            <Typography onClick={() => navigate('/')} sx={{ fontWeight: 'bold', fontSize: 30, cursor: 'pointer' }}>Central</Typography>
            <Box sx={{ justifyContent: 'flex-end', display: 'flex', marginLeft: 5, flexGrow: 1 }}>
              <form onSubmit={(e) => navigate(`/search/${e.target.keyword.value}`)}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="cp-search">Search</InputLabel>
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-amount"
                    name="keyword"
                    // value={}
                    // onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start"><SearchRoundedIcon /></InputAdornment>}
                    label="Search" />
                </FormControl>
              </form>
            </Box>
            <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }} >
              <Box sx={{ display: 'flex' }}>
                <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} customInput={<DateButton />} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
              {!token && <Button onClick={() => navigate('/login')} variant="contained" size='large' >LOG IN</Button>}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
              {token && <Button onClick={signout} variant='contained' color="secondary" size='large'
                sx={{ justifyContent: 'flex-end' }}>Log Out</Button>}
            </Box>
            <Drawer open={isSideBarOpen} anchor="left" onClose={toggleSideBar}>
              {user?.is_staff ? <InstructorSideBar />
                : <SideBar />}
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>

  );

}
export default NavBar

