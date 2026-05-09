const pool = require('../config/db');

const Task = {
  // Projeye yeni görev ekle
  create: async (projectId, title, description) => {
    const [result] = await pool.execute(
      'INSERT INTO Tasks (project_id, title, description) VALUES (?, ?, ?)',
      [projectId, title, description]
    );
    return result;
  },

  // Projeye ait tüm görevleri getir (atanan kişi adıyla birlikte)
  findByProject: async (projectId) => {
    const [rows] = await pool.execute(
      `SELECT 
        t.id, t.title, t.description, t.status, t.assigned_to, t.created_at,
        u.username AS assigned_username
       FROM Tasks t
       LEFT JOIN Users u ON t.assigned_to = u.id
       WHERE t.project_id = ?
       ORDER BY t.created_at DESC`,
      [projectId]
    );
    return rows;
  },

  // Tek görevi ID ile getir
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Tasks WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Görev durumunu güncelle (Kanban statü değişimi)
  updateStatus: async (id, status) => {
    const [result] = await pool.execute(
      'UPDATE Tasks SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  },

  // Görevi kullanıcıya ata
  updateAssignee: async (id, userId) => {
    const [result] = await pool.execute(
      'UPDATE Tasks SET assigned_to = ? WHERE id = ?',
      [userId, id]
    );
    return result;
  },

  // Görev başlığı ve açıklamasını güncelle
  update: async (id, title, description) => {
    const [result] = await pool.execute(
      'UPDATE Tasks SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );
    return result;
  },

  // Görevi sil
  delete: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM Tasks WHERE id = ?',
      [id]
    );
    return result;
  },
};

module.exports = Task;
