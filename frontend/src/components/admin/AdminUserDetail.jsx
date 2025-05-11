import {
    Box, Typography, Avatar, Paper, CircularProgress,
    MenuItem, Select, FormControl, InputLabel, IconButton, Button
  } from '@mui/material';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
  
  const AdminUserDetail = ({ userId, onBack, onViewPaymentHistory }) => {
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
        await fetchUser(); 
      } catch (err) {
        console.error('Gagal update kamar:', err);
      } finally {
        setSaving(false);
      }
    };
  
    if (!user) return <Box p={4}><CircularProgress /></Box>;
  
    return (
      <Box maxWidth={414} mx="auto" height="80vh" display="flex" flexDirection="column" overflow="hidden">
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
              sx={{ width: 80, height: 80, bgcolor: '#5EC38B'}}
            />
          </Box>
  
          <Typography variant="body2" fontWeight="bold" mb={0.5}>Nama</Typography>
          <Box
            sx={{
              mb: 2,
              px: 2,
              py: 1.5,
              borderRadius: 4,
              border: '1px solid #ccc',
              backgroundColor: '#fff',
            }}
          >
            <Typography>{user.username}</Typography>
          </Box>

          <Typography variant="body2" fontWeight="bold" mb={0.5}>Email</Typography>
          <Box
            sx={{
              mb: 3,
              px: 2,
              py: 1.5,
              borderRadius: 4,
              border: '1px solid #ccc',
              backgroundColor: '#fff',
            }}
          >
            <Typography>{user.email}</Typography>
          </Box>

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
            variant="outlined"
            onClick={onViewPaymentHistory}
            sx={{
              mb: 3, 
              borderRadius: 3,
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
              borderColor: '#ccc',
              color: 'black',
              '&:hover': {
                borderColor: '#aaa',
                backgroundColor: '#f9f9f9',
              }
            }}
            endIcon={<ArrowBackIosNewIcon sx={{ transform: 'rotate(180deg)' }} />}
            >
              Riwayat Pembayaran
            </Button>

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
  