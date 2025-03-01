import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import MobileContainer from '../components/MobileContainer'
import bgTop from '../assets/Cloud.png'  
import bgBottom from '../assets/Cloud2.png' 

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/register',
        { username, email, password, role: 'user' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Registrasi berhasil. Silakan login.');
      navigate('/');
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
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                width: '100%',
                // height: '15%',
              }}
            />
      <Typography variant="h4" sx={{ mt: '60px', textAlign: 'left' }}>
        Daftar
      </Typography>
      <Typography variant="body1" sx={{ mt: '8px', textAlign: 'left', color: '#666464', marginLeft: '3px'
}}>
        Silahkan Daftar untuk membuat akun  
      </Typography>

      <Box sx={{ mt: '40px', width: '100%' }}>
        <TextField
          InputProps={{ sx: { borderRadius: 5 } }}
          label="Username"
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
          InputProps={{ sx: { borderRadius: 5 } }}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      
      <Button  variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{
          mt: 4,
          borderRadius: 3,
          backgroundColor: '#0A8ED9',
          '&:hover': { backgroundColor: '#087BBF' }
        }}>
        Daftar
      </Button>

      <div style={{ marginTop: '300px', textAlign: 'left' }}>
        <Typography variant="subtitle1" sx={{ display: 'inline', marginRight: '8px', marginLeft: '8px'}}>
          Sudah memiliki akun?
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{
            display: 'inline',
            fontWeight: 'bold', 
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#0A8ED9'

          }}
          onClick={() => navigate('/')}
        >
          Masuk
        </Typography>
      </div>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '80%', borderRadius: '20px' }} >
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',

          // rotate: '180deg',
        }}
      />
    </MobileContainer>
  )
}

export default Register
