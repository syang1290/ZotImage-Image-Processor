const db = require('../config/db');

const UserModel = {
  create: async (username, hashedPassword) => {
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username;
    `;
    const { rows } = await db.query(query, [username, hashedPassword]);
    return rows[0];
  },

  findByUsername: async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await db.query(query, [username]);
    return rows[0];
  }
};

module.exports = UserModel;