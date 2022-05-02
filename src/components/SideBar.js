import { useNavigate } from "react-router-dom";
import { ListItemIcon, ListItemText, List, ListItem, Button, Box} from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
const listItems = [
  {
    // listIcon: <Home />,
    listText: "Home"
  },
  {
    // listIcon: <AssignmentInd />,
    listText: "Resume"
  },
  {
    // listIcon: <Apps />,
    listText: "Portfolio"
  },
  {
    // listIcon: <ContactMail />,
    listText: "Contacts"
  }
];



function SideBar() {
  const navigate = useNavigate()
 
  const menuSideBarContainer = {
    width: 250,
    height: "100%"
  } 
  

  return (
    <ThemeProvider theme={theme}>
      <Box component="div">
        <List style={menuSideBarContainer}>
          {listItems.map((listItem, index) => (
            <ListItem color="primary" button key={index}>
              {/* <ListItemIcon > */}
              {/*   {listItem.listIcon} */}
              {/* </ListItemIcon> */}
              <ListItemText primary={listItem.listText} />
            </ListItem>
          ))}
          <Button variant="contained">Test</Button>
        </List>
      </Box>
    </ThemeProvider>

  );
    
}
export default SideBar

