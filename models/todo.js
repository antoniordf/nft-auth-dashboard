const pool = require("./db");

const Todo = {
  async create(description) {
    const result = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT * FROM todos");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async update(id, description) {
    await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
  },

  async delete(id) {
    await pool.query("DELETE FROM todos WHERE todo_id = $1", [id]);
  },
};

module.exports = Todo;
