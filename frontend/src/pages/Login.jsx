import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Ikon mata
import axios from 'axios';
import MobileContainer from '../components/common/MobileContainer';
import bgTop from '../assets/Cloud1.png';
import bgBottom from '../assets/Cloud2.png';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol visibilitas password
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { email, password },
        { withCredentials: true }
      );
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login error', error);
      setErrorMessage('Login gagal. Silakan periksa kembali email dan password Anda.');
      setOpenSnackbar(true);
    }
  };

  // Fungsi untuk mengontrol visibilitas password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
<MobileContainer sx={{ position: 'relative' }}>
  {/* Background Top */}
  <Box
    component="img"
    src={bgTop}
    alt="Background Top"
    sx={{
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
      height: '18%',
    }}
  />

  {/* Kontainer Tengah */}
  <Box
    sx={{
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: 2,
    }}
  >
    <Box sx={{ width: '95%', maxWidth: 400 }}>
      <Typography variant="h4" sx={{ textAlign: 'left' }}>
        Masuk
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, textAlign: 'left', color: '#666464' }}>
        Hi, Selamat datang di Smartsewa
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          InputProps={{ sx: { borderRadius: 5 } }}
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          InputProps={{
            sx: { borderRadius: 5 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Kata Sandi"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Typography
        variant="caption"
        color="primary"
        sx={{
          display: 'inline-block',
          fontWeight: 'bold',
          cursor: 'pointer',
          textDecoration: 'underline',
          mt: 1,
        }}
        onClick={() => navigate('/forgot-password')}
      >
        Lupa Kata Sandi?
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        sx={{
          mt: 4,
          textTransform: 'none',
          borderRadius: 3,
          backgroundColor: '#5EC38B',
          '&:hover': { backgroundColor: '#51B57D' },
        }}
      >
        Masuk
      </Button>

      <Box sx={{ mt: 6, textAlign: 'left' }}>
        <Typography variant="subtitle1" sx={{ display: 'inline', mr: 1 }}>
          Belum memiliki akun?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            display: 'inline',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#51B57D',
          }}
          onClick={() => navigate('/register')}
        >
          Daftar
        </Typography>
      </Box>
    </Box>
  </Box>

  {/* Snackbar */}
  <Snackbar
    open={openSnackbar}
    autoHideDuration={2000}
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '80%', borderRadius: '20px' }}>
      {errorMessage}
    </Alert>
  </Snackbar>

{/* Background Bottom */}
      <Box
        component="img"
        src={bgBottom}
        alt="Background Bottom"
        sx={{
          width: '100%',
          height: 'auto',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
</MobileContainer>

  );
}

export default Login;