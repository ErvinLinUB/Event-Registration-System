const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/apiRoutes"); // your routes file

const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Routes
app.use("/api", apiRoutes); // All API routes under /api

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

