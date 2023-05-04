const express = require("express");
const cors = require("cors");
const app = express();
const { spawn } = require("child_process");
const todosController = require("./controllers/todosController");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todosController);

// Fetch python data analysis script
app.get("/api/data-analysis", (req, res) => {
  const pythonProcess = spawn("python3", ["data_analysis.py"]);

  pythonProcess.stdout.on("data", (data) => {
    const jsonData = JSON.parse(data.toString());
    res.json(jsonData);
  });

  pythonProcess.stderr.on("data", (data) => {
    res.status(500).json({ error: data.toString() });
  });
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
