const express = require('express');
const bodyParser = require('body-parser'); // atau bisa gunakan express.json()
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const db = require('./models/db'); // Pastikan file db.js menginisialisasi Sequelize dan memuat model User
const app = express();

app.use(cors({ origin: ['http://localhost:3000',"http://localhost:5173"], credentials: true }));

// Gunakan middleware untuk parsing JSON
// app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: 'your_secret_key', // Ganti dengan secret yang aman
  resave: false,
  saveUninitialized: true,
}));

// Gunakan route untuk endpoint API
app.use('/api', authRoutes);

// Sinkronisasi database (tabel akan dibuat jika belum ada)
db.sequelize.sync()
  .then(() => console.log("Database berhasil disinkronisasi."))
  .catch(err => console.error("Gagal sinkronisasi database: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
