import LoginPage from "./LoginPage"
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function HomePage() {

    return (
        <Container>
            <Row className="align-items-center" style={{ height: '80vh' }}>
                <Col xs={6} className="homepage-img image-styles" >
                    <div className="motto">
                      <h2>Welcome to <span >Code Platoon Central</span></h2>
                    <h4 style={{ textAlign: 'right', color: '#11888896' }}>
                        An app built by <em>students</em>, <em>for students</em>
                    </h4>  
                    </div> 
                </Col>
                <Col xs={6}>
                    <LoginPage isOnHomePage={true} />
                </Col>
            </Row>
        </Container >
    )
} 
