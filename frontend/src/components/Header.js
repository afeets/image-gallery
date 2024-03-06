import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const navbarStyle = {
  backgroundColor: 'lightblue'
}

const Header = ( props ) => {
  const { title } = props;
  return (
    <Container>
      <Navbar style={navbarStyle} data-bs-theme="light">
          <Navbar.Brand href="/">{ title }</Navbar.Brand>
      </Navbar>
    </Container>
  )
}

export default Header;