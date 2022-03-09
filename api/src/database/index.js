const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

; (async () => {
  await client.query(
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS categories (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contacts (
        id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE,
        phone VARCHAR,
        category_id UUID,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    );`
  );
})();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
