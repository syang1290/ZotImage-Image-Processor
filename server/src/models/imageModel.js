const db = require('../config/db');

const ImageModel = {
  create: async (userId, filename, originalName, transformations = {}) => {
    const query = `
      INSERT INTO images (user_id, filename, original_name, transformations, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [userId, filename, originalName, JSON.stringify(transformations)];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  findByUser: async (userId) => {
    const query = 'SELECT * FROM images WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows } = await db.query(query, [userId]);
    return rows;
  }
};

module.exports = ImageModel;