import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { GetLoggedInUser, login } from "../../Services/DataService";

const Login = () => {

  let navigate = useNavigate();

  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')

  const handleUser = (e: string) => {
    setUsername(e);
  }

  const handlePassword = (e: string) => {
    setPassword(e);
  }

  const handleSubmit = async () => {
    let userData = {
      id: 0,
      username: Username,
      password: Password
    }
    let token = await login(userData)
    console.log(userData)
    console.log(token, "this should be a token");
    if (token != null) {
      localStorage.setItem("Token", token);
      // localStorage.setItem("UserData", JSON.stringify(userData));
      GetLoggedInUser(Username);
      navigate('/ExpenseList')
    }
    return userData;
  }


  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            {/* <h1>Account Page</h1> */}

            <Form>
              <p className="text-center">Login</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => handleUser(e.target.value)} />
                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else, unless we are paid a substantial amount of money to sell your data.
                                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
              <Button variant="primary" onClick={handleSubmit}>
                Login
              </Button>
              <p className="mt-3">Don't have an account?</p>
              <Button variant="primary" onClick={() => ('/CreateAccount')}>
                Create Account
              </Button>
            </Form>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login