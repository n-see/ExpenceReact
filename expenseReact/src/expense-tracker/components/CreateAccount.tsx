import { useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../../Services/DataService";
import { User } from "../../App";
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    username: z.string().min(1, {message: 'username cannot be blank'}),
    password: z.string().min(1, {message: 'password cannot be blank'}),

})
type FormData = z.infer<typeof schema>


const CreateAccount = () => {
    const {register, handleSubmit,  formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})


    let navigate = useNavigate();
    
    const [Username, setUsername] = useState<User["username"]>('')
    const [Password, setPassword] = useState<User["password"]>('')

    const handleUser = (e:string) => {
        setUsername(e);
    }
    
    const handlePassword = (e:string) => {
        setPassword(e);
    }

    const handleSubmits = () => {
        if(Username === "" || Password === ""){return}else{

        let userData = {
            id: 0,
            username: Username,
            password: Password
        }
        console.log(userData)
        createAccount(userData)
        navigate("/")
    }
    }

  return (
    <>
        <Container>
                <Row>
                    <Col className="form-container d-flex justify-content-center">
                        {/* <h1>Account Page</h1> */}

                        <Form onSubmit={()=> handleSubmit}>
                            <p className="text-center">Create an Account</p>
                            <Form.Group className="mb-3" controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control {...register('username')} type="text" placeholder="Enter username" onChange={(e) => handleUser(e.target.value)}/>
                                {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else, unless we are paid a substantial amount of money to sell your data.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control {...register('password')} type="password" placeholder="Enter Password"  onChange={(e) => handlePassword(e.target.value)}/>
                                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" onClick={handleSubmits}>
                                Submit
                            </Button>
                            <p className="mt-3">Already Have an Account?</p>
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Log In
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
    </>
  )
}

export default CreateAccount