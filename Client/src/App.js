import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import CustomerRegistration from './components/CustomerRegistration';
import AdminRegistration from './components/AdminRegistration';
import AdminLogin from './components/AdminLogin';
import EmailVerification from './components/EmailVerification';
import AdminDashboard from './components/AdminDashboard';

function MainLayout() {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  return (
    <>
      {!isAdminDashboard && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Authentication System
            </Typography>
            <Button color="inherit" component={Link} to="/customer-register">
              Customer Register
            </Button>
            <Button color="inherit" component={Link} to="/admin-register">
              Admin Register
            </Button>
            <Button color="inherit" component={Link} to="/admin-login">
              Admin Login
            </Button>
          </Toolbar>
        </AppBar>
      )}
      
      <Container>
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route path="/customer-register" element={<CustomerRegistration />} />
            <Route path="/admin-register" element={<AdminRegistration />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/verify-email/:token" element={<EmailVerification />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={
              <Typography variant="h4" component="h1" align="center" sx={{ mt: 4 }}>
                Welcome to User Authentication System
              </Typography>
            } />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;