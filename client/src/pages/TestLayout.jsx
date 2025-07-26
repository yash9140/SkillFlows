import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function TestLayout() {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-primary">Layout Test Page</h1>
          <p className="text-muted">This page tests the new layout component with navbar and footer.</p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Layout Features</Card.Title>
              <Card.Text>
                This layout includes:
              </Card.Text>
              <ul>
                <li>Fixed navbar at the top</li>
                <li>Responsive navigation</li>
                <li>User/admin authentication integration</li>
                <li>Footer with contact information</li>
                <li>Proper spacing and margins</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Navigation</Card.Title>
              <Card.Text>
                The navbar includes:
              </Card.Text>
              <ul>
                <li>Home link</li>
                <li>Courses link</li>
                <li>Dashboard links (user/admin)</li>
                <li>User dropdown menu</li>
                <li>Logout functionality</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Content Area</Card.Title>
              <Card.Text>
                This is the main content area where your page content will be displayed. 
                The layout ensures proper spacing from the navbar and footer.
              </Card.Text>
              <Button variant="primary">Test Button</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TestLayout; 