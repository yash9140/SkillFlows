import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext.jsx';

function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  console.log('AdminProtectedRoute - admin:', admin);
  console.log('AdminProtectedRoute - loading:', loading);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!admin) {
    console.log('AdminProtectedRoute - No admin, redirecting to admin login');
    return <Navigate to="/admin/login" />;
  }

  console.log('AdminProtectedRoute - Admin access granted');
  return children;
}

export default AdminProtectedRoute; 