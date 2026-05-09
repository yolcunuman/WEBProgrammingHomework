const pool = require('../config/db');

const Project = {
  // Yeni proje oluştur
  create: async (name, description, userId) => {
    const [result] = await pool.execute(
      'INSERT INTO Projects (name, description, created_by) VALUES (?, ?, ?)',
      [name, description, userId]
    );
    return result;
  },

  // Kullanıcının oluşturduğu tüm projeleri getir
  findAllByUser: async (userId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Projects WHERE created_by = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  // Tek projeyi ID ile getir
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Projects WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Projeyi sil (sadece sahibi silebilir)
  delete: async (id, userId) => {
    const [result] = await pool.execute(
      'DELETE FROM Projects WHERE id = ? AND created_by = ?',
      [id, userId]
    );
    return result;
  },
};

module.exports = Project;
