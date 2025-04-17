import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

// Data dummy untuk riwayat (history)
const historyData = [
  { id: 1, date: '2023-10-01', activity: 'Pembayaran Sewa anjay', amount: 'Rp 1.500.000' },
  { id: 2, date: '2023-09-25', activity: 'Pembelian Token Listrik', amount: 'Rp 200.000' },
  { id: 3, date: '2023-09-20', activity: 'Pembayaran Internet', amount: 'Rp 300.000' },
  { id: 4, date: '2023-09-15', activity: 'Pembayaran Air', amount: 'Rp 150.000' },
  { id: 5, date: '2023-09-10', activity: 'Pembayaran Sewa Bulanan', amount: 'Rp 1.500.000' },
  { id: 6, date: '2023-09-05', activity: 'Pembelian Token Listrik', amount: 'Rp 200.000' },
  { id: 7, date: '2023-08-30', activity: 'Pembayaran Internet', amount: 'Rp 300.000' },
  { id: 8, date: '2023-08-25', activity: 'Pembayaran Air', amount: 'Rp 150.000' },
  { id: 9, date: '2023-08-20', activity: 'Pembayaran Sewa Bulanan', amount: 'Rp 1.500.000' },
  { id: 10, date: '2023-08-15', activity: 'Pembelian Token Listrik', amount: 'Rp 200.000' },
];

const HistoryContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '414px',
        // Sesuaikan tinggi container sehingga tidak mencakup area header/greeting di atas
        height: 'calc(100vh - 200px)',
        overflow: 'hidden', // Ini membuat konten yang melebar ke luar area tidak terlihat
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto'
      }}
    >
      {/* Header History yang tetap terlihat (sticky) */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          padding: '8px',
          textAlign: 'center',
          // backgroundColor: 'white', // Pastikan header memiliki background agar tidak transparan
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        Riwayat Transaksi
      </Typography>

      {/* Container untuk daftar riwayat */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px',
          /* Styling untuk WebKit (Chrome, Safari, Edge) */
          '&::-webkit-scrollbar': {
            width: '8px', // Lebar scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent', // Latar belakang transparan
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888', // Warna thumb scrollbar
            borderRadius: '6px', // Ujung rounded
            border: '2px solid transparent', // Padding visual
            backgroundClip: 'content-box', // Memastikan warna hanya di bagian thumb
            '&:hover': {
              background: '#555', // Warna thumb saat dihover
            },
          },
          /* Styling untuk Firefox */
          scrollbarWidth: 'thin', // Lebar scrollbar tipis
          scrollbarColor: '#888 transparent', // Warna thumb dan track
        }}
      >
        <List>
          {historyData.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemText
                  primary={item.activity}
                  secondary={`${item.date} - ${item.amount}`}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default HistoryContent;
