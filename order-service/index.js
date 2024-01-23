require("dotenv").config();
const { createOrderwithQueue } = require("./config/rabbitmq");
// =========== connect to database
require("./config/db").connectToMongo();

createOrderwithQueue("ORDER")
