import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/user" />
          ) : (
            <Login setUser={setUser} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          user && user.role === 'admin' ? (
            <AdminHome user={user} setUser={setUser} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/user"
        element={
          user && user.role === 'user' ? (
            <UserHome user={user} setUser={setUser} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
