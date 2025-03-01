import React, { useState } from 'react';
import { Typography, Button, BottomNavigation, Box, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MobileContainer from '../components/MobileContainer';
import HomeContent from '../components/HomeContent';
import HistoryContent from '../components/HistoryContent';
import ProfileContent from '../components/ProfileContent';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import bgTop from '../assets/Cloud.png'  
import bgBottom from '../assets/Cloud2.png'  
import homeIcon from '../assets/homeIcon.png'  
import homeIconSelected from '../assets/homeIconSelected.png'
import profileIcon from '../assets/profileIcon.png'
import profileIconSelected from '../assets/profileIconSelected.png'

function UserHome({ user, setUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  
  return (
    <MobileContainer>
      {/* Background Top */}
      <Box
            component="img"
            src={bgTop}
            alt="Background Top"
            sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            //  height: '15%',
            }}
        />
      {/* Top Greeting */}
      <Typography variant="h5" fontWeight="bold" textAlign="left" sx={{ mt: 5 }}>
        Hi {user.username}
      </Typography>
      <Typography variant="body1" sx={{ mt: '10px', textAlign: 'left', color: '#0A8ED9', marginLeft: '3px', mb: "50px" }}>
        Selamat datang di <b>Smartsewa</b>
      </Typography>

      {/* Content Switch */}
      <div>
        {tab === 0 && <HomeContent />}
        {tab === 1 && <HistoryContent />}
        {tab === 2 && <ProfileContent />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        // showLabels
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        sx={{ position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '414px',
          bgcolor: 'background.paper',
          boxShadow: 5,
          '& .Mui-selected': {
            color: '#0A8ED9'
          }}}
      >
        <BottomNavigationAction label="●" icon={<img src = {tab === 0 ? homeIconSelected : homeIcon}  width="20" />} />
        <BottomNavigationAction label="●" icon={<HistoryIcon />} />
        <BottomNavigationAction label="●" icon={<img src = {tab === 2 ? profileIconSelected : profileIcon}  width="20" />} />
      </BottomNavigation>
    </MobileContainer>
  );
}

export default UserHome;
