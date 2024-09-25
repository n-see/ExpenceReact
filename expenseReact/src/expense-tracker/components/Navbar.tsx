import { Nav, Navbar, NavDropdown, Container, Image,  } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavProps {
  isLoggedIn: boolean,
  setIsLoggedIn: () => void
  handleLogout: () => void
  user: {
    publisherName: string
  }
}

//will need user, isLoggedIn, and setIsLoggedIn
const NavBar = ({isLoggedIn, setIsLoggedIn, handleLogout, user}:NavProps) => {

    
  return (
    <>
    <Navbar variant="dark" >
    <Container>

<Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/ExpenseList'}>Expenses</Nav.Link>
                  <Nav.Link as={Link} to={'/CreateAccount'}>Create Account</Nav.Link>
              </Nav>
              <Nav className="welcome">
                {isLoggedIn ? (
                  <>
                  <Nav.Link as ={Link} to={'/'} onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link>Welcome {user ? user.publisherName : "Guest"}</Nav.Link>
                  </>
                  
                  ):<Nav.Link as ={Link} to={'/'} >Log In</Nav.Link>}
              </Nav>
              
          </Navbar.Collapse>
  {/* <Text>This is the navbar</Text>
  <Text as={Link} to={"/ExpenseList"}>Expense List</Text>
  <Text as={Link} to={"/CreateAccount"}>Create Account</Text>
  <Text as={Link} to={"/"}>Log In</Text> */}
</Container>
    </Navbar>
        
    </>
  )
}

export default NavBar