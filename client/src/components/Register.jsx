import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine user role from URL path
  useEffect(() => {
    if (location.pathname.includes('/admin/')) {
      setUserRole('admin');
    } else {
      setUserRole('user');
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const result = await register(name, email, password, userRole);
      console.log('Registration successful, user role:', result.user.role);
      
      // Redirect based on user role
      if (result.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/course-dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {userRole === 'admin' ? 'Admin Registration' : 'User Registration'}
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to={userRole === 'admin' ? '/admin/login' : '/user/login'}>
                    Login
                  </Link>
                </p>
                <p className="mt-2">
                  <Link to="/role-selector">
                    <i className="fas fa-arrow-left me-1"></i>
                    Back to Role Selection
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Register; 