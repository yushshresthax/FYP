const mongoose = require("mongoose")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


//connection event handler
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

const connect = function () {
  // Establish Connection
  console.log(DATABASE_URL,'moongose url');
  return mongoose.connect(DATABASE_URL, CONFIG);

}

module.exports = connect;