import { useContext, useState } from "react";
import { DayContext } from "../context/DayProvider";

function ResourceLinks(props) {
  
  const [lesson, setLesson] = useState([])
  const { landingRaw } = useContext(DayContext)

  const renderLessons = () => {
    console.log(landingRaw.lessons_records[0])
  
    try {
       return landingRaw.lessons_records.map((info, index) => {
      return (
       <div>
         <h3> Topic: {info.title}</h3>
         <p>{info.description}</p>
         <ul className="link-list">
           {info.lesson_links.map((link, index) => {
             return <li key={index}><a href={link.url}>{link.description}</a></li>
           })}
         </ul>
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