import {
    Box, Typography, Avatar, Paper, CircularProgress,
    MenuItem, Select, FormControl, InputLabel, IconButton, Button
  } from '@mui/material';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
  
  const AdminUserDetail = ({ userId, onBack }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [saving, setSaving] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
    useEffect(() => {
      fetchUser();
      fetchAllUsers();
    }, []);
  
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${userId}`);
        setUser(res.data);
        setSelectedRoom(res.data.no_room || '');
      } catch (err) {
        console.error('Gagal ambil data user:', err);
      }
    };
  
    const fetchAllUsers = async () => {
      const res = await axios.get(`${API_URL}/api/users`);
      setAllUsers(res.data);
    };
  
    const usedRooms = allUsers
      .filter((u) => u.id !== userId && u.no_room)
      .map((u) => String(u.no_room));
  
    const roomOptions = [
      '', // opsi tanpa kamar
      ...Array.from({ length: 10 }, (_, i) => String(i + 1)),
    ];
  
    const availableRooms = roomOptions.filter((room) => !usedRooms.includes(room));
  
    const handleSave = async () => {
      try {
        setSaving(true);
        await axios.put(`${API_URL}/api/users/${userId}`, { no_room: selectedRoom });
        await fetchUser(); // Refresh data
      } catch (err) {
        console.error('Gagal update kamar:', err);
      } finally {
        setSaving(false);
      }
    };
  
    if (!user) return <Box p={4}><CircularProgress /></Box>;
  
    return (
      <Box maxWidth={414} mx="auto" height="100vh" display="flex" flexDirection="column" overflow="hidden">
        {/* Header Sticky */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid #eee',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <IconButton onClick={onBack} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Detail Penghuni
          </Typography>
        </Box>
  
        {/* Scrollable Body */}
        <Box sx={{ px: 3, py: 3, overflowY: 'auto', flex: 1, paddingBottom: '80%' }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src="/avatar-placeholder.png"
              sx={{ width: 100, height: 100, bgcolor: '#5EC38B'}}
            />
          </Box>
  
          <Typography variant="body2" fontWeight="bold" mb={0.5}>Nama</Typography>
          <Paper sx={{ p: 1.5, mb: 2, borderRadius: 4 }}>
            <Typography>{user.username}</Typography>
          </Paper>
  
          <Typography variant="body2" fontWeight="bold" mb={0.5}>Email</Typography>
          <Paper sx={{ p: 1.5, mb: 4, borderRadius: 4 }}>
            <Typography>{user.email}</Typography>
          </Paper>
  
          {/* <Typography variant="body2" fontWeight="bold" mb={0.5}>No Kost</Typography> */}
          <FormControl fullWidth sx={{ mb: 3, borderRadius: 8 }}>
            <InputLabel>Nomor Kamar</InputLabel>
            <Select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              label="Nomor Kamar"
            >
              {availableRooms.map((room) => (
                <MenuItem key={room} value={room}>{room || 'Tidak ada nomor'}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ borderRadius: 3, textTransform: 'none',                   bgcolor: '#5EC38B',
         }}
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default AdminUserDetail;
  