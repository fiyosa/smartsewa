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

import bgTop from '../../assets/Cloud.png';
import bgBottom from '../../assets/Cloud3.png';
import homeIcon from '../../assets/homeIcon.png';
import homeIconSelected from '../../assets/homeIconSelected.png';
import profileIcon from '../../assets/profileIcon.png';
import profileIconSelected from '../../assets/profileIconSelected.png';
import UserChatContent from '../../components/user/UserChatContent';

function UserPages({ user, setUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [activePage, setActivePage] = useState('home');
  const hideBottomNavPages = ['chat']; 
  const showBottomNav = !hideBottomNavPages.includes(activePage);
  
  const navigationTabs = [
    { icon: <img src={tab === 0 ? homeIconSelected : homeIcon} width="20" alt="Home" /> },
    { icon: <HistoryIcon /> },
    { icon: <img src={tab === 2 ? profileIconSelected : profileIcon} width="20" alt="Profile" /> }
  ];

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const renderContent = () => {
    if (activePage === 'chat') {
      return <UserChatContent onBack={() => setActivePage('home')} />;
    }
    if (tab === 0 && activePage === 'home') {
      return <HomeContent user={user} onOpenChat={() => setActivePage('chat')} />;
    }
    if (tab === 1) return <HistoryContent userId={user.id} />;
    if (tab === 2) return <ProfileContent user={user} setUser={setUser} handleLogout={handleLogout} />;
};

  return (
    <MobileContainer>
      <CommonBackground bgTop={bgTop} bgBottom={bgBottom} sx={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} />

      <CommonGreeting
        username={user.username}
        appName="Smartsewa"
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 2,
          padding: '16px',
        }}
      />

      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          pt: '80px',
          // pb: '56px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {renderContent()}
      </Box>

      {showBottomNav && (
        <CommonBottomNavigation
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue);
            setActivePage('home');
          }}
          tabs={navigationTabs}
          selectedColor="#5EC38B"
        />
      )}
    </MobileContainer>
  );
}

export default UserPages;
