import { useContext, useState, useEffect } from 'react'
import { Button, Card, Col, Container, Row, Form, Modal } from 'react-bootstrap'
import { DayContext } from '../context/DayProvider'
import { useAxios } from '../utils/useAxios'

function CohortLinks(props) {

  let backend = useAxios()

  let { buttonStyle } = props
  const { landingRaw, dirty, setDirty } = useContext(DayContext);
  const [updateMode, setUpdateMode] = useState(false);
  const [links, setLinks] = useState(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    setLinks(landingRaw?.cohort.metadata)
  }, [landingRaw])

  const handleLinkChange = (e, n) => {
    setLinks(prevState => {
      let updatedLinks = Object.assign({}, prevState)
      updatedLinks[n] = e.target.value;
      return updatedLinks
    })
  }

  const handleSave = () => {
    let cohortID = landingRaw?.cohort.group.id
    backend.patch(`api/v1/cohort/${cohortID}/`, { metadata: links })
      .then(res => {
        console.log(res)
        setUpdateMode(false)
        setDirty(!dirty)
      }
      )
  }

  const handleHide = () => {
    setUpdateMode(false)
    setShow(false)
  }


  return (
    <>
      <div className="d-flex justify-content-center">
        <Button className="shadow" variant="outline-secondary" onClick={() => setShow(true)} style={buttonStyle}>Cohort Links</Button>
      </div>
      <Modal show={show} onHide={handleHide} >
        <Container>
          <Row>
            <Col>
              <Card className="m-3">
                <Card.Title className="d-flex justify-content-between px-5 pt-2">
                  <h2>{landingRaw?.cohort.group.name} Links</h2>
                  {updateMode
                    ? <Button variant='secondary' onClick={handleSave}>Save</Button>
                    : <Button variant='outline-secondary' onClick={() => setUpdateMode(true)}>Edit</Button>
                  }
                </Card.Title>
                <Card.Body className="px-5">
                  {links && Object.keys(links).map((name, index) => {
                    let formattedName = name.charAt(0).toUpperCase() + name.replace('_', ' ').slice(1)
                    return (
                      <div key={name + index} className="mb-3">
                        <p className='mb-0'><strong>{formattedName}</strong>&nbsp;:&nbsp;</p>
                        {updateMode
                          ? <Form.Control type='url' defaultValue={links[name]} onChange={(e) => handleLinkChange(e, name)} />
                          : <a href={links[name]}>{links[name]}</a>
                        }
                      </div>
                    )
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  )
}

export default CohortLinks