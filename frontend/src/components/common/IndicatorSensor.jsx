import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat'; // Ikon suhu
import OpacityIcon from '@mui/icons-material/Opacity'; // Ikon kelembaban
import BoltIcon from '@mui/icons-material/Bolt'; // Ikon listrik

function IndicatorSensor({ temperature, humidity, color = '#FFFFFF', minTemp = 20, maxTemp = 30, minHum = 30, maxHum = 75 }) {
  const displayTemperature = temperature !== null ? `${temperature}°C` : 'N/A';
  const displayHumidity = humidity !== null ? `${humidity}%` : 'N/A';

  // Cek apakah suhu di luar range
  const isTemperatureOutOfRange = temperature !== null && (temperature < minTemp || temperature > maxTemp);
  const isHumidityOfRange = humidity !== null && (humidity < minHum || temperature > maxHum);

  // const textColor = isTemperatureOutOfRange ? '#FF495C' : color; // Merah jika suhu di luar range
  const backgroundColor = isTemperatureOutOfRange ? '#FF495C' : '#5EC38B'; // Merah jika suhu di luar range

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 347,
        marginLeft: '35px',
        //marginRight: 'auto',
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '16px',
              marginRight: '16px',
              background: 'linear-gradient(145deg,rgb(120, 209, 160), #5EC38B)',
              borderRadius: '30px',
              height: '160px',
              width: '110%',
              border: '2px solid #E7F4FB',
              transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                borderColor: '#E7F4FB',
                opacity: 0.85,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0px',
                marginLeft: '-28px',
              }}
            >
              <BoltIcon sx={{ color: '#FFFFFF', fontSize: '100px' }} />
              <Typography variant="subtitle2" sx={{ color: '#FFFFFF', textAlign: 'center', fontSize: '0.9rem' }}>
                Sisa Waktu <br />
                3 Jam 15 Menit
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} sx={{ marginLeft: '16px' }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '16px',
                  marginLeft: '26px',
                  background: backgroundColor,
                  borderRadius: '30px',
                  height: '55px',
                  width: '55px',
                  border: '2px solid #E7F4FB',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderColor: '#E7F4FB',
                    opacity: 0.85,
                  },
                }}
              >
                <ThermostatIcon fontSize="medium" sx={{ color: color }} />
                <Typography variant="h6" sx={{ mt: 1, color: '#FFFFFF' }}>
                  {displayTemperature}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '16px',
                  marginLeft: '26px',
                  background: backgroundColor,
                  borderRadius: '30px',
                  height: '55px',
                  width: '55px',
                  border: '2px solid #E7F4FB',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderColor: '#E7F4FB',
                    opacity: 0.85,
                  },
                }}
              >
                <OpacityIcon fontSize="medium" sx={{ color: color }} />
                <Typography variant="h6" sx={{ mt: 1, color: '#FFFFFF' }}>
                  {displayHumidity}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IndicatorSensor;
