import { Box, Typography, LinearProgress } from '@mui/material';

export default function PowerAccessDisplay() {
  const maxHari = 30;
  const sisaHari = 17;
  const sisaJam = 50;
  const persen = ((sisaHari + sisaJam / 24) / maxHari) * 100;

  return (
    <Box sx={{ position: 'relative', mt: 2, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={1} mx={1}>
        Akses Listrik
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={persen}
          sx={{
            height: 18,
            borderRadius: 10,
            backgroundColor: '#eee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#FFD700',
              borderRadius: 10,
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {sisaHari} Hari {sisaJam} Jam
        </Typography>
      </Box>
    </Box>
  );
}
