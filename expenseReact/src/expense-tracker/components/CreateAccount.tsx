import { useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../../Services/DataService";
import { User } from "../../App";


const CreateAccount = () => {

    let navigate = useNavigate();
    
    const [Username, setUsername] = useState<User["username"]>('')
    const [Password, setPassword] = useState<User["password"]>('')

    const handleUser = (e:string) => {
        setUsername(e);
    }
    
    const handlePassword = (e:string) => {
        setPassword(e);
    }

    const handleSubmit = () => {
        let userData = {
            id: 0,
            username: Username,
            password: Password
        }
        console.log(userData)
        createAccount(userData)
        navigate("/")
    }

  return (
    <>
        <Container>
                <Row>
                    <Col className="form-container d-flex justify-content-center">
                        {/* <h1>Account Page</h1> */}

                        <Form>
                            <Form.Group className="mb-3" controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={(e) => handleUser(e.target.value)}/>
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else, unless we are paid a substantial amount of money to sell your data.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"  onChange={(e) => handlePassword(e.target.value)}/>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
    </>
  )
}

export default CreateAccount