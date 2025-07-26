import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import CourseDashboard from './pages/CourseDashboard.jsx';
import CourseVideoPage from './pages/CourseVideoPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TestLayout from './pages/TestLayout.jsx';
import RoleSelector from './components/RoleSelector.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminRegister from './components/AdminRegister.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <Routes>
            {/* Homepage route uses only HomeNavbar, not Layout */}
            <Route path="/" element={<Home />} />

            {/* Public routes without layout */}
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/register" element={<Register />} />

            {/* All other routes use Layout */}
            <Route path="*" element={<Layout />}>
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="test-layout" element={<TestLayout />} />
              <Route path="role-selector" element={<RoleSelector />} />
              <Route path="user/login" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin-login" element={<AdminLogin />} />
              {/* Protected User Routes */}
              <Route path="course-dashboard" element={
                <ProtectedRoute>
                  <CourseDashboard />
                </ProtectedRoute>
              } />
              <Route path="course/:courseId/videos" element={
                <ProtectedRoute>
                  <CourseVideoPage />
                </ProtectedRoute>
              } />
              {/* Protected Admin Routes */}
              <Route path="admin-dashboard" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              {/* Additional routes for layout */}
              <Route path="courses" element={<Home />} />
              <Route path="profile" element={<div className="text-center mt-5"><h2>Profile Page</h2><p>Coming soon...</p></div>} />
              <Route path="enrolled-courses" element={<div className="text-center mt-5"><h2>Enrolled Courses</h2><p>Coming soon...</p></div>} />
              <Route path="manage-courses" element={<div className="text-center mt-5"><h2>Manage Courses</h2><p>Coming soon...</p></div>} />
              <Route path="about" element={<div className="text-center mt-5"><h2>About Us</h2><p>Coming soon...</p></div>} />
              <Route path="contact" element={<div className="text-center mt-5"><h2>Contact Us</h2><p>Coming soon...</p></div>} />
              <Route path="privacy" element={<div className="text-center mt-5"><h2>Privacy Policy</h2><p>Coming soon...</p></div>} />
              <Route path="terms" element={<div className="text-center mt-5"><h2>Terms of Service</h2><p>Coming soon...</p></div>} />
              <Route path="cookies" element={<div className="text-center mt-5"><h2>Cookie Policy</h2><p>Coming soon...</p></div>} />
            </Route>
          </Routes>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
