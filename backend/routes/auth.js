const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { Op, where } = require('sequelize');
const db = require('../models/db');

require('dotenv').config();


const saveHistory = async (activity, userId = null, laporanId = null) => {
  try {
    await db.History.create({ activity, userId, laporanId });
  } catch (err) {
    console.error("Gagal simpan history:", err);
  }
};



// ============================
// ✅ MULTER SETUP
// ============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ============================
// ✅ AUTH - REGISTER
// ============================
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password wajib diisi' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      username, email,
      password: hashedPassword,
      role: 'user',
      no_room: null
    });

    res.json({
      message: 'User berhasil didaftarkan',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        no_room: newUser.no_room,
        createdAt: newUser.createdAt
      }
    });
  } catch (err) {
    console.error('Registrasi error:', err);
    res.status(500).json({ error: 'Registrasi gagal', details: err.message });
  }
});

// ============================
// ✅ AUTH - LOGIN
// ============================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Kredensial tidak valid' });
    }

    req.session.user = {
      id: user.id, username: user.username, email: user.email, role: user.role
    };

    res.json({
      id: user.id, username: user.username,
      email: user.email, role: user.role,
      no_room: user.no_room, createdAt: user.createdAt
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login gagal', details: err.message });
  }
});

// ============================
// ✅ AUTH - LOGOUT
// ============================
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout gagal' });
    res.json({ message: 'Logout berhasil' });
  });
});

// ============================
// ✅ FORGOT PASSWORD
// ============================
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
        pass: process.env.EMAIL_PASS
      }
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
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Gagal proses reset password' });
  }
});

// ============================
// ✅ RESET PASSWORD
// ============================
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

// ============================
// ✅ LAPORAN PEMBAYARAN
// ============================

// Buat laporan baru
router.post('/lapor-pembayaran', upload.single('buktiBayar'), async (req, res) => {
  const { userId, jenisPembayaran, jumlah, periodePembayaran } = req.body;

  try {
    const laporan = await db.LaporanPembayaran.create({
      userId,
      jenisPembayaran,
      jumlah,
      periodePembayaran,
      tanggalPembayaran: new Date(),
      buktiBayarUrl: req.file.path,
      status: 'pending'
    });
    await saveHistory('Laporan pembayaran telah dikirim', userId, laporan.id);

    res.json({ message: 'Lapor pembayaran berhasil!', data: laporan });
  } catch (err) {
    console.error('Lapor error:', err);
    res.status(500).json({ error: 'Gagal melaporkan pembayaran' });
  }
});

// Ambil semua laporan
router.get('/laporan-pembayaran', async (req, res) => {
  try {
    const laporan = await db.LaporanPembayaran.findAll({
      include: { model: db.User, attributes: ['username', 'email', 'no_room'] },
      order: [['createdAt', 'DESC']]
      
    });

    res.json(laporan);
  } catch (err) {
    console.error('Gagal ambil laporan:', err);
    res.status(500).json({ error: 'Gagal mengambil laporan' });
  }
});

// Ambil satu laporan
router.get('/laporan-pembayaran/:id', async (req, res) => {
  try {
    const laporan = await db.LaporanPembayaran.findByPk(req.params.id, {
      include: { model: db.User, attributes: ['username', 'email', 'no_room'] }
    });

    if (!laporan) return res.status(404).json({ error: 'Laporan tidak ditemukan' });

    res.json(laporan);
  } catch (err) {
    console.error('Gagal ambil detail:', err);
    res.status(500).json({ error: 'Gagal ambil detail laporan' });
  }
});

router.post('/konfirmasi-laporan/:id', async (req, res) => {
  const { id } = req.params;
  const { status, komentar } = req.body;

  try {
    const laporan = await db.LaporanPembayaran.findByPk(id);
    if (!laporan) return res.status(404).json({ error: 'Laporan tidak ditemukan' });

    if (!['confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status tidak valid' });
    }

    laporan.status = status;
    await laporan.save();

    let activity = '';

    if (status === 'confirmed') {
      activity = 'Laporan pembayaran telah dikonfirmasi';
    } else if (status === 'rejected') {
      activity = `Laporan pembayaran telah ditolak${komentar ? `: ${komentar}` : ''}`;
    }

    await saveHistory(activity, laporan.userId, laporan.id);

    res.json({
      message: `Laporan berhasil di${status === 'confirmed' ? 'konfirmasi' : 'tolak'}`
    });
  } catch (err) {
    console.error('Gagal update laporan:', err);
    res.status(500).json({ error: 'Gagal update laporan' });
  }
});



// endpoint History
router.get('/history', async (req, res) => {
  try {
    const history = await db.History.findAll({
      include: [
        {
          model: db.User,
          attributes: ['username'],
        },
        {
          model: db.LaporanPembayaran,
          attributes: ['jumlah', 'periodePembayaran'],
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(history);
  } catch (err) {
    console.error('Gagal ambil history:', err);
    res.status(500).json({ error: 'Gagal mengambil history' });
  }
});

// endpoint history user tertentu
router.get('/history/user/:userId', async (req, res) => {
  try {
    const histories = await db.History.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: db.LaporanPembayaran,
          attributes: ['jumlah', 'periodePembayaran']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(histories);
  } catch (err) {
    console.error('Gagal ambil history user:', err);
    res.status(500).json({ error: 'Gagal mengambil history user' });
  }
});





// endpoint data user
// Get semua user
router.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { role: 'user' },
      attributes: ['id', 'username', 'email', 'no_room', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
});
// GET /api/user/:id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'role', 'no_room', 'createdAt'],
    });

    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    res.json(user);
  } catch (err) {
    console.error('Gagal ambil detail user:', err);
    res.status(500).json({ error: 'Gagal mengambil detail user' });
  }
});


// PUT /api/user/:id/room
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { no_room } = req.body;

  try {
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    if (no_room) {
      const existing = await db.User.findOne({
        where: { no_room, id: { [Op.ne]: id } },
      });
      if (existing) return res.status(400).json({ error: 'Nomor kamar sudah digunakan' });
    }

    user.no_room = no_room || null;
    await user.save();

    const roomText = no_room ? `diberi nomor kamar ${no_room}` : `dihapus nomor kamarnya`;
    await saveHistory(`${user.username} ${roomText}`, user.id, null);

    res.json({ message: 'No kamar berhasil diperbarui' });
  } catch (err) {
    console.error('Gagal update user:', err);
    res.status(500).json({ error: 'Gagal update nomor kamar' });
  }
});


module.exports = router;
