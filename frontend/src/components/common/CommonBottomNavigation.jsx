import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const CommonBottomNavigation = ({ 
  value, 
  onChange, 
  tabs, 
  selectedColor = '#5EC38B', 
  sx 
}) => {
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '414px',
        bgcolor: 'background.paper',
        boxShadow: 10,
        zIndex: 3,
        '& .Mui-selected': {
          color: selectedColor
        },
        ...sx
      }}
    >
      {tabs.map((tab, index) => (
        <BottomNavigationAction
          key={index}
          label="●"
          icon={React.cloneElement(tab.icon, {
            sx: { color: value === index ? selectedColor : 'inherit' }
          })}
        />
      ))}
    </BottomNavigation>
  );
};

export default CommonBottomNavigation;