import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Paper,
  Container,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SensorChart from '../common/SensorChart';
import PowerAccessDisplay from '../common/PowerAccessDisplay';

const users = ['User 1', 'User 2', 'User 3'];

export default function MonitoringSensor({ onBack }) {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <Box
      sx={{
        maxWidth: 414,
        mx: 'auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Sticky Header with Back Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          borderBottom: '1px solid #eee',
          py: 1,
          px: 2,
        }}
      >
        <IconButton onClick={onBack} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>
          Monitoring Sensor
        </Typography>
      </Box>

      {/* Konten Scrollable */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          px: 2,
          pb: 4,
          pt: 3,
          paddingBottom: '80%',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
        }}
      >
        <Container maxWidth="sm" sx={{ px: 0 }}>
          {/* Dropdown (TextField select, tanpa tambahan warna) */}
          <TextField
            select
            fullWidth
            label="Pilih Penghuni"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </TextField>

          {/* Grafik */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight="bold" mb={1}>
              Grafik Suhu & Kelembaban
            </Typography>
            <SensorChart />
          </Paper>

          {/* Listrik */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight="bold" mb={1}>
              Sisa Akses Listrik
            </Typography>
            <PowerAccessDisplay />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
