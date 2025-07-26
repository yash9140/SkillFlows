import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Navbar, Alert, Spinner, Offcanvas } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/DocumentList';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_BG = "#11614e";

// --- Sidebar as a component (inline here for clarity, but you can move it out) ---
function Sidebar() {
  return (
    <div
      className="d-flex flex-column h-100 justify-content-between"
      style={{
        width: SIDEBAR_WIDTH,
        background: SIDEBAR_BG,
        color: "#fff",
        minHeight: "100vh",
        padding: "24px 0 0 0",
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-5 ps-4">
          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <span className="text-success fw-bold fs-4">S</span>
          </div>
          <span className="fs-4 fw-bold ms-3" style={{ color: "#fff" }}>SkillFlow</span>
        </div>
        <nav className="flex-column">
          <a href="/dashboard" className="d-flex align-items-center px-4 py-3 mb-2 sidebar-link" style={{ color: "#fff", borderRadius: "8px", textDecoration: 'none', background: "#0e4d3a" }}>
            <i className="fas fa-home me-3"></i>
            <span className="fw-semibold">Dashboard</span>
          </a>
          <a href="/groups" className="d-flex align-items-center px-4 py-3 mb-2 sidebar-link" style={{ color: "#fff", borderRadius: "8px", textDecoration: 'none' }}>
            <i className="fas fa-users me-3"></i>
            <span className="fw-semibold">My Groups</span>
          </a>
          <a href="/explore" className="d-flex align-items-center px-4 py-3 mb-2 sidebar-link" style={{ color: "#fff", borderRadius: "8px", textDecoration: 'none' }}>
            <i className="fas fa-compass me-3"></i>
            <span className="fw-semibold">Explore</span>
          </a>
        </nav>
      </div>
      <div className="mb-4 px-4">
        <div className="bg-white bg-opacity-10 rounded-3 p-3 text-white small">
          <div className="mb-2">Facing problems?</div>
          <Button variant="outline-light" size="sm" className="w-100">Get help</Button>
        </div>
      </div>
    </div>
  );
}

function CourseDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch user's enrolled and available courses
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const enrollmentsResponse = await fetch('/enrollments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (enrollmentsResponse.ok) {
          const enrolledData = await enrollmentsResponse.json();
          setEnrolledCourses(enrolledData);
        }
        const availableResponse = await fetch('/enrollments/available', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (availableResponse.ok) {
          const availableData = await availableResponse.json();
          setAvailableCourses(availableData);
        }
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchEnrollments();
  }, [user]);

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });
      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to enroll in course');
      }
    } catch {
      alert('Failed to enroll in course');
    }
  };

  const CourseCard = ({ course, isEnrolled = false, onEnroll = null }) => (
    <Card className="mb-3 shadow-sm border-0 bg-white">
      <Card.Body className="p-3">
        <Row className="align-items-center">
          <Col xs={12} md={2} className="mb-3 mb-md-0">
            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: 100, height: 70 }}>
              <img 
                src={course.thumbnail || `https://via.placeholder.com/80x60/28a745/ffffff?text=${course.title?.substring(0, 2).toUpperCase()}`} 
                alt={course.title}
                className="img-fluid rounded"
                style={{ maxWidth: '80px', maxHeight: '60px', objectFit: 'cover' }}
              />
            </div>
          </Col>
          <Col xs={12} md={7}>
            <h6 className="mb-1 fw-bold text-dark">{course.title}</h6>
            <p className="mb-1 text-muted small">{course.batchName || 'New Batch'}</p>
            <p className="mb-2 text-muted small">Instructor: {course.instructor}</p>
            {isEnrolled && (
              <div className="d-flex align-items-center">
                <ProgressBar 
                  now={course.progress || 0} 
                  className="me-2 flex-grow-1" 
                  style={{ height: '8px', minWidth: 80 }}
                  variant={(course.progress || 0) >= 80 ? 'success' : (course.progress || 0) >= 50 ? 'warning' : 'info'}
                />
                <span className="small text-muted">{course.progress || 0}%</span>
              </div>
            )}
          </Col>
          <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
            {isEnrolled ? (
              <Button 
                variant={(course.progress || 0) === 0 ? 'success' : 'outline-success'} 
                size="sm"
                className="w-100"
                onClick={() => navigate(`/course/${course._id || course.id}/videos`)}
              >
                {(course.progress || 0) === 0 ? 'Start Course' : 'Continue'}
              </Button>
            ) : (
              <Button 
                variant="outline-success" 
                size="sm"
                className="w-100"
                onClick={() => onEnroll && onEnroll(course._id || course.id)}
              >
                Start Course
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  // --- Main Render ---
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Sidebar (fixed for md and up) */}
        <Col
          xs={12}
          md="auto"
          className="d-none d-md-block"
          style={{
            width: SIDEBAR_WIDTH,
            background: SIDEBAR_BG,
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            overflowY: 'auto'
          }}
        >
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col
          xs={12}
          md
          style={{
            marginLeft: SIDEBAR_WIDTH,
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            paddingTop: '20px',
          }}
        >
          <Container fluid className="py-4 px-3">
            <Card className="shadow-sm p-4 mb-4">
              <h2 className="mb-4">Course Dashboard</h2>

              <Row className="mb-4">
                <Col>
                  <div className="bg-light rounded p-4 shadow-sm">
                    <h2 className="text-primary mb-1">Welcome back, {user?.name}!</h2>
                    <p className="text-muted mb-0">Continue your learning journey</p>
                  </div>
                </Col>
              </Row>

              {loading ? (
                <Row className="mb-4">
                  <Col className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-3">Loading your courses...</p>
                  </Col>
                </Row>
              ) : error ? (
                <Row className="mb-4">
                  <Col>
                    <Alert variant="danger">{error}</Alert>
                  </Col>
                </Row>
              ) : (
                <>
                  {enrolledCourses.length > 0 && (
                    <Row className="mb-4">
                      <Col>
                        <h5 className="fw-bold mb-3" style={{ color: '#11614e' }}>Recent Activity</h5>
                        {enrolledCourses.map(course => (
                          <CourseCard key={course.id} course={course} isEnrolled={true} />
                        ))}
                      </Col>
                    </Row>
                  )}

                  {availableCourses.length > 0 && (
                    <Row className="mb-4">
                      <Col>
                        <h5 className="fw-bold mb-3" style={{ color: '#11614e' }}>All Courses</h5>
                        {availableCourses.map(course => (
                          <CourseCard key={course._id} course={course} isEnrolled={false} onEnroll={handleEnroll} />
                        ))}
                      </Col>
                    </Row>
                  )}

                  {enrolledCourses.length === 0 && availableCourses.length === 0 && (
                    <Row className="mb-4">
                      <Col>
                        <Alert variant="info">
                          <h5>No courses available yet!</h5>
                          <p className="mb-0">Check back later for new courses or contact an administrator to add courses.</p>
                        </Alert>
                      </Col>
                    </Row>
                  )}
                </>
              )}

              <DocumentList />
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseDashboard;