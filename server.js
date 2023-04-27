const express = require("express");
const cors = require("cors");
const app = express();

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
