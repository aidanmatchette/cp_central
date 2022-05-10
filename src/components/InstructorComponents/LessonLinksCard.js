import { Card } from 'react-bootstrap'
import {Stack} from "@mui/material";
import { Button } from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/theme.js";

function LessonLinksCard(props) {


  let { links, cardStyle } = props

  return (
    <>
      <h4 className="text-center mt-1">Lesson Links</h4>
      <Stack alignItems={'center'} marginTop={1} >
        {links
          ? links.map((link, index) => {
            return (
              <ThemeProvider theme={theme}>
                <Button fullWidth sx={{":hover": {color: '#118888'}}} component="a" key={index} target="_blank" href={link.url}>{link.description ? link.description : 'No Description'}</Button> 
              </ThemeProvider>
            )
          })
            : <span>No links for this day</span>
        }
      </Stack>
    </>
  )
}

export default LessonLinksCard
