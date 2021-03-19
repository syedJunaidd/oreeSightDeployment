/**
 * Main application routes
 */

// // "use strict";;

const errors = require("./components/errors");
const path = require('path')
const fs = require('fs')
module.exports = app => {
  // Insert routes
  app.use("/api/v1/authenticate", require("./auth"));
  app.use("/api/v1/users", require("./api/v1/user"));
  app.use("/api/v1/blacklisttoken", require("./api/v1/blackListTokens"));
  app.use("/api/v1/projects", require("./api/v1/project"));
  // app.use("/api/v1/stripe", require("./api/v1/paymentGatWay"));
  app.use("/api/v1/stripe", require("./api/v1/stripe"));
  app.use("/static/uploads/:file", (request, response) => {
    response.sendFile(path.join(__dirname, "../static/uploads/" + request.params.file))
  })
  app.use("/server/static/uploads/:file", (request, response) => {
    response.sendFile(path.join(__dirname, "../server/static/uploads/" + request.params.file))
  })
  // All undefined asset or api routes should return a 404
  app
    .route("/:url(api|auth|components|app|bower_components|assets)/*")
    .get(errors[404]);

  // All other routes should redirect to the index.html
  /* app.route("/*").get((req, res) => {
    res.sendfile(app.get("appPath") + "/index.html");
  }); */
};
