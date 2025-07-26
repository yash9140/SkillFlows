import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
              if (data.id || data._id) {
        setUser(data);
      } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

const login = async (email, password) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    let errorMessage = 'Login failed';
    if (contentType && contentType.includes('application/json')) {
      const errorData = await res.json();
      errorMessage = errorData.error || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();

  // Save token and set user
  localStorage.setItem('token', data.token);
  setUser(data.user);

  return data;
};

const register = async (name, email, password, role = 'user') => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    let errorMessage = 'Registration failed';
    if (contentType && contentType.includes('application/json')) {
      const errorData = await res.json();
      errorMessage = errorData.error || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();

  //  Save token and set user
  localStorage.setItem('token', data.token);
  setUser(data.user);

  return data;
};


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 