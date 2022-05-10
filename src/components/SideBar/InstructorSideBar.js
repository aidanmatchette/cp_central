import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {DayContext} from "../../context/DayProvider";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import {styled, ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/theme.js";
import {instructorListItems} from "./SideBarData.js";
import {useAxios} from "../../utils/useAxios";
import RandomPersonGenerator from "../RandomPersonGenerator";
import GenerateFeedback from "../GenerateFeedback";
import GoogleCalendar from "../GoogleCalendar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function SideBar() {
  const navigate = useNavigate();
  const { setDirty } = useContext(DayContext);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const backend = useAxios();
  const handleGenerateCheckin = () => {
    // console.log("generate check-in");
    backend.post("/api/instructor/checkin/").then((response) => {
      // console.log(response);
      setDirty(true);
      setSnackBarMessage(response.data.status);
      setSnackBarOpen(true);
    });
  };

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
            <Typography component="h5" variant="h4" color="primary">
              Instructors
            </Typography>
          </ListItemButton>
          <Divider />

          {instructorListItems.map((listItem, index) => (
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
          <ListItem button onClick={() => navigate("/instructor-dashboard")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Instructor Page"} />
          </ListItem>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GenerateFeedback />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleCalendar />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleGenerateCheckin}
              sx={{ width: "80%", mt: 3 }}
            >
              Create Check-In
            </Button>

            <Snackbar
              open={snackBarOpen}
              autoHideDuration={3000}
              message={snackBarMessage}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <RandomPersonGenerator />
          </Box>

        </CentralSideBar>
      </Box>
    </ThemeProvider>
  );
}
export default SideBar;
