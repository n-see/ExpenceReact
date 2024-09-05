import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"


const CreateAccount = () => {

    let navigate

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const handleUser = (e:string) => {
        setUsername(e);
    }
    
    const handlePassword = (e:string) => {
        setPassword(e);
    }

    const handleSubmit = () => {
        console.log("submit");
    }

  return (
    <>
        <Container>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={(e) =>handleUser(e.target.value)}/>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e) =>handleUser(e.target.value)}/>
                <Button colorScheme="teal.300" onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Container>
    </>
  )
}

export default CreateAccount