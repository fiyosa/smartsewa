    const bcrypt = require('bcrypt');
    const { User } = require('./models'); // Pastikan path models kamu sesuai

    async function createAdmin() {
    try {
        const email = 'smartsewa.app@gmail.com';
        const username = 'Admin SmartSewa';
        const plainPassword = '123qee00';
        const role = 'admin';

        // Cek apakah admin sudah ada
        const existingAdmin = await User.findOne({ where: { email } });
        if (existingAdmin) {
        console.log('Admin sudah ada!');
        return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(plainPassword, 12);

        // Buat admin baru
        await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        });

        console.log('Admin berhasil dibuat!');
    } catch (error) {
        console.error('Gagal membuat admin:', error);
    }
    }

    createAdmin();
