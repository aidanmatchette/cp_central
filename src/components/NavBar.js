import { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme.js";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideBar from "./SideBar/SideBar.js";
import InstructorSideBar from "./SideBar/InstructorSideBar.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DayContext } from "../context/DayProvider";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function NavBar() {
  const { signout, isSideBarOpen, setIsSideBarOpen, user, token } =
    useContext(AuthContext);
  const { landingRaw, date, setDate } = useContext(DayContext);
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const doSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${e.target.keyword.value}`);
  };

  let homePage = token
    ? user.is_staff
      ? "/instructor-dashboard"
      : "/student-dashboard"
    : "/login";

  const DateButton = forwardRef(({ value, onClick }, ref) => (
    <ThemeProvider theme={theme}>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={onClick}
      >
        {value}
      </Button>
    </ThemeProvider>
  ));
  return (
    !token ? null :
      <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
          {/* <Container fullWidth> */}
          <Toolbar
            sx={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            {user && (
              <IconButton onClick={toggleSideBar}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <img
              src="./Picture1.png"
              width="100px"       // <----- logo size changes here
              alt="cp-logo"
              onClick={() => navigate(homePage)}
            />

            <Box
              sx={{
                display: "flex",
                marginLeft: 2,
                flexGrow: 1,
              }}
            >
              <form className="search-form" onSubmit={doSearch}>
                <FormControl fullWidth >
                  <InputLabel htmlFor="cp-search">Search</InputLabel>
                  <OutlinedInput
                    size="small"
                    fullWidth
                    id="outlined-adornment-amount"
                    name="keyword"
                    // value={}
                    // onChange={handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    }
                    label="Search"
                  />
                </FormControl>
              </form>
            </Box>
            <Box sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
              <Box sx={{ display: "flex" }}>
                <DatePicker
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  customInput={<DateButton />}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "5px",
              }}
            >
              {!token && (
                <Button
                  onClick={() => navigate("/login")}
                  variant="contained"
                  size="large"
                >
                  LOG IN
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "5px",
              }}
            >
              {token && (
                <Button
                  onClick={signout}
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ justifyContent: "flex-end" }}
                >
                  Log Out
                </Button>
              )}
            </Box>
            <Drawer open={isSideBarOpen} anchor="left" onClose={toggleSideBar}>
              {user?.is_staff ? <InstructorSideBar /> : <SideBar />}
            </Drawer>
          </Toolbar>
          {/*</Container> */}
        </AppBar>
      </ThemeProvider>
  );
}
export default NavBar;
