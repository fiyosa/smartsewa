import React from 'react';
import { Typography, Button, Box, Avatar, Paper } from '@mui/material';

function ProfileContent({ user, handleLogout }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 3,
      maxWidth: 500,
      mx: 'auto'
    }}>
      <Paper elevation={3} sx={{ 
        p: 3, 
        width: '100%',
        borderRadius: '16px',
        backgroundColor: '#f5f5f5'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              bgcolor: '#547E96',
              fontSize: '2.5rem'
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {user?.username}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Informasi Akun
          </Typography>
          
          <Box sx={{ 
            backgroundColor: 'white', 
            p: 2, 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Status:</strong> {user?.role === 'user' ? 'Penyewa' : user?.role}
            </Typography>
            {user?.no_room && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>No. Room:</strong> {user.no_room}
              </Typography>
            )}
            <Typography variant="body1">
            <strong>Bergabung sejak:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
            </Typography>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
          fullWidth
          sx={{ 
            mt: 2,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Keluar
        </Button>
      </Paper>
    </Box>
  );
}

export default ProfileContent;
