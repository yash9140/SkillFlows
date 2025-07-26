import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { useAdmin } from '../context/AdminContext.jsx';
import Footer from './Footer';

function Layout() {
  const { user, logout } = useAuth();
  const { admin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (admin) {
      logoutAdmin();
      navigate('/admin/login');
    } else if (user) {
      logout();
      navigate('/');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fixed Navbar */}
      <Navbar 
        bg="dark" 
        variant="dark" 
        expand="lg" 
        className="shadow-sm"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <i className="fas fa-graduation-cap me-2"></i>
            SkillFlow
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/courses" 
                className={isActive('/courses') ? 'active' : ''}
              >
                <i className="fas fa-book me-1"></i>
                Courses
              </Nav.Link>
              
              {user && (
                <Nav.Link 
                  as={Link} 
                  to="/course-dashboard" 
                  className={isActive('/course-dashboard') ? 'active' : ''}
                >
                  <i className="fas fa-tachometer-alt me-1"></i>
                  My Dashboard
                </Nav.Link>
              )}
              
              {admin && (
                <Nav.Link 
                  as={Link} 
                  to="/admin-dashboard" 
                  className={isActive('/admin-dashboard') ? 'active' : ''}
                >
                  <i className="fas fa-cogs me-1"></i>
                  Admin Dashboard
                </Nav.Link>
              )}
            </Nav>
            
            <Nav className="ms-auto">
              {user || admin ? (
                <NavDropdown 
                  title={
                    <span>
                      <i className="fas fa-user-circle me-1"></i>
                      {user?.name || admin?.name}
                    </span>
                  } 
                  id="basic-nav-dropdown"
                  className="text-light"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="fas fa-user me-2"></i>
                    Profile
                  </NavDropdown.Item>
                  
                  {user && (
                    <NavDropdown.Item as={Link} to="/enrolled-courses">
                      <i className="fas fa-list me-2"></i>
                      My Courses
                    </NavDropdown.Item>
                  )}
                  
                  {admin && (
                    <NavDropdown.Item as={Link} to="/manage-courses">
                      <i className="fas fa-edit me-2"></i>
                      Manage Courses
                    </NavDropdown.Item>
                  )}
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="d-flex gap-2">
                  <Button 
                    as={Link} 
                    to="/role-selector" 
                    variant="outline-light" 
                    size="sm"
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Get Started
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <main className="flex-grow-1" style={{ marginTop: '76px', marginBottom: '60px' }}>
        <Container fluid className="py-4">
          <Outlet />
        </Container>
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

export default Layout;