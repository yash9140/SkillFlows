import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - adminOnly:', adminOnly);
  console.log('ProtectedRoute - user role:', user?.role);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    console.log('ProtectedRoute - Not admin, redirecting to home');
    return <Navigate to="/" />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
}

export default ProtectedRoute; 