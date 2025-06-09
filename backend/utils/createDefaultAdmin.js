// utils/createDefaultAdmin.js
const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function createDefaultAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const username = 'admin';
  const passwordPlain = process.env.DEFAULT_ADMIN_PASSWORD;

  const existing = await User.findOne({ where: { role : 'admin' } });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Default admin created:', email);
  } else {
    console.log('ℹ️ Default admin already exists:', existing.email);
  }
}

module.exports = createDefaultAdmin;
