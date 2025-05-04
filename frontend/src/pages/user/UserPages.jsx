import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MobileContainer from '../../components/common/MobileContainer';
import HomeContent from '../../components/user/UserHomeContent';
import HistoryContent from '../../components/user/UserHistoryContent';
import ProfileContent from '../../components/user/UserProfileContent';
import CommonGreeting from '../../components/common/CommonGreeting';
import CommonBackground from '../../components/common/CommonBackground';
import CommonBottomNavigation from '../../components/common/CommonBottomNavigation';
import HistoryIcon from '@mui/icons-material/History';

// Assets
import bgTop from '../../assets/Cloud.png'; // Updated path
import bgBottom from '../../assets/Cloud3.png'; // Updated path
import homeIcon from '../../assets/homeIcon.png'; // Updated path
import homeIconSelected from '../../assets/homeIconSelected.png';
import profileIcon from '../../assets/profileIcon.png';
import profileIconSelected from '../../assets/profileIconSelected.png';

function UserPages({ user, setUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const navigationTabs = [
    { icon: <img src={tab === 0 ? homeIconSelected : homeIcon} width="20" /> },
    { icon: <HistoryIcon />  },
    { icon: <img src={tab === 2 ? profileIconSelected : profileIcon} width="20" /> }
  ];

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <MobileContainer>
      <CommonBackground 
        bgTop={bgTop} 
        bgBottom={bgBottom} 
        sx={{ 
          position: 'fixed', // Tetap di tempatnya
          top: 0,
          left: 0,
          zIndex: 0, // Di belakang elemen lain
        }} 
      />

      {/* Greeting (Tetap di atas) */}
      <CommonGreeting 
        username={user.username} 
        appName="Smartsewa" 
        sx={{ 
          position: 'fixed', // Tetap di atas
          width: '100%',
          zIndex: 2, // Di atas background
          // backgroundColor: 'white', // Agar teks terlihat jelas
          padding: '16px',
        }} 
      />

      
      {/* Content Area */}
      <Box sx={{
        height: 'calc(100vh - 200px)',
        // overflowY: 'scroll',
         paddingTop: '150px',
        paddingBottom: '56px',
        position: 'relative', 
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 0, // Pastikan lebih kecil dari elemen lain
        // scrollbarWidth: 'none', // Untuk Firefox
        // '&::-webkit-scrollbar': {
        //   display: 'none' // Untuk Chrome, Safari, Edge
        // }
      }}>

        {tab === 0 && <HomeContent />}
        {tab === 1 && <HistoryContent userId={user.id} />}
        {tab === 2 && <ProfileContent user={user} setUser={setUser} handleLogout={handleLogout} />}
      </Box>

      <CommonBottomNavigation
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        tabs={navigationTabs}
        selectedColor="#5EC38B"
      />
    </MobileContainer>
  );
}

export default UserPages;