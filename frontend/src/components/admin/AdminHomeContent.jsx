import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import IndicatorSensor from '../../components/common/IndicatorSensor'; 
import buttonImage1 from '../../assets/ButtonLaporanPembayaran.png'; 
import buttonImage2 from '../../assets/ButtonLaporanPenghuni.png';
import buttonImage3 from '../../assets/ButtonDataPenghuni.png'; 

function HomeContent() {

  return (
    // Container utama dengan overflow hidden, sehingga jika konten di-scroll ke atas akan terpotong
    <Box sx={{ height: 'calc(100vh - 230px)', overflow: 'hidden' }}>
        {/* Container tombol dengan margin atas */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, marginTop: '20px' }}>
          {/* Tombol pertama */}
          <Box
            component="img"
            src={buttonImage1}
            alt="Button 1"
            sx={{
              width: { xs: '100%', sm: '347px' },
              maxWidth: '347px',
              height: 'auto',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => alert('Gambar 1 diklik!')}
          />

          {/* Tombol kedua */}
          <Box
            component="img"
            src={buttonImage2}
            alt="Button 2"
            sx={{
              width: { xs: '100%', sm: '347px' },
              maxWidth: '347px',
              height: 'auto',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => alert('Gambar 2 diklik!')}
          />
          
          {/* Tombol ketiga */}
          <Box
            component="img"
            src={buttonImage3}
            alt="Button 3"
            sx={{
              width: { xs: '100%', sm: '347px' },
              maxWidth: '347px',
              height: 'auto',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => alert('Gambar 3 diklik!')}
          />
        </Box>
      </Box>
  );
}

export default HomeContent;
