const sql = require('sql-tagged-template-literal');

const db = require('../../database');

class CategoriesRepository {
  async findAll() {
    const rows = await db.query(sql`
        SELECT * FROM categories ORDER BY name ASC
    `);

    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(sql`
        INSERT INTO categories(name)
        VALUES($1)
        RETURNING *
    `, [name]);

    return row;
  }
}

module.exports = new CategoriesRepository();
