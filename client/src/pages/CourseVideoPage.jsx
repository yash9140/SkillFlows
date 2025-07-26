import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Accordion, 
  Card, 
  Button, 
  Badge,
  Alert,
  Spinner,
  ProgressBar
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';

function CourseVideoPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course and video data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Fetch course details
        const courseResponse = await fetch(`/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData);
          setVideos(courseData.videos || []);
          
          // Set first video as selected if available
          if (courseData.videos && courseData.videos.length > 0) {
            setSelectedVideo(courseData.videos[0]);
          }
        } else {
          setError('Failed to load course');
        }
        
        // Fetch user's progress for this course
        const progressResponse = await fetch(`/enrollments/progress?courseId=${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          if (progressData.completedVideos) {
            setCompletedVideos(new Set(progressData.completedVideos));
          }
        }
        
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError('Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && user) {
      fetchCourseData();
    }
  }, [courseId, user]);

  // Handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Handle video completion
  const handleVideoComplete = async (videoId) => {
    try {
      console.log('Video completed:', videoId);
      const newCompletedVideos = new Set(completedVideos);
      newCompletedVideos.add(videoId);
      setCompletedVideos(newCompletedVideos);

      // Update progress on server
      const token = localStorage.getItem('token');
      const completedCount = newCompletedVideos.size;
      const totalVideos = videos.length;
      const progress = Math.round((completedCount / totalVideos) * 100);

      console.log('Updating progress:', { completedCount, totalVideos, progress });

      const response = await fetch('/enrollments/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId,
          progress,
          completedVideos: Array.from(newCompletedVideos)
        })
      });

      if (response.ok) {
        console.log('Progress updated successfully');
      } else {
        console.error('Failed to update progress');
      }

    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  // Calculate overall progress
  const overallProgress = videos.length > 0 ? Math.round((completedVideos.size / videos.length) * 100) : 0;

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading course content...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/course-dashboard')}>
            Back to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Course Not Found</Alert.Heading>
          <p>The requested course could not be found.</p>
          <Button variant="outline-warning" onClick={() => navigate('/course-dashboard')}>
            Back to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">
      {/* Course Header */}
      <Row className="mb-4">
        <Col>
          <div className="bg-light rounded p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-primary mb-1">{course.title}</h2>
                <p className="text-muted mb-2">Instructor: {course.instructor}</p>
                <p className="text-muted mb-0">{course.description}</p>
              </div>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/course-dashboard')}
              >
                ← Back to Dashboard
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-muted">Course Progress</span>
                <span className="small text-muted">{overallProgress}% Complete</span>
              </div>
              <ProgressBar 
                now={overallProgress} 
                variant={overallProgress >= 80 ? 'success' : overallProgress >= 50 ? 'warning' : 'info'}
                style={{ height: '10px' }}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Video Player */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              {selectedVideo ? (
                <div>
                  <div className="bg-dark position-relative" style={{ height: '400px' }}>
                                         <video
                       className="w-100 h-100"
                       controls
                       onEnded={() => handleVideoComplete(selectedVideo._id || selectedVideo.id)}
                       onError={(e) => console.error('Video error:', e)}
                       style={{ objectFit: 'contain' }}
                     >
                       <source src={selectedVideo.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
                       Your browser does not support the video tag.
                     </video>
                  </div>
                  <div className="p-3">
                    <h5 className="mb-2">{selectedVideo.title}</h5>
                    <p className="text-muted mb-0">{selectedVideo.description}</p>
                    <Badge bg="secondary" className="mt-2">
                      Duration: {selectedVideo.duration} minutes
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                  <div className="text-center text-muted">
                    <i className="fas fa-play-circle fa-3x mb-3"></i>
                    <p>Select a video to start learning</p>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Video Topics List */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Course Content
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="d-flex align-items-center w-100">
                      <i className="fas fa-play-circle me-2 text-primary"></i>
                      <span>Video Topics ({videos.length})</span>
                      <Badge bg="success" className="ms-auto">
                        {completedVideos.size}/{videos.length} Complete
                      </Badge>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <div className="list-group list-group-flush">
                      {videos.map((video, index) => {
                        const isCompleted = completedVideos.has(video._id || video.id);
                        const isSelected = selectedVideo && (selectedVideo._id === video._id || selectedVideo.id === video.id);
                        
                        return (
                          <div
                            key={video._id || video.id}
                            className={`list-group-item list-group-item-action d-flex align-items-center ${
                              isSelected ? 'active' : ''
                            }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleVideoSelect(video)}
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <div className="me-3">
                                {isCompleted ? (
                                  <i className="fas fa-check-circle text-success"></i>
                                ) : (
                                  <i className="fas fa-play-circle text-primary"></i>
                                )}
                              </div>
                              <div className="flex-grow-1">
                                <div className="fw-bold small">
                                  {index + 1}. {video.title}
                                </div>
                                <div className="text-muted small">
                                  {video.duration} minutes
                                </div>
                              </div>
                            </div>
                            {isCompleted && (
                              <Badge bg="success" className="ms-2">
                                <i className="fas fa-check"></i>
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseVideoPage; 