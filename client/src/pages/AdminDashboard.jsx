import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import AdminDocumentUpload from '../components/AdminDocumentUpload';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    thumbnail: '',
    category: 'Machine Learning',
    batchName: '',
    videos: []
  });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    order: 1
  });
  const { admin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminDashboard - admin:', admin);
    
    if (!admin) {
      console.log('AdminDashboard - No admin, redirecting to admin login');
      navigate('/admin/login');
      return;
    }
    console.log('AdminDashboard - Admin access confirmed, fetching courses');
    fetchCourses();
  }, [admin, navigate]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const url = editingCourse ? `/courses/${editingCourse._id}` : '/courses';
      const method = editingCourse ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save course');
      
      setShowModal(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', instructor: '', thumbnail: '', category: 'Machine Learning', batchName: '', videos: [] });
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete course');
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      thumbnail: course.thumbnail,
      category: course.category,
      batchName: course.batchName,
      videos: course.videos
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({ title: '', description: '', instructor: '', thumbnail: '', category: 'Machine Learning', batchName: '', videos: [] });
    setShowModal(true);
  };

  const openVideoModal = (course) => {
    setSelectedCourse(course);
    setVideoFormData({ title: '', description: '', videoUrl: '', duration: '', order: 1 });
    setShowVideoModal(true);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const updatedCourse = {
        ...selectedCourse,
        videos: [...(selectedCourse.videos || []), videoFormData]
      };

      const response = await fetch(`/courses/${selectedCourse._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedCourse)
      });

      if (!response.ok) throw new Error('Failed to add video');
      
      setShowVideoModal(false);
      setSelectedCourse(null);
      setVideoFormData({ title: '', description: '', videoUrl: '', duration: '', order: 1 });
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
          <p>Welcome, {admin?.name}</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={openCreateModal}>
            Add New Course
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Card.Title>Courses</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Videos</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>
                    <Badge bg="primary">{course.category || 'Machine Learning'}</Badge>
                  </td>
                  <td>{course.instructor}</td>
                  <td>
                    <Badge bg="info">{course.videos?.length || 0} videos</Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(course)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => openVideoModal(course)}
                    >
                      Add Video
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingCourse ? 'Edit Course' : 'Add New Course'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.batchName}
                onChange={(e) => setFormData({...formData, batchName: e.target.value})}
                placeholder="e.g., ML Batch 2024"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Video Modal */}
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video to {selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleVideoSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                value={videoFormData.title}
                onChange={(e) => setVideoFormData({...videoFormData, title: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={videoFormData.description}
                onChange={(e) => setVideoFormData({...videoFormData, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="url"
                value={videoFormData.videoUrl}
                onChange={(e) => setVideoFormData({...videoFormData, videoUrl: e.target.value})}
                placeholder="https://example.com/video.mp4"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={videoFormData.duration}
                onChange={(e) => setVideoFormData({...videoFormData, duration: parseInt(e.target.value)})}
                min="1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order</Form.Label>
              <Form.Control
                type="number"
                value={videoFormData.order}
                onChange={(e) => setVideoFormData({...videoFormData, order: parseInt(e.target.value)})}
                min="1"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Video
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <AdminDocumentUpload />
    </Container>
  );
}

export default AdminDashboard;