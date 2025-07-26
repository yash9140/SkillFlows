import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext.jsx';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginAdmin(email, password);
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
        <Card className="shadow-lg border-0">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <i className="fas fa-user-shield fa-2x text-warning mb-2"></i>
              <h2 className="mb-2">Admin Login</h2>
              <p className="text-muted">Sign in to your admin account</p>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} autoComplete="on">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your admin email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="warning"
                className="w-100 mb-3"
                disabled={loading}
                size="lg"
              >
                {loading ? 'Logging in...' : 'Admin Login'}
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span className="text-muted">Don't have an admin account? </span>
              <Link to="/admin-register">Register Admin</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/role-selector" className="small">Back to Role Selection</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AdminLogin; 