import React from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Accordion, Dropdown } from 'react-bootstrap';
import Footer from '../components/Footer';

const hiringPartners = [
  { name: 'Zomato' },
  { name: 'Ola' },
  { name: 'Deloitte' },
  { name: 'Google' },
  { name: 'Flipkart' },
  { name: 'Microsoft' },
  { name: 'Amazon' },
  { name: 'Paytm' },
];

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#partners', label: 'Partners' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#projects', label: 'Projects' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faqs', label: 'FAQs' },
];

function Home() {
  return (
    <>
      {/* Top Navbar: Logo + Get Started */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2 shadow-sm sticky-top border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <span className="text-white fw-bold" style={{ fontSize: 20 }}>S</span>
            </div>
            <span className="fw-bold fs-4 text-white">SkillFlow</span>
          </div>
          <div>
            <Dropdown align="end">
              <Dropdown.Toggle variant="warning" className="fw-bold px-4">
                Get Started
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/login">User Login</Dropdown.Item>
                <Dropdown.Item href="/admin/login">Admin Login</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
      {/* Second Navbar: Nav Links */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-1 shadow-sm border-bottom">
        <Container>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mx-auto align-items-center gap-2 gap-lg-3">
              {navLinks.map(link => (
                <Nav.Link
                  key={link.label}
                  href={link.href}
                  className="text-white fw-semibold px-2 px-lg-3 nav-link-home"
                  style={{ position: 'relative' }}
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero/Overview Section */}
      <section id="overview" className="py-5" style={{ background: '#f7f8f9' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xl={10} lg={11}>
              <div className="text-center mb-4">
                <span className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: 56, height: 56 }}>
                  <span className="text-white fw-bold" style={{ fontSize: 32 }}>S</span>
                </span>
                <h1 className="fw-bold display-5 mb-3" style={{ color: '#2d3846' }}>
                  Become a Skilled Developer in 18 Weeks
                </h1>
                <h5 className="fw-semibold mb-4" style={{ color: '#495057' }}>
                  SkillFlow Full-Stack Program with <span className="text-success">Job Assurance</span>
                </h5>
              </div>
              <div className="d-flex justify-content-center mb-4">
                <Card className="shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: 1100 }}>
                  <Card.Body className="px-0 py-4">
                    <Row className="g-0 text-center align-items-center">
                      <Col md className="border-end d-flex flex-column align-items-center justify-content-center">
                        <div className="text-secondary small mb-1">Next Batch</div>
                        <div className="fw-bold fs-4" style={{ color: '#2d3846' }}>July</div>
                      </Col>
                      <Col md className="border-end d-flex flex-column align-items-center justify-content-center">
                        <div className="text-secondary small mb-1">Available Seats</div>
                        <div className="fw-bold fs-4" style={{ color: '#2d3846' }}>29/60</div>
                      </Col>
                      <Col md className="border-end d-flex flex-column align-items-center justify-content-center">
                        <div className="text-secondary small mb-1">Taught by experts from</div>
                        <div className="fw-bold fs-6" style={{ color: '#2d3846' }}>Rapido, Deloitte, MFine, Zomato</div>
                      </Col>
                      <Col md className="d-flex flex-column align-items-center justify-content-center">
                        <div className="text-secondary small mb-1">Designed for</div>
                        <div className="fw-bold fs-6" style={{ color: '#2d3846' }}>Freshers & Early Working Professionals</div>
                      </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                      <Col md={6} lg={5}>
                        <div className="bg-light rounded-3 d-inline-flex align-items-center gap-4 px-4 py-2 mx-auto shadow-sm" style={{ fontWeight: 500, fontSize: '1.1rem' }}>
                          <span className="d-flex align-items-center gap-2 text-warning">
                            <span role="img" aria-label="star">⭐</span> 4.51
                          </span>
                          <span className="d-flex align-items-center gap-2 text-secondary">
                            <span role="img" aria-label="users">👥</span> 1.2 Lacs+ Learners
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
              <Row className="justify-content-center mb-2 g-3">
                <Col xs={12} md={6} lg={4} className="d-grid mb-2 mb-md-0">
                  <Button size="lg" className="fw-bold py-3" style={{ background: '#ff7a4d', border: 'none' }} href="/login">
                    Get Started as User
                  </Button>
                </Col>
                <Col xs={12} md={6} lg={4} className="d-grid">
                  <Button size="lg" className="fw-bold py-3 btn-dark" href="/admin/login">
                    Get Started as Admin
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* Key Highlights Section */}
          <div style={{ background: '#06594f', marginTop: 60, marginBottom: 0 }}>
            <Container className="py-5">
              <h2 className="fw-bold text-center text-white mb-5">Key Highlights</h2>
              <Row className="g-4 justify-content-center mb-4">
                <Col xs={12} md={6} lg={3}>
                  <div className="bg-warning rounded-4 text-center py-4 px-2 h-100 d-flex flex-column justify-content-center align-items-center" style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', background: '#ff7a4d' }}>
                    1600+
                    <div className="fw-bold fs-5 mt-2" style={{ color: '#fff', fontWeight: 600, fontSize: '1.4rem' }}>Students Placed</div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className="bg-warning rounded-4 text-center py-4 px-2 h-100 d-flex flex-column justify-content-center align-items-center" style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', background: '#ff7a4d' }}>
                    12LPA
                    <div className="fw-bold fs-5 mt-2" style={{ color: '#fff', fontWeight: 600, fontSize: '1.4rem' }}>Highest CTC</div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className="bg-warning rounded-4 text-center py-4 px-2 h-100 d-flex flex-column justify-content-center align-items-center" style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', background: '#ff7a4d' }}>
                    10
                    <div className="fw-bold fs-5 mt-2" style={{ color: '#fff', fontWeight: 600, fontSize: '1.4rem' }}>Assured Interviews</div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className="bg-warning rounded-4 text-center py-4 px-2 h-100 d-flex flex-column justify-content-center align-items-center" style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', background: '#ff7a4d' }}>
                    1000+
                    <div className="fw-bold fs-5 mt-2" style={{ color: '#fff', fontWeight: 600, fontSize: '1.4rem' }}>Hiring partners</div>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-4">
                <div className="fw-bold text-white mb-3" style={{ fontSize: '1.15rem' }}>
                  The Program has been created in collaboration with Managers from
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                  <span className="fw-bold text-white fs-4">zomato</span>
                  <span className="fw-bold text-white fs-4">rapido</span>
                  <span className="fw-bold text-white fs-4">mfine</span>
                  <span className="fw-bold text-white fs-4">Deloitte.</span>
                </div>
              </div>
            </Container>
          </div>
        </Container>
      </section>

      {/* Partners Section (only one, not duplicated) */}
      <section id="partners" className="py-5" style={{ background: '#f6f9f6' }}>
        <Container>
          <h2 className="fw-bold mb-4 text-center">Our Partners</h2>
          <Row className="g-4 justify-content-center">
            {hiringPartners.map((partner, idx) => (
              <Col xs={6} sm={4} md={3} lg={2} key={partner.name + idx}>
                <Card className="shadow-sm border-0 text-center py-3 rounded-4 h-100 d-flex align-items-center justify-content-center" style={{ minHeight: 100 }}>
                  <div className="bg-light rounded-circle mx-auto mb-2" style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span role="img" aria-label="briefcase">⚙️</span>
                  </div>
                  <div className="fw-bold text-dark">{partner.name}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-5 bg-white">
        <Container>
          <h2 className="fw-bold mb-4 text-center">Curriculum</h2>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">HTML, CSS, JavaScript Fundamentals</li>
                <li className="list-group-item">React.js &amp; Frontend Frameworks</li>
                <li className="list-group-item">Node.js, Express &amp; Backend APIs</li>
                <li className="list-group-item">MongoDB &amp; Databases</li>
                <li className="list-group-item">DevOps &amp; Deployment</li>
                <li className="list-group-item">Soft Skills &amp; Interview Prep</li>
              </ul>
              <p className="text-center text-muted">...and much more, including live projects and hackathons!</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5" style={{ background: '#f6f9f6' }}>
        <Container>
          <h2 className="fw-bold mb-4 text-center">Projects</h2>
          <Row className="g-4 justify-content-center">
            <Col md={4}>
              <Card className="shadow-sm rounded-4 border-0 h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-2">E-commerce Platform</h5>
                  <p>Build a scalable online store with product listings, cart, and payment integration.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm rounded-4 border-0 h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-2">Social Media App</h5>
                  <p>Create a real-time social platform with posts, likes, and chat features.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm rounded-4 border-0 h-100">
                <Card.Body>
                  <h5 className="fw-bold mb-2">Portfolio Website</h5>
                  <p>Design and deploy your own professional portfolio to showcase your skills.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-5 bg-white">
        <Container>
          <h2 className="fw-bold mb-4 text-center">Pricing</h2>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-lg rounded-4 border-0 text-center">
                <Card.Body>
                  <h3 className="fw-bold mb-3">₹ 1,20,000</h3>
                  <p className="mb-2">18-week Full-Stack Program</p>
                  <ul className="list-unstyled mb-4">
                    <li>✔️ Job Assurance</li>
                    <li>✔️ 12 Assured Interviews</li>
                    <li>✔️ 1:1 Mentorship</li>
                    <li>✔️ Lifetime Access to Materials</li>
                  </ul>
                  <Button variant="warning" size="lg" className="fw-bold text-white px-4">
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-5" style={{ background: '#f6f9f6' }}>
        <Container>
          <h2 className="fw-bold mb-4 text-center">FAQs</h2>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is the duration of the SkillFlow program?</Accordion.Header>
                  <Accordion.Body>
                    The SkillFlow Full-Stack Program is an 18-week intensive course designed to make you job-ready.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Is there job assurance?</Accordion.Header>
                  <Accordion.Body>
                    Yes! We offer job assurance with 12 guaranteed interviews and dedicated placement support.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Who are the trainers?</Accordion.Header>
                  <Accordion.Body>
                    Our trainers are industry experts from companies like Google, Flipkart, and Microsoft.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>What projects will I build?</Accordion.Header>
                  <Accordion.Body>
                    You'll build real-world projects like an e-commerce platform, social media app, and a personal portfolio website.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Home;