const db = require('../models');

exports.getAllHistory = async (req, res) => {
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
};

exports.getUserHistory = async (req, res) => {
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
};
