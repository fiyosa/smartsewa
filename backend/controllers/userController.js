const db = require('../models');
const { Op } = require('sequelize');

const saveHistory = async (activity, userId = null, laporanId = null) => {
  try {
    await db.History.create({ activity, userId, laporanId });
  } catch (err) {
    console.error("Gagal simpan history:", err);
  }
};

exports.getAllUsers = async (req, res) => {
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
};

exports.getUserById = async (req, res) => {
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
};

exports.updateUserRoom = async (req, res) => {
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
};

exports.getUsersWithRoom = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { no_room: { [Op.ne]: null } },
      attributes: ['id', 'username', 'no_room'],
      order: [['no_room', 'ASC']]
    });

    res.json(users);
  } catch (err) {
    console.error("Gagal ambil users with room:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    console.log('Session:', req.session.user);  // 🔍 Debug session
    console.log('Body:', req.body);             // 🔍 Debug body dari frontend

    if (!req.session.user) {
      return res.status(401).json({ error: 'Tidak ada sesi pengguna' });
    }

    const { username, email } = req.body;
    const userId = req.session.user.id;

    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Cek jika email sudah digunakan oleh user lain
    const emailExists = await db.User.findOne({
      where: {
        email,
        id: { [db.Sequelize.Op.ne]: userId } // selain user sendiri
      }
    });

    if (emailExists) {
      return res.status(409).json({ error: 'Email sudah digunakan oleh pengguna lain.' });
    }

    // Simpan perubahan
    user.username = username;
    user.email = email;
    await user.save();

    // Update juga session user
    req.session.user.username = username;
    req.session.user.email = email;

    // Kirim data baru ke frontend, termasuk createdAt agar tidak hilang
    res.json({
      message: 'Profil berhasil diperbarui',
      user: {
        ...req.session.user,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Gagal memperbarui profil', details: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    await user.destroy();
    await saveHistory(`User ${user.username} telah dihapus`, user.id, null);

    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    console.error('Gagal hapus user:', err);
    res.status(500).json({ error: 'Gagal menghapus user' });
  }
};
