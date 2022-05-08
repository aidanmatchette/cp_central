import { Card } from 'react-bootstrap'

function LessonLinksCard(props) {


  let { links, cardStyle } = props

  return (
    <Card className="shadow" border="primary" style={cardStyle}>
      <h4 className="text-center mt-1">Links</h4>
      <ul>
        {links
          ? links.map((link, index) => {
            return (
              <li key={index}><a href={link.url}>{link.description ? link.description : 'No Description'}</a></li>
            )
          })
          : <li>No links for this day</li>
        }
      </ul>
    </Card>
  )
}

export default LessonLinksCard