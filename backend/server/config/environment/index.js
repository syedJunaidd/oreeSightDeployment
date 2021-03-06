// "use strict";;

const path = require("path");
const _ = require("lodash");

const requiredProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

// All configurations will extend these options
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + "/../../.."),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: "zo-secrets"
  },

  // List of user roles
  userRoles: ["user", "manager", "admin"],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(
  all,
  require("./" + process.env.NODE_ENV + ".js") || {}
);
