require("dotenv").config();
const { PORT, DB_URL } = process.env;
// connect to database
require("./db").connectToMongo();
//======================config app
const http = require("http");
const express = require("express");
const { authRoutes } = require("./handler/auth.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const http = require("http");
// const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
// router
app.use("/auth", authRoutes);

//not found
app.use((req, res, next) => {
  return res.json({ error: "Not Found!" });
});

// error
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});
