import {useNavigate} from "react-router-dom";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,} from "@mui/material";
import {styled, ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/theme.js";
import {listItems} from "./SideBarData.js";
import GenerateFeedback from "../GenerateFeedback";
import GoogleCalendar from "../GoogleCalendar";

// console.log("list items -----", listItems);

function SideBar() {
  const navigate = useNavigate();


  const CentralSideBar = styled(List)({
    "& .MuiListItemButton-root": {
      paddingLeft: 24,
      paddingRight: 24,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
      marginRight: 16,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>

        <CentralSideBar component="nav" disablePadding>
          <ListItemButton
            component="a"
            href="https://codeplatoon.org"
            target="_blank"
            sx={{ justifyContent: "center", height: "35px" }}
          >
            <img
              src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png"
              width="100"
              alt="cp-logo"
            />
            <Typography variant="h4">Students</Typography>
          </ListItemButton>
          <Divider />

          {listItems.map((listItem, index) => (
            <ListItem
              color="primary"
              sx={{ justifyContent: "center" }}
              button
              onClick={() => navigate(listItem.link)}
              key={index}
            >
              <ListItemIcon>{listItem.listIcon}</ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GenerateFeedback />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleCalendar />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}></Box>

        </CentralSideBar>
      </Box>
    </ThemeProvider>
  );
}
export default SideBar;
