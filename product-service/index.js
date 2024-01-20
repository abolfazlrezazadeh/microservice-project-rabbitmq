require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const { productRouter } = require("./handler/product.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use("/product", productRouter);

//not found
app.use((req, res, next) => {
  return res.json({ error: "Not Found!" });
});

// error
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});
