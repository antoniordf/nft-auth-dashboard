const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.post("/", async (req, res) => {
  const { description } = req.body;
  const newTodo = await Todo.create(description);
  res.json(newTodo);
});

router.get("/", async (req, res) => {
  const allTodos = await Todo.findAll();
  res.json(allTodos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await Todo.update(id, description);
  res.json(`Todo id ${id} has been updated`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.delete(id);
  res.json(`Todo id ${id} has been deleted.`);
});

module.exports = router;
