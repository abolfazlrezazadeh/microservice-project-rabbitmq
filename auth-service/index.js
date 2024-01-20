require("dotenv").config();
const { PORT ,DB_URL} = process.env;
// connect to database
require("./db").connectToMongo()
//======================config app
const http = require("http");
const express = require("express");
const { productRoute } = require("./handler/auth.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use("/", (req,res,next)=>{return res.send("hello")});
app.use("/auth", productRoute);

//not found
app.use((req, res, next) => {
  return res.json({ error: "Not Found!" });
});

// error
app.use((error, req, res, next) => {
  return res.json({ error: error.message });
});

// const http = require("http");
// const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
