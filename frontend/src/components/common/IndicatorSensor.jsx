import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat'; // Ikon suhu
import OpacityIcon from '@mui/icons-material/Opacity'; // Ikon kelembaban
import BoltIcon from '@mui/icons-material/Bolt'; // Ikon listrik

function IndicatorSensor({ temperature, humidity, color = '#FFFFFF', minTemp = 20, maxTemp = 30 }) {
  // Berikan nilai default jika null
  const displayTemperature = temperature !== null ? `${temperature}°C` : '24°C';
  const displayHumidity = humidity !== null ? `${humidity}%` : '30%';

  // Cek apakah suhu di luar range
  const isTemperatureOutOfRange = temperature !== null && (temperature < minTemp || temperature > maxTemp);

  const textColor = isTemperatureOutOfRange ? '#FF495C' : color; // Merah jika suhu di luar range
  const backgroundColor = isTemperatureOutOfRange ? '#FF495C' : '#5EC38B'; // Merah jika suhu di luar range

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 347,
        marginLeft: '8px',
        marginRight: 'auto',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Pusatkan secara horizontal
      }}
    >
      {/* Judul */}
      {/* <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          marginBottom: '16px',
          color: '#547E96', // Warna teks custom atau merah jika suhu di luar range
        }}
      >
        ----- Indikator Suhu dan Kelembaban -----
      </Typography> */}

      {/* Container untuk indikator suhu dan kelembaban */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          width: '100%',
          marginTop:'10px',
        }}
      >
        {/* Kotak Besar di Sebelah Kiri (2 row dan 2 column) */}
        <Grid item xs={6}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '16px',
          marginRight: '16px', // Geser ke kanan dengan marginRight
          background: 'linear-gradient(145deg,rgb(120, 209, 160), #5EC38B)',
          borderRadius: '30px',
          height: '160px',
          width: '110%', // Lebar 2x dari kotak kecil
          border: '2px solid #E7F4FB',
          transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', // Efek zoom
            borderColor: '#E7F4FB', // Perubahan warna border
            opacity: 0.85, // Sedikit mengurangi opacity saat hover
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0px', // Jarak antara ikon dan teks
            marginLeft: '-28px',
          }}
        >
          <BoltIcon sx={{ color: textColor, fontSize: '100px' }} /> {/* Ikon listrik */}
          <Typography variant="subtitle2" sx={{ color: textColor, textAlign: 'center', fontSize: '0.9rem' }}>
            Sisa Waktu <br />
            3 Jam 15 Menit 
          </Typography>
        </Box>
      </Box>
    </Grid>

        {/* Kotak Kecil di Sebelah Kanan (1 row dan 1 column) */}
        <Grid item xs={6}>
          <Grid container spacing={2} sx={{ marginLeft: '16px' }}> {/* Geser ke kanan dengan marginLeft */}
            {/* Indikator Suhu */}
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
                  height: '55px', // Tinggi 1x dari kotak kecil
                  width: '55px',
                  border: '2px solid #E7F4FB',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)', // Efek zoom
                    borderColor: '#E7F4FB', // Perubahan warna border
                    opacity: 0.85, // Sedikit mengurangi opacity saat hover
                  },
                }}
              >
                <ThermostatIcon fontSize="medium" sx={{ color: color }} /> {/* Warna ikon custom atau merah */}
                <Typography variant="h6" sx={{ mt: 1, color: textColor }}>
                  {displayTemperature}
                </Typography>
              </Box>
            </Grid>

            {/* Indikator Kelembaban */}
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
                  height: '55px', // Tinggi 1x dari kotak kecil
                  width: '55px',
                  border: '2px solid #E7F4FB',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)', // Efek zoom
                    borderColor: '#E7F4FB', // Perubahan warna border
                    opacity: 0.85, // Sedikit mengurangi opacity saat hover
                  },
                }}
              >
                <OpacityIcon fontSize="medium" sx={{ color: color }} /> {/* Warna ikon custom atau merah */}
                <Typography variant="h6" sx={{ mt: 1, color: textColor }}>
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