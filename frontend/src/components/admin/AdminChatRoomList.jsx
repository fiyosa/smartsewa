import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

function AdminChatRoomList({ onBack, onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/rooms`, { withCredentials: true });
        setRooms(res.data);
      } catch (err) {
        console.error('Gagal ambil room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ px: 2 }}>
     <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          px: 2,
          pt: 2,
          pb: 1,
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton size="small" onClick={onBack}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" ml={1}>
          Laporan Penghuni
        </Typography>
      </Box>
      <List>
        {rooms.map((room) => (
          <ListItem
            key={room.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => onSelectRoom(room.id)}>
                <ArrowForwardIosIcon />
              </IconButton>
            }
            divider
            button
            onClick={() => onSelectRoom(room.id)}
          >
            <ListItemText
              primary={room.User?.username || 'User Tidak Dikenal'}
              secondary={`Email: ${room.User?.email || '-'}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AdminChatRoomList;
