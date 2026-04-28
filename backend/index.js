const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');

// Rotaların içe aktarılması
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Rotaları
app.use('/api/auth', authRoutes);

// Test veritabanı bağlantısı
pool.getConnection()
  .then((connection) => {
    console.log('MySQL veritabanına başarıyla bağlanıldı.');
    connection.release();
  })
  .catch((err) => {
    console.error('MySQL bağlantı hatası:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});