const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to API" }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/accounts", require("./routes/accounts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`\x1b[33m%s\x1b[0m`,`Server started at`, `http://localhost:${PORT}`)
);
