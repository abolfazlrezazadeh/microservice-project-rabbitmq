require("dotenv").config();
const express = require("express");
const { productRoute } = require("./handler/auth.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use("/auth", productRoute);

//not found
app.use((req, res, next) => {
  return res.json({ error: "Not Found!" });
});

// error
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});

