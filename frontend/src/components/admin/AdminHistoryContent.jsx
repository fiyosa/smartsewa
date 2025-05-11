import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const AdminHistoryContent = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/history`);
      setHistoryData(res.data);
    } catch (err) {
      console.error('Gagal ambil history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatActivity = (activity, username) => {
    if (!activity || !username) return activity;

    if (activity.includes('dikirim')) {
      return `${activity} oleh ${username}`;
    }

    if (activity.includes('dikonfirmasi')) {
      return `${activity.replace('telah dikonfirmasi', `dari ${username} telah dikonfirmasi`)}`;
    }

    if (activity.includes('ditolak')) {
      return `${activity.replace('telah ditolak', `dari ${username} telah ditolak`)}`;
    }

    return activity;
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 414,
        height: 'calc(100vh - 200px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          padding: '8px',
          textAlign: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        Riwayat Aktivitas
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          paddingBottom: '60%',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
            '&:hover': { background: '#555' },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 transparent',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : historyData.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={2}>
            Belum ada riwayat.
          </Typography>
        ) : (
          <List>
            {historyData.map((item, index) => {
              const username = item.User?.username || 'Pengguna';
              const activity = formatActivity(item.activity, username);
              const date = new Date(item.createdAt).toLocaleDateString('id-ID');
              const jumlah = Number(item.LaporanPembayaran?.jumlah || 0).toLocaleString('id-ID');
              const periode = item.LaporanPembayaran?.periodePembayaran || '-';

              return (
                <React.Fragment key={index}>
                  <ListItem disablePadding sx={{ py: 0.5 }}>
                    <Box
                      sx={{
                        width: '100%',
                        borderBottom: '1px solid #eee',
                        pb: 0.5,
                        ml: 1,
                        pr: 1,
                      }}
                    >
                      <ListItemText
                        primary={activity}
                        secondary={
                          ['dikirim', 'dikonfirmasi', 'ditolak'].some(word => item.activity.includes(word))
                            ? `${date} • ${periode} • Rp ${jumlah}`
                            : `${date}`
                        }
                        primaryTypographyProps={{ sx: { fontWeight: 'bold', fontSize: 14 } }} 
                        secondaryTypographyProps={{ color: 'text.secondary', fontSize: 12 }}
                      />
                    </Box>
                  </ListItem>

                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default AdminHistoryContent;
