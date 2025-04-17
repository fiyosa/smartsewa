import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IndicatorSensor from '../../components/common/IndicatorSensor';
import buttonImage1 from '../../assets/ButtonPembayaran.png';
import buttonImage2 from '../../assets/ButtonPengaduan.png';
import ReportPayment from './ReportPayment';

function UserHomeContent() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [showReportPayment, setShowReportPayment] = useState(false);
  const navigate = useNavigate();

  // Function to show the report payment form
  const handleClickLaporPembayaran = () => {
    setShowReportPayment(true);
  };

  // Function to return to the main home view
  const handleBackToHome = () => {
    setShowReportPayment(false);
  };

  // Fetch temperature and humidity data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor-data'); // Replace with the correct API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTemperature(data.temperature || null);
        setHumidity(data.humidity || null);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setTemperature(null);
        setHumidity(null);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ height: 'calc(100vh - 230px)', overflow: 'hidden' }}>
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {console.log('Temperature:', temperature, 'Humidity:', humidity)}

        {/* Hide IndicatorSensor when ReportPayment is shown */}
        {!showReportPayment && (
          <IndicatorSensor temperature={temperature} humidity={humidity} />
        )}

        {showReportPayment ? (
          <ReportPayment onClose={handleBackToHome} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
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
              onClick={handleClickLaporPembayaran}
            />

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
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UserHomeContent;
