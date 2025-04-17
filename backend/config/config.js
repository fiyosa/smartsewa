    require('dotenv').config(); // Memuat variabel lingkungan dari .env

    const config = {
    db: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/smartsewa', // URL database
    },
    server: {
        port: process.env.PORT || 5000, // Port server
    },
    email: {
        user: process.env.EMAIL_USER, // Email pengguna untuk pengiriman email (misal reset password)
        pass: process.env.EMAIL_PASS, // Password email pengguna
    },
    };

    module.exports = config;
