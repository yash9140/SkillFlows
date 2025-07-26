import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch course');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setSelectedVideo(data.videos && data.videos[0]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;
  if (!course) return null;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          {selectedVideo && (
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{selectedVideo.title}</Card.Title>
                <Card.Text>{selectedVideo.description}</Card.Text>
                <video width="100%" height="400" controls src={selectedVideo.videoUrl} />
                <div className="mt-2"><small>Duration: {selectedVideo.duration} min</small></div>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={4}>
          <h4>Videos</h4>
          <ListGroup>
            {course.videos && course.videos.sort((a, b) => a.order - b.order).map(video => (
              <ListGroup.Item
                key={video._id || video.order}
                action
                active={selectedVideo && (selectedVideo._id === video._id || selectedVideo.order === video.order)}
                onClick={() => setSelectedVideo(video)}
              >
                {video.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseDetail; 