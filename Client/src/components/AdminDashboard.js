import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/admin-login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin-login');
  };

  const stats = [
    { 
      title: 'Total Users', 
      value: '1,234', 
      icon: <PeopleIcon fontSize="large" />, 
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)'
    },
    { 
      title: 'Total Orders', 
      value: '456', 
      icon: <ShoppingCartIcon fontSize="large" />, 
      color: theme.palette.success.main,
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #81c784 100%)'
    },
    { 
      title: 'Total Revenue', 
      value: '$12,345', 
      icon: <AssessmentIcon fontSize="large" />, 
      color: theme.palette.warning.main,
      gradient: 'linear-gradient(135deg, #ed6c02 0%, #ffb74d 100%)'
    },
    { 
      title: 'Pending Tasks', 
      value: '23', 
      icon: <SettingsIcon fontSize="large" />, 
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #9c27b0 0%, #ce93d8 100%)'
    },
  ];

  if (!user) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.grey[50] }}>
       <AppBar position="static" elevation={0} sx={{ 
        bgcolor: 'white',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Welcome back, <span style={{ color: theme.palette.primary.main }}>{user.firstName}!</span>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Here's your dashboard overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: theme.palette.primary.main,
              color: 'white'
            }}>
              {user.firstName?.[0]?.toUpperCase()}
            </Avatar>
            <IconButton 
              onClick={handleLogout} 
              sx={{ 
                bgcolor: theme.palette.grey[200],
                '&:hover': { bgcolor: theme.palette.grey[300] }
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px 0 rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ 
                  p: 3,
                  background: stat.gradient,
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Box sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      p: 1.5,
                      mr: 2,
                      display: 'flex'
                    }}>
                      {React.cloneElement(stat.icon, { sx: { color: 'white' } })}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                    {stat.value}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography variant="caption" sx={{ opacity: 0.9, mt: 2 }}>
                    Updated just now
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

         <Box sx={{ mt: 4 }}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
            bgcolor: 'background.paper'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Activity
              </Typography>
               <Box sx={{ 
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary'
              }}>
                Activity timeline will appear here
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;