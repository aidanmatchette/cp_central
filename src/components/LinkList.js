import { useContext } from "react";
import { DayContext } from "../context/DayProvider";
import { Form, Button } from "react-bootstrap";
import { useAxios } from "../utils/useAxios";

function LinkList() {

  const backend = useAxios()
  const { landingRaw, setDirty } = useContext(DayContext)

  console.log(landingRaw.lessons[0].lesson_links)

  const deleteLink = (e) => {
    e.preventDefault()
    backend.delete(`/api/v1/lesson_link/${e.target.id.value}`).then((res) => {
      console.log(res)
      setDirty(true)
    })
  }

  const renderLinks = () => {
    console.log("renderLinks")
    try {
      let filteredLinks = landingRaw.lessons[0].lesson_links.filter(function (data) {
        return data.link_type === 3
      })
      // console.log(filteredLinks)
      return filteredLinks.map((link, index) => {

        const showButton = (link.originator === landingRaw.my_info.id) || landingRaw.my_info.is_superuser || landingRaw.my_info.is_staff

        return (
          <li key={index}><a href={link.url}>{link.description}</a> added by {link.originator} {showButton &&
            <Form onSubmit={deleteLink}>
              <Form.Group>
                <Form.Control type="hidden" name="id" defaultValue={link.id} />
              </Form.Group>
              <Button id="link-btn" variant="outline-danger" type="submit" size="sm">X</Button>
            </Form>}
          </li>
        )
      })

    } catch {
      console.log("Error")
    }
  }

  return (
    <ul>
      {landingRaw && renderLinks()}
    </ul>
  )
}


export default LinkList;
  // const deleteBtn = () => {
  //   return (
  //     <Form onSubmit={ deleteLink }>
  //         <Form.Group>
  //           <Form.Control type="hidden" name="id"/>
  //         </Form.Group>
  //         <Button id="link-btn" variant="outline-danger" type="submit" size="sm">X</Button>
  //       </Form>
  //   )
  // }
     // console.log((link.originator === landingRaw.my_info.id) || landingRaw.my_info.is_superuser || landingRaw.my_info.is_staff)
        // if ((link.originator === landingRaw.my_info.id) || landingRaw.my_info.is_superuser || landingRaw.my_info.is_staff) {
        //   document.getElementById("link-btn").style.visibility = "visible"
        //   console.log("visible")
        // } else {
        //   document.getElementById("link-btn").style.visibility = "hidden"
        // }