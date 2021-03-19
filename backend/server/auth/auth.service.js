// "use strict";;

const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config/environment");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const compose = require("composable-middleware");
const User = require("../api/v1/user/user.model");
const validateJwt = expressJwt({ secret: config.secrets.session });
let tokensBlackList = [];

/**
 * Returns a jwt token signed by the app secret
 */
const signToken = id => {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresIn: '5h'
  });
};

/**
 * Attaches the user object to the request if authenticated
 */
const isAuthenticated = () => {
  return (
    compose()
      // Validate jwt
      .use((req, res, next) => {

        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty("access_token")
          && (tokensBlackList.length == 0 || tokensBlackList.length > 0 && CONSTANTS.FILTER_LIST(tokensBlackList, "access_token", req.query.access_token).length == 0) &&
          jwt.verify(req.query.access_token, CONSTANTS.SECRET_KEY) != undefined
        ) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }
        validateJwt(req, res, next);
      })

      // Attach user to request
      .use((req, res, next) => {
        User.findById(req.user._id, (err, user) => {
          if (err) return next(err);
          if (!user) return res.sendStatus(401);
          req.user = user;
          next();
        });
      })
  );
};

/**
 * Checks if the user role meets the minimum requirements of the route
 */
const hasRole = roleRequired => {
  if (!roleRequired) throw new Error("Required role needs to be set");

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (
        config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)
      ) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
};

/**
 * Set token cookie directly for oAuth strategies
 */

const setTokenCookie = (req, res) => {
  if (!req.user)
    return res.json(404, {
      message: "Something went wrong, please try again."
    });

  const token = signToken(req.user._id, req.user.role);
  res.cookie("access_token", JSON.stringify(token));
  res.redirect("/");
};

const SET_BLACK_LIST = (blackList) => {
  tokensBlackList = blackList;
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.SET_BLACK_LIST = SET_BLACK_LIST;