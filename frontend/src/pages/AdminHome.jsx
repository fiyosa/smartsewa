import React from 'react'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MobileContainer from '../components/MobileContainer'

function AdminHome({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <MobileContainer>
      <Typography variant="h4" gutterBottom>
        Halaman Admin
      </Typography>
      <Typography>Selamat datang, {user.username}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </MobileContainer>
  )
}

export default AdminHome
