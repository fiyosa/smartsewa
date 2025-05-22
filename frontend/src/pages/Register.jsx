import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import MobileContainer from '../components/common/MobileContainer'
import bgTop from '../assets/Cloud1.png'  
import bgBottom from '../assets/Cloud2.png' 
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.')
      setOpenSnackbar(true)
      return
    }
    try {
      await axios.post(
        'http://localhost:5000/api/register',
        { username, email, password, role: 'user' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setErrorMessage('Registrasi berhasil. Silakan login.');
      setOpenSnackbar(true);
        setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Registration error', error.response ? error.response.data : error);
      setErrorMessage('Registrasi gagal. Silakan periksa kembali data yang Anda masukkan.');
      setOpenSnackbar(true); // Tampilkan snackbar
    }
  }
  

  return (
<MobileContainer>
  {/* Background Top */}
  <Box
    component="img"
    src={bgTop}
    alt="Background Top"
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
      width: '100%',
      height: '18%',
    }}
  />

  {/* Konten Tengah */}
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
        Daftar
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, textAlign: 'left', color: '#666464' }}>
        Silakan daftar untuk membuat akun
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          InputProps={{ sx: { borderRadius: 5 } }}
          label="Nama"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
        <TextField
          InputProps={{
            sx: { borderRadius: 5 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Masukkan Ulang Sandi"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={handleRegister}
        sx={{
          mt: 4,
          textTransform: 'none',
          borderRadius: 3,
          backgroundColor: '#5EC38B',
          '&:hover': { backgroundColor: '#51B57D' },
        }}
      >
        Daftar
      </Button>

      <Box sx={{ mt: 6, textAlign: 'left' }}>
        <Typography variant="subtitle1" sx={{ display: 'inline', mr: 1 }}>
          Sudah memiliki akun?
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
          onClick={() => navigate('/')}
        >
          Masuk
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

  )
}

export default Register
