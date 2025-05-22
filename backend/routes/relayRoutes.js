const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/relay-status', async (req, res) => {
  const kamarQuery = req.query.kamars;
  if (!kamarQuery) return res.status(400).json({ message: 'Parameter kamars wajib diisi (contoh: ?kamars=1,2,3)' });

  const kamarList = kamarQuery.split(',');

  try {
    const users = await db.User.findAll({
      where: {
        no_room: kamarList
      }
    });

    const now = new Date();
    const results = users.map(user => {
      const activeUntil = user.active_until;
      const isActive = activeUntil && new Date(activeUntil) > now;

      return {
        kamar: user.no_room,
        active_until: activeUntil,
        is_active: isActive
      };
    });

    res.json(results);
  } catch (err) {
    console.error('Gagal ambil relay status batch:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 