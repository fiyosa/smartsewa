import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('Email tidak boleh kosong.');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, { email });
      setMessage(res.data.message);
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal mengirim email reset');
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f7f9fa"
      px={2}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 360,
          width: '100%',
          p: 4,
          borderRadius: 4,
          bgcolor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h6" fontWeight={500} textAlign="center" mb={3}>
          Lupa Password
        </Typography>

        <Stack spacing={2}>
          <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
            Masukkan email yang terdaftar. Kami akan kirimkan link reset password ke email kamu.
          </Typography>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 4 } }}
          />

          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="info">{message}</Alert>}

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 500,
              borderRadius: 4,
              textTransform: 'none',
              backgroundColor: '#5EC38B',
              '&:hover': { backgroundColor: '#51B57D' },
            }}
          >
            Kirim Link Reset
          </Button>

          <Button
            fullWidth
            onClick={() => navigate('/')}
            sx={{
              textTransform: 'none',
              mt: 1,
              fontWeight: 400,
            }}
          >
            Kembali ke Login
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ForgotPassword;
