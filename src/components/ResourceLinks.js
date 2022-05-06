import { useContext, useState } from "react";
import { DayContext } from "../context/DayProvider";
import LinkList from "../components/LinkList"
import { Link } from "react-router-dom"

function ResourceLinks(props) {
  
  const [lesson, setLesson] = useState([])
  const { landingRaw } = useContext(DayContext)

  const renderLessons = () => {
    console.log(landingRaw.lessons[0])
  
    try {
       return landingRaw.lessons.map((info, index) => {
      return (
       <div>
         <h3> Topic: {info.title}</h3>
         {/* <p>{info.description}</p> */}
         <ul >
           {info.lesson_links.map((link, index) => {
             return <li key={index} className="topic-links"><a className="link-list" href={link.url}>{link.description}</a></li>
           })}
         </ul>
          <p>View more resources <Link to={"/lesson-links"}>here</Link></p> 
       </div>
      )
    })
    }
    catch {

    }
   
  }
  return (
    <div>
      <ul className="link-list">
      { landingRaw && renderLessons() }
      </ul>
    </div>
  )
}

export default ResourceLinks;