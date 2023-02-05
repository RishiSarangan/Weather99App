import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Header(){
    return(
        <>
            <Navbar bg="dark" variant="dark" className='navbar' fixed="top">
                <Container>
                    <Navbar.Brand href="#home" className='brand'>
                    Weather 99
                    </Navbar.Brand>
                    <Button variant="outline-success">Refresh</Button>
                </Container>
            </Navbar>
        </>
    );
}