import { Card } from 'react-bootstrap'
import {Stack} from "@mui/material";

function LessonLinksCard(props) {


  let { links, cardStyle } = props

  return (
    <>
      <h4 className="text-center mt-1">Lesson Links</h4>
      <Stack alignItems={'center'} marginTop={1} >
        {links
          ? links.map((link, index) => {
            return (
              <a key={index} href={link.url}>{link.description ? link.description : 'No Description'}</a>
            )
          })
            : <span>No links for this day</span>
        }
      </Stack>
    </>
  )
}

export default LessonLinksCard