const express = require("express");
const cors = require("cors");
const app = express();
const todosController = require("./controllers/todosController");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todosController);

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
