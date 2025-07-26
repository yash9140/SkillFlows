import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleAction = (action) => {
    if (selectedRole === 'user') {
      navigate(`/${action}`);
    } else if (selectedRole === 'admin') {
      navigate(`/admin-${action}`);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
        <Card className="shadow-lg border-0">
          <Card.Body className="text-center p-5">
            {!selectedRole ? (
              // Role Selection View
              <>
                <div className="mb-4">
                  <i className="fas fa-graduation-cap text-primary" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3 mb-2">Welcome to SkillFlow</h2>
                  <p className="text-muted">Choose your role to continue</p>
                </div>
                <Row className="g-4">
                  <Col md={6}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 py-4 shadow-sm"
                      onClick={() => handleRoleSelect('user')}
                      style={{ transition: 'all 0.3s ease', border: 'none' }}
                      onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      <i className="fas fa-user me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>User</div>
                        <small className="opacity-75">Browse & Learn</small>
                      </div>
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      variant="warning"
                      size="lg"
                      className="w-100 py-4 shadow-sm"
                      onClick={() => handleRoleSelect('admin')}
                      style={{ transition: 'all 0.3s ease', border: 'none' }}
                      onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      <i className="fas fa-shield-alt me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Admin</div>
                        <small className="opacity-75">Manage Content</small>
                      </div>
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              // Action Selection View
              <>
                <div className="mb-4">
                  <i className={`fas ${selectedRole === 'user' ? 'fa-user' : 'fa-shield-alt'} text-${selectedRole === 'user' ? 'primary' : 'warning'}`} style={{ fontSize: '3rem' }}></i>
                  <h3 className="mt-3 mb-2">{selectedRole === 'user' ? 'User' : 'Admin'} Access</h3>
                  <p className="text-muted">Choose an action to continue</p>
                </div>
                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Button
                      variant="success"
                      size="lg"
                      className="w-100 py-4 shadow-sm"
                      onClick={() => handleAction('login')}
                      style={{ transition: 'all 0.3s ease', border: 'none' }}
                      onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      <i className="fas fa-sign-in-alt me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Login</div>
                        <small className="opacity-75">Access Account</small>
                      </div>
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      variant="info"
                      size="lg"
                      className="w-100 py-4 shadow-sm"
                      onClick={() => handleAction('register')}
                      style={{ transition: 'all 0.3s ease', border: 'none' }}
                      onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      <i className="fas fa-user-plus me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Register</div>
                        <small className="opacity-75">Create Account</small>
                      </div>
                    </Button>
                  </Col>
                </Row>
                <Button
                  variant="outline-secondary"
                  onClick={handleBack}
                  className="mt-3"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Role Selection
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RoleSelector; 