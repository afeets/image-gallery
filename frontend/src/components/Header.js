import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/images/logo.svg'; // GENERATE https://maketext.io/
const navbarStyle = {
  backgroundColor: 'lightblue'
}

const Header = ( title ) => {
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '10rem', maxHeight: '2rem' }}/>
      </Container>
    </Navbar>
  )
}

export default Header;