const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/db');  
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {Op} = require('sequelize');
const multer = require('multer'); 
const path = require('path');

require('dotenv').config();


// Konfigurasi multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Pastikan folder uploads ada!
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Menyimpan nama unik dengan ekstensi asli
  }
});

const upload = multer({ storage }); // Inisialisasi upload di sin


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
    const newUser = await db.User.create({ username,
      email,
      password: hashedPassword,
      role,
      no_room: null,                             
      });
    res.json({ message: 'User berhasil didaftarkan', user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      no_room: newUser.no_room,
      createdAt: newUser.createdAt,} });
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
    res.json({ 
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      no_room: user.no_room,
      createdAt: user.createdAt,});
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

// ✅ FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Email tidak ditemukan' });

    const token = crypto.randomBytes(20).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 jam

    await user.update({ reset_token: token, reset_token_expiry: expiry });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Smart Sewa" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Reset Password',
      html: `
        <p>Hi ${user.username},</p>
        <p>Klik link berikut untuk mereset password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p><i>Link ini akan kadaluarsa dalam 1 jam.</i></p>
      `
    });

    res.json({ message: 'Link reset password dikirim ke email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal proses reset password' });
  }
});

// ✅ RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        reset_token: token,
        reset_token_expiry: { [Op.gt]: new Date() }
      }
    });

    if (!user) return res.status(400).json({ error: 'Token tidak valid atau sudah kedaluwarsa' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      password: hashedPassword,
      reset_token: null,
      reset_token_expiry: null
    });

    res.json({ message: 'Password berhasil direset' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Gagal reset password' });
  }
});




router.post('/lapor-pembayaran', upload.single('buktiBayar'), async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { userId, jenisPembayaran, jumlah, periodePembayaran } = req.body;
  const tanggalPembayaran = new Date();

  try {
    const laporanBaru = await db.LaporanPembayaran.create({
      userId,
      jenisPembayaran,
      jumlah,
      periodePembayaran,
      tanggalPembayaran,
      buktiBayarUrl: req.file.path, // Ensure the file is uploaded correctly
    });

    res.json({ message: 'Lapor pembayaran berhasil!', data: laporanBaru });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Gagal melaporkan pembayaran' });
  }
});

module.exports = router;
