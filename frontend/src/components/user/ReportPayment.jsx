import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Box, Button, TextField, MenuItem, Typography,
  IconButton, InputLabel, Select, FormControl,
  FormControlLabel, Checkbox, FormHelperText,
  Snackbar, Alert, Portal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const metodeList = ["BCA","Dana","OVO","Gopay","Mandiri"];
const monthOptions = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];
const RATE_PER_MONTH = 500_000;

const ReportPayment = ({ onClose }) => {
  const [userId, setUserId] = useState(null);
  const [jenisPembayaran, setJenisPembayaran] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [buktiBayar, setBuktiBayar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load userId from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored?.id) setUserId(stored.id);
  }, []);

  // Create preview URL
  useEffect(() => {
    if (!buktiBayar) { setPreviewUrl(''); return; }
    const url = URL.createObjectURL(buktiBayar);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [buktiBayar]);

  const jumlahNumeric = selectedMonths.length * RATE_PER_MONTH;
  const jumlahFormatted = jumlahNumeric.toLocaleString('id-ID');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!jenisPembayaran || !selectedMonths.length || !buktiBayar || !confirmChecked) {
      setSnackbar({ open: true, message: 'Lengkapi semua data & centang konfirmasi!', severity: 'error' });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('jenisPembayaran', jenisPembayaran);
      formData.append('jumlah', jumlahNumeric);
      formData.append('periodePembayaran', selectedMonths.join(', '));
      formData.append('buktiBayar', buktiBayar);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/lapor-pembayaran`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSnackbar({ open: true, message: 'Laporan terkirim!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Gagal upload laporan!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(s => ({ ...s, open: false }));
    if (snackbar.severity === 'success') onClose?.();
  };

  return (
    <>
      <Box sx={{
        maxWidth: 400,
        mx: 'auto', my: 4, p: 3,
        bgcolor: '#fff',
        borderRadius: '24px',
        boxShadow: 1,
        position: 'relative',
        zIndex: 10
      }}>
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
          color="error"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Form Laporan Pembayaran
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Metode Pembayaran</InputLabel>
            <Select
              required
              label="Metode Pembayaran"
              value={jenisPembayaran}
              onChange={e => setJenisPembayaran(e.target.value)}
              sx={{ borderRadius: 5 }}
            >
              {metodeList.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Periode Pembayaran</InputLabel>
            <Select
              multiple
              label="Periode Pembayaran"
              value={selectedMonths}
              onChange={e => setSelectedMonths(e.target.value)}
              renderValue={vals => vals.join(', ')}
              sx={{ borderRadius: 5 }}
            >
              {monthOptions.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </Select>
            <FormHelperText>Pilih satu atau beberapa bulan</FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Jumlah Bayar (Rp)"
            value={`Rp ${jumlahFormatted}`}
            InputProps={{ readOnly: true }}
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
          />

          <Box mt={2} textAlign="center">
            <input
              id="upload-bayar-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => setBuktiBayar(e.target.files[0])}
            />
            <label htmlFor="upload-bayar-input">
              <Button variant="outlined" component="span" sx={{ borderRadius: 3 }}>
                {buktiBayar ? 'Ganti Bukti Bayar' : 'Upload Bukti Bayar'}
              </Button>
            </label>
            {previewUrl && (
              <Box
                component="img"
                src={previewUrl}
                alt="Preview"
                sx={{
                  mt: 2,
                  width: '100%',
                  maxWidth: 200,
                  maxHeight: 200,
                  objectFit: 'contain',
                  borderRadius: 5,
                  boxShadow: 1,
                  mx: 'auto'
                }}
              />
            )}
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={confirmChecked}
                onChange={e => setConfirmChecked(e.target.checked)}
              />
            }
            label="Saya yakin data yang saya masukkan sudah benar"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            disabled={!jenisPembayaran || !selectedMonths.length || !buktiBayar || !confirmChecked || loading}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 5 }}
          >
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </Button>
        </form>
      </Box>

      {/* Portal Snackbar ke body agar tidak ter-clip */}
      {ReactDOM.createPortal(
        <Snackbar
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
            sx={{ width: '100%', borderRadius: 5 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>,
        document.body
      )}
    </>
  );
};

export default ReportPayment;
