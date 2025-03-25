import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';

const EmailVerification = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam === 'success') {
      setStatus('success');
      setMessage('Email verified successfully! You can now log in.');
      setTimeout(() => {
        navigate('/admin-login');
      }, 3000);
      return;
    }
    if (statusParam === 'error') {
      setStatus('error');
      setMessage('Error verifying email. Please try again or contact support.');
      setTimeout(() => {
        navigate('/admin-register');
      }, 3000);
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
        setTimeout(() => {
          navigate('/admin-login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Error verifying email');
        setTimeout(() => {
          navigate('/admin-register');
        }, 3000);
      }
    };

    verifyEmail();
  }, [token, navigate, searchParams]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        {status === 'verifying' && (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying your email...
            </Typography>
          </>
        )}
        {status === 'success' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default EmailVerification; 