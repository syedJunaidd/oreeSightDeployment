// "use strict";;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
// const Blogzone = require("../blog/blog.model");
const { strict } = require("assert");

const UserSchema = new Schema({
  name: { type: String, lowercase: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firstName: String,
  lastName: String,
  email: { type: String, lowercase: true },
  company: String,
  job: String,
  number_of_employees: String,
  gender: Boolean,
  // address: String,
  // website: String,
  phone: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  // role: {
  //   type: String,
  //   default: "user",
  // },
  hashedPassword: String,
  salt: String,
  customer_id: String,
  profileImage: String,
  // userMenue: [
  //   {
  //     name: String,
  //     url: String,
  //     templateId: String,
  //   },
  // ],
  // prefrences: {
  //   newletter: { type: Boolean, default: true },
  //   productUpodates: { type: Boolean, default: true },
  //   notifications: { type: Boolean, default: true },
  //   anouncements: { type: Boolean, default: true },
  // },
  isDeleted: { type: Boolean, default: false },
});

/**
 * Virtuals
 */
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Public profile information
UserSchema.virtual("profile").get(function () {
  return {
    name: this.name,
    email: this.email,
    role: this.role,
  };
});

// Non-sensitive information
UserSchema.virtual("token").get(function () {
  return {
    _id: this._id,
    role: this.role,
  };
});

/**
 * Validations
 */

// Validate empty email
UserSchema.path("email").validate(function (email) {
  return email.length;
}, "Email cannot be blank");

// Validate empty password
UserSchema.path("hashedPassword").validate(function (hashedPassword) {
  return hashedPassword.length;
}, "Password cannot be blank");

// Validate email is not taken
// UserSchema.path("email").validate(function (value) {
//   var self = this;
//   this.constructor.findOne({ email: value }, function (err, user) {
//     if (err) throw err;
//     if (user) {
//       if (self.id === user.id) return true;
//       return false;
//     }
//     return true;
//   });
// }, "The specified email address is already taken.");
// Validate UserName is not taken
// UserSchema.path("name").validate(function (value) {
//   var self = this;
//   this.constructor.findOne({ name: value }, function (err, user) {
//     if (err) throw err;
//     if (user) {
//       if (self.id === user.id) return true;
//       return false;
//     }
//     return true;
//   });
// }, "The specified username is already taken.");

var isPasswordValid = function (value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  // if(this.role==='subscriber') next();
  if (!isPasswordValid(this.hashedPassword))
    next(new Error("Invalid password"));
  else next();
});

/**
 * Post-remove hook
 */
// UserSchema.post("remove", function (doc) {
//   Blogzone.remove({ userId: doc._id }).exec();
// });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   * @param {String} plainText / @return {Boolean}
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   * @return {String} / @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString("base64");
  },

  /**
   * Encrypt password
   * @param {String} password / @return {String}
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return "";

    var salt = Buffer.alloc(this.salt.length, this.salt, "base64");
    return crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("base64");
  },
};

module.exports = mongoose.model("User", UserSchema);
