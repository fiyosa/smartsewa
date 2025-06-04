// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.id);
//     if (!user) return res.status(401).json({ message: 'User tidak valid' });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Auth error:', err);
//     res.status(401).json({ message: 'Token tidak valid' });
//   }
// };
