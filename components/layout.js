import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar, Nav, Container , NavDropdown} from 'react-bootstrap'

export const siteTitle = 'Blood Bank'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Blood Bank Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <NavDropdown title="Ambulance" id="basic-nav-dropdown1">
                <NavDropdown.Item href="/ambulance/addambulance">Add</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Update</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Oxygen Cylinder" id="basic-nav-dropdown2">
                <NavDropdown.Item href="#action/3.1">Add</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Update</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  )
}
