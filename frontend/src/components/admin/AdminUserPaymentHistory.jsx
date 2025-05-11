import React, { useEffect, useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText,
  Divider, CircularProgress, IconButton, Chip
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

const AdminUserPaymentHistory = ({ userId, onBack, onSelectPayment  }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/laporan-pembayaran`);
      const userPayments = res.data.filter(p => p.userId === userId);
      setPayments(userPayments);
    } catch (err) {
      console.error('Gagal ambil riwayat pembayaran:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 414,
        mx: 'auto',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
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
          Riwayat Pembayaran
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2, paddingBottom: '80%' }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : payments.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            Belum ada riwayat pembayaran.
          </Typography>
        ) : (
          <List>
            {payments.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" button
                  onClick={() => onSelectPayment(item.id)}
                  disableGutters>
                  <ListItemText
                    primary={`Periode: ${item.periodePembayaran}`}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Jumlah: Rp {Number(item.jumlah).toLocaleString('id-ID')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tanggal: {new Date(item.tanggalPembayaran).toLocaleDateString('id-ID')}
                        </Typography>
                      </>
                    }
                  />
                  <Chip
                    label={item.status}
                    color={
                      item.status === 'confirmed'
                        ? 'success'
                        : item.status === 'rejected'
                        ? 'error'
                        : 'warning'
                    }
                    size="small"
                    sx={{ ml: 1, textTransform: 'capitalize' }}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default AdminUserPaymentHistory;
