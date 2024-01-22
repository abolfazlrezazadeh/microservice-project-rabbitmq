require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const {orderRoutes} = require("./handler/order.routes");
const app = express();
// =========== connect to database
require("./config/db").connectToMongo();
// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use("/order", orderRoutes);

//not found
app.use((req, res, next) => {
  return res.json({ error: "Not Found!" });
});

// error
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`order service running on port ${PORT}`);
});
