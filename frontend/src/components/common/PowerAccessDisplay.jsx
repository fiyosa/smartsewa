import { Box, Typography, LinearProgress } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

export default function PowerAccessDisplay() {
  // Dummy data: anggap 10 hari 23 jam = kira-kira 11 hari
  const maxDays = 30;
  const currentDays = 11;
  const percentage = (currentDays / maxDays) * 100;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      </Box>

      <Typography variant="body1" fontSize={20}>
        {currentDays} hari tersisa
      </Typography>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 12,
          borderRadius: 5,
          backgroundColor: '#eee',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FFD700',
          },
        }}
      />
    </Box>
  );
}
