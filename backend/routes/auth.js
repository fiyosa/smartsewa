const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/db');  // Pastikan ini mengacu ke file yang menginisialisasi Sequelize dan model User

// Endpoint Registrasi
router.post('/register', async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Data registrasi:", req.body);
  const { username, email, password } = req.body;
  if (!password) {
    console.error("Password tidak ditemukan atau kosong.");
    return res.status(400).json({ error: "Password wajib diisi" });
  }
  try {
    const role = 'user';
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({ username, email, password: hashedPassword, role });
    res.json({ message: 'User berhasil didaftarkan', user: newUser });
  } catch (err) {
    console.error('Error saat registrasi:', err);
    res.status(500).json({ error: 'Registrasi gagal', details: err.message });
  }
});


// Endpoint Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Data login:", req.body);
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Kredensial tidak valid' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Kredensial tidak valid' });
    }
    // Simpan data user ke session
    req.session.user = { id: user.id, username: user.username, email: user.email, role: user.role };
    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error saat login:', err);
    res.status(500).json({ error: 'Login gagal', details: err.message });
  }
});

// Endpoint Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout gagal' });
    }
    res.json({ message: 'Logout berhasil' });
  });
});

module.exports = router;
