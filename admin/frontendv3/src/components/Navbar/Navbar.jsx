import {Navbar,Nav,Container} from 'react-bootstrap'
import './navstyle.css'

function Navbars(){
	return(
<>
  <Navbar className="navbar">
    <Container>
    <Nav className="">
	  <Nav.Link href="/"><img src="logo.png" alt="logo" width="70px"/></Nav.Link>
	  <Nav.Link href="/"><img src="flag.jpeg" className="flag" alt="logo" width="50px"/></Nav.Link>
      <input type="text" placeholder="What are you looking for.." name="search"className="search" />
      <button type="submit"><i class="fa fa-search"></i> Search</button>
	  <Nav.Link className ="nav nav-element" href="/feeds"><i class="fas fa-rss"></i> <span>Feeds</span> </Nav.Link>
      <Nav.Link className ="nav" href="#message"><i class="fas fa-envelope"></i>  Message</Nav.Link>
      <Nav.Link className ="nav" href="#Myshop"><i class="fa fa-fw fa-store"></i>  MyShop</Nav.Link>
      <Nav.Link className ="nav" href="#profile"><i class="far fa-user-circle"></i>  Profile</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
</>
);
}

export default Navbars;