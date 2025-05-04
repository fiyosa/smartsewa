import React from 'react';
import { Container } from '@mui/material';

const MobileContainer = ({ children, sx, ...other }) => {
  return (
    <Container
      disableGutters // ✅ Hilangkan padding internal bawaan
      sx={{
        maxWidth: '414px',
        margin: 'auto',
        paddingTop: 4,
        position: 'relative', // ✅ Bantu positioning dropdown
        ...sx,
      }}
      {...other}
    >
      {children}
    </Container>
  );
};

export default MobileContainer;
