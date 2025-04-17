import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Alert,
  Stack,
  Typography,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // ✅ Tambah ini

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // ✅ Tambah ini

  const handleReset = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Isi semua field.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password tidak cocok.');
      return;
    }

    setSuccess('Password berhasil direset!');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      navigate('/'); // ✅ Redirect ke login
    }, 1500);
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
          Reset Password
        </Typography>

        <form onSubmit={handleReset}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              label="Password Baru"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)}>
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 4,
                },
              }}
            />

            <TextField
              variant="outlined"
              label="Konfirmasi Password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 4,
                },
              }}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ borderRadius: 4, py: 1.5, fontWeight: 500, backgroundColor: '#5EC38B', '&:hover': { backgroundColor: '#51B57D' } }}
            >
              Reset Password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default ResetPassword;
