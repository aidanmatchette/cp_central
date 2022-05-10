import {forwardRef, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Toolbar,
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../utils/theme.js";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideBar from "./SideBar/SideBar.js";
import InstructorSideBar from "./SideBar/InstructorSideBar.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DayContext} from "../context/DayProvider";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function NavBar() {
  const { signout, isSideBarOpen, setIsSideBarOpen, user, token } =
    useContext(AuthContext);
  const { date, setDate } = useContext(DayContext);
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
              src="https://elasticbeanstalk-us-east-2-887031583111.s3.us-east-2.amazonaws.com/Picture1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLWVhc3QtMSJHMEUCIB2Y6jeeHTmOACNz8l8%2FiugvjwTEhrQsSdeonrQYXle5AiEA84pJPTvjy0oPN8DKxTUsQbVsc8ZNMqBIrWgdMUa2ll8q%2BwIIHRABGgw4ODcwMzE1ODMxMTEiDMl4l8YzgZhMO5UmiyrYAhg15XshxKkq%2BB0wA7ipdvrzxGqpXkN8tEMxMrE4ObE2e07jd55ZUWL%2FmLmlvpsjNGDUiQRrIbeqmIopfNcIES26dP8C8Bsy8vxTCf2BKq%2FijtlXWsdNj7sL0Kuy9iPLzsy%2BouXwSMaWqM21jyX5%2BHuL4mohBbFpKYnOavduPxyLFOCv7W%2B1RcQt9D1zslZsczSsTe2dKbamKNhSm%2FvY78Tszp8XJPM%2FhwYGG0WFX8%2FyIxWYsJBmAOpnGnHI%2F0peGF5Zzfv9pPIUFE5S2WoL9O%2B%2FMBo01nxP6pRF9q6WsPpHKK5GhxlaoFFwnaLzOP0uD%2FCaIT2H4ZsBEZykWgfjGcabU%2BJkv9E8FGdwJC1KiZg1x65Q5d5ylWu5ueRdApFoJWQzxne2R5tntBBkpsPL8i7%2FwpeIJLHlZ4PmF0Cxy0tE%2BvCJGN9XfZM70YeosFFcYCHqky29qMh2MPLq6pMGOrMC%2B%2BH%2FJhm%2FvqG0H8%2FnWnvUbHrZWoHh%2BuC7v6gusrxnnJsnlNAM8s3tKfWFeIjfqnwayXIKUj6T6%2F6BJQKK8twzBxUHSEkG3lngoF9KHec29mfDKx%2BgDWjrglRtWKNmTrckcyRKukcrqIUsjBN7gp9updfLsJhUa4bcLygzc53uXE6v%2FIs8URu0ncegje4XSGugCvPUII6DmahbyKK919sNFZOGqxe5XMW%2BizgHlVvZP8YYLUR7gSD9lLiRkH8N2ka4FgGLrf6E4%2FYxKJisCZmKDNgVEdF%2Fjia%2BtVLGJGYppbh3776HdvHgLX8P4WQWNlX5mafUE1KgS4JPpu%2FsXPjBwPmLwlEHgrAtGPVAp6sj3kc5%2BAtaiGDHPbEeB2nv3MZP4CkkXxy%2BQjsSec8aQ8XsdjOE%2Fw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220510T193150Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA45BZT2GDWSW37LGD%2F20220510%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=8ef9144c0a7a510c0a727065d1960de61f6916b2173fc048ca52ba40d91389ff"
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
