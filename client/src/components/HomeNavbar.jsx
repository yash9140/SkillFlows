import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './HomeNavbar.css';

const navLinks = [
  { to: '#overview', label: 'Overview' },
  { to: '#hiring-partners', label: 'Hiring Partners' },
  { to: '#curriculum', label: 'Curriculum' },
  { to: '#trainers', label: 'Trainers' },
  { to: '#projects', label: 'Projects' },
  { to: '#success-stories', label: 'Success Stories' },
  { to: '#pricing', label: 'Pricing' },
  { to: '#faqs', label: 'FAQs' },
];

function HomeNavbar() {
  return (
    <>
      {/* Top Bar */}
      <Navbar className="shadow-sm py-2 home-navbar-top" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <div className="logo-placeholder bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <span className="text-white fw-bold" style={{ fontSize: 20 }}>S</span>
            </div>
            <span className="fw-bold fs-4">SkillFlow</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Sub Bar */}
      <Navbar className="home-navbar-sub" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="home-navbar-nav" className="bg-light border-0" />
          <Navbar.Collapse id="home-navbar-nav">
            <Nav className="mx-auto mx-lg-0 ms-lg-auto align-items-center gap-2 gap-lg-3">
              {navLinks.map(link => (
                <Nav.Link
                  key={link.label}
                  as={NavLink}
                  to={link.to}
                  className={({ isActive }) =>
                    'home-navbar-link px-2 px-lg-3' + (isActive ? ' active' : '')
                  }
                  end
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNavbar;