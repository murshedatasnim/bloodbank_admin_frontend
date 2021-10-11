import React from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Navbar, Nav, Container, NavDropdown, NavItem } from 'react-bootstrap'

export const siteTitle = 'Blood Bank'

const Layout = (props) => {
    const router = useRouter();

    const logout = async () => {
        await fetch('http://absb.herokuapp.com/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify(window.localStorage.getItem('email')
            )
        })

        window.localStorage.clear();

        await router.push('/login');
    }

    let menu;

    if (!props.auth) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <Nav.Link href="/login" active>
                    Login
                </Nav.Link>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <NavDropdown title="Ambulance" id="basic-nav-dropdown1" active>
                            <NavDropdown.Item><Link href="/ambulance/addambulance">Add</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link href="/ambulance/viewambulance">View</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Oxygen Cylinder" id="basic-nav-dropdown2" active>
                            <NavDropdown.Item><Link href="/cylinder/addcylinder">Add</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link href="/cylinder/viewcylinder">View</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" onClick={logout} active>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {/* <li className="nav-item">
                    <a  href="#" className="nav-link active" >Logout</a>
                </li> */}
            </ul>
        )
    }

    return (
        <>
            {/* <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="og:title" content={siteTitle} />
            </Head> */}

            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Blood Bank Admin</Navbar.Brand>

                    <div>
                        {menu}
                    </div>
                </Container>
            </Navbar>

            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;
