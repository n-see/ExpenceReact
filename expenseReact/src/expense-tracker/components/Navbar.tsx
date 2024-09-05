import { Container, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

//will need user, isLoggedIn, and setIsLoggedIn
const Navbar = () => {

    // const handleLogout = () => {
    //     localStorage.clear();
    //     //setUser(null);
    //     //setIsLoggedIn(false);
    // }
  return (
    <>
        <Container>
            <Text>This is the navbar</Text>
            {/* <Text as={Link} to={"/"}>Expense List</Text> */}
            {/* <Text as={Link} to={"/CreateAccount"}>Create Account</Text> */}
            {/* <Text as={Link} to={"/ExpenseList"}>Log In</Text> */}
        </Container>
    </>
  )
}

export default Navbar