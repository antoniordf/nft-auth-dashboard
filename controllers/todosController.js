const { DAPP_CONTRACT_ADDRESS } = process.env;
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const { userHasAnyNFT } = require("../web3Helper");

// Middleware to check if the user has any NFT from the specified collection
const nftCheckMiddleware = async (req, res, next) => {
  const userAddress = req.header("userAddress");
  if (!userAddress) {
    return res.status(400).json({ error: "User address not provided" });
  }

  const hasNFT = await userHasAnyNFT(userAddress, DAPP_CONTRACT_ADDRESS);

  if (hasNFT) {
    next();
  } else {
    res.status(403).json({
      error:
        "Access denied. User does not have any NFT from the specified collection.",
    });
  }
};

// Apply the middleware to all routes in the todosController
router.use(nftCheckMiddleware);

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
