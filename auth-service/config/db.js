const { PORT ,DB_URL} = process.env;
const {default:mongoose} = require("mongoose")
const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(DB_URL);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = {connectToMongo};