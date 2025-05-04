import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

const AdminUserList = ({ onBack, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error('Gagal ambil user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 414,
        mx: 'auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
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
    py: 1
  }}
>
  <IconButton onClick={onBack} size="small">
    <ArrowBackIosNewIcon fontSize="small" />
  </IconButton>
  <Typography variant="h6" fontWeight="bold" ml={1}>
    Penghuni
  </Typography>
      </Box>

      {/* Scrollable List */}
      {loading ? (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', px: 1,paddingBottom: '80%' }}>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => onSelectUser(user.id)}
                sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start', py: 1.5 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#5EC38B' }}>
                    {user.username?.[0]?.toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">
                      {user.username} - {user.no_room ? `(No ${user.no_room})` : 'Belum aktif'}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AdminUserList;
