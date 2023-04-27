const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/", (req, res) => {
  res.send("Welcome to the NFT Auth Dashboard API");
});

// get a todo

// update a todo

// delete a todo

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
