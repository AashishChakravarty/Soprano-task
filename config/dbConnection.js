var dbUrl = {
  development: {
    url:
      "mongodb://localhost:27017/soprano"
  },
  testing: {
    url:
      "mongodb://localhost:27017/soprano"
  },
  production: {
    url:
      "mongodb://localhost:27017/soprano"
  }
};

const mongoose = require("mongoose");

//GLOBAL MONGOOSE PROMISE
mongoose.Promise = global.Promise;

//OPTIONS SET FOR CONNECTION
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: process.env.MONGOPOOLSIZE || 5, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

//MONGOOSE DATABASE CONNECTION
mongoose
  .connect(dbUrl[process.env.NODE_ENV || "development"].url, options)
  .then(() => {
    console.log("MongoDB connection is Connected");
  })
  .catch(err => {
    console.log("MongoDB connection is Down.Error is...", err);
    process.exit();
  });

module.exports = mongoose;
