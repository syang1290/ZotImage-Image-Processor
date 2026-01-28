const db = require('../config/db');

const ImageModel = {
  create: async (userId, filename, originalName, transformations) => {
    const query = `
      INSERT INTO images (user_id, filename, original_name, transformations)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [userId, filename, originalName, transformations];
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