import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHome from './pages/admin/AdminPages';
import UserHome from './pages/user/UserPages';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ReportPayment from './components/user/ReportPayment';
import AdminReportPayment from './components/admin/AdminReportPayment';
import AdminReportDetail from './components/admin/AdminReportDetail';
import MonitoringSensor from './components/admin/MonitoringSensor';


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
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/report-payment" element={<ReportPayment />} />
       {/* <Route path="/admin/laporan" element={<AdminReportPayment />} /> */}
      <Route
        path="/admin/laporan"
        element={
          user && user.role === 'admin' ? (
            <AdminReportPayment />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/admin/laporan/:id" element={<AdminReportDetail />} />
      <Route path="/admin/monitoring" element={<MonitoringSensor />} />

    </Routes>

    </ThemeProvider>
  );
}

export default App;
