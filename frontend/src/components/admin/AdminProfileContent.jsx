import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
} from '@mui/material';

function ProfileContent({ user, handleLogout }) {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 200px)',
        overflow: 'hidden',
        px: 2,
      }}
    >
        {/* Scrollable Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 3,
            py: 4,
          }}
        >
          {/* Avatar & Username */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: '#5EC38B',
                fontSize: '2.5rem',
              }}
            >
            </Avatar>
          </Box>

          {/* Informasi Akun */}
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Nama
          </Typography>
          <Box sx={inputStyle}>{user?.username}</Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Email
          </Typography>
          <Box sx={inputStyle}>{user?.email}</Box>

          {user?.role === 'user' && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                No. Kost
              </Typography>
              <Box sx={inputStyle}>
                {user?.no_room ? user.no_room : 'Belum ada'}
              </Box>
            </>
          )}

          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            Bergabung sejak
          </Typography>
          <Box sx={inputStyle}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
          </Box>

          <Button
            variant="contained"
            // color="error"
            // fullWidth
            onClick={handleLogout}
            sx={{
              minWidth: '60%',
              minHeight: '50px',
              mx: 'auto',
              display: 'block',
              bgcolor: '#FF4D4D',
              py: 1.5,
              mt: 4,
              borderRadius: 4,
              textTransform: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#FF1A1A',
              },
            }}
          >
            Keluar
          </Button>
        </Box>
    </Box>
  );
}

const inputStyle = {
  // backgroundColor: '#fff',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #ddd',
  fontSize: '1rem',
};

export default ProfileContent;
