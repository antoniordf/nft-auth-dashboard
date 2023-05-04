const express = require("express");
const cors = require("cors");
const app = express();
const { spawn } = require("child_process");
const todosController = require("./controllers/todosController");

// Middleware
const corsOptions = {
  origin: "http://localhost:3000", // Only allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "UserAddress"], // Allowed headers
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/todos", todosController);

// Fetch python data analysis script
app.get("/api/data-analysis", (req, res) => {
  const pythonProcess = spawn("python3", ["./python_scripts/data_analysis.py"]);

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
