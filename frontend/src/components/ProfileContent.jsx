import React from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';


const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

function ProfileContent() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Ini adalah halaman Profile
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </div>

  );
}

export default ProfileContent;