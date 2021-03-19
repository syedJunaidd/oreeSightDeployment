// "use strict";;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/environment");
const cors = require('cors');
require('dotenv').config()
const path = require('path');
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
// Setup server
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
const server = require("http").createServer(app);

require("./config/express")(app);
require("./routes")(app);

const getApiAndEmit = socket => {

  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  console.log("Receive", response);

  socket.emit("FromAPI", response);
};


// Start server
server.listen(config.port, config.ip, () => {

  console.log(
    "Express server listening on %d, in %s mode",
    config.port,
    app.get("env")
  );
});

process.on('uncaughtException', function (error, req, res) {
  console.log(error.stack);
  process.exit(1);
})

// Expose app
exports = module.exports = app;
