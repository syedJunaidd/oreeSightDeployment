// "use strict";;
const User = require("./user.model");
const config = require("../../../config/environment");
const SentEmail = require("../sentEmails/sentEmails.controller");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var path = require("path");
var fs = require("fs");
const Stripe = require("../stripe/controller");

console.log("Directory", __dirname);
const validationError = (res, err) => {
  return res.status(422).json({
    status: 422,
    message: err.message,
  });
};

const handleError = (res, err) => {
  const response = {
    status: 500,
    message: err.message,
  };
  return res.status(500).send(response);
};

const handle404 = (res, err) => {
  const response = {
    status: 404,
    message: "Sorry! Not found.",
  };

  return res.status(404).send(response);
};

/**
 * user sign-up
 */
exports.create = (req, res) => {
  const newUser = new User(req.body);
  console.log("hit signup");
  User.findOne({
    $or: [
      { email: req.body.name.toLowerCase() },
      { name: req.body.name.toLowerCase() },
    ],
    isDeleted: false,
  }).then((user) => {
    console.log("User", user);
    if (user === null) {
      // if (newUser.role == "user") {
      //   newUser.role = "dealer";
      // }
      // else {
      //   console.log("New User Role", newUser.role);
      // }
      newUser.save((err, user) => {
        if (err) return validationError(res, err);
        const token = jwt.sign({ _id: user._id }, config.secrets.session, {
          expiresIn: 5 * 60 * 60
        });
        const emails = [req.body.email];
        const filepath = path.join(
          __dirname,
          "../../../../static/Emailtemplate/email.html"
        );
        fs.readFile(filepath, function (error, html) {
          if (error) {
            throw error;
          }
          SentEmail.sendEmail(emails, html, "HTML", "Sign Up");
        });
        res.json({
          access_token: token,
          expires_in: 5 * 60 * 60
        });
      });
    } else {
      res.status(422).json({ message: "1" });
    }
  });
};

/**
 * admin register user
 */
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.profileImage = "";
    let customer = await Stripe.createCustomer(req.body.email);
    if (!customer) throw new Error('Customer creation error')
    newUser.customer_id = customer.id;
    newUser.save((err, user) => {
      if (err) return validationError(res, err);
      const token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresIn: 5 * 60 * 60
      });
      res.status(200).json({
        customer: customer,
        access_token: token,
        expires_in: 5 * 60 * 60
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message
    })
  }
};

/**
 * Get list of users
 * restriction: 'manager', 'admin'
 */
exports.index = (req, res) => {
  User.find({ isDeleted: false }, "-salt -hashedPassword", (err, users) => {
    if (err) return handleError(req, res);

    const response = {
      metadata: {
        resultset: {
          count: users.length,
          offset: 0,
          limit: 100,
        },
      },
      data: users,
    };
    res.status(200).json(response);
  });
};

/**
 * Get a single user
 * restriction: 'manager', 'admin'
 */
exports.show = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, "-salt -hashedPassword", (err, user) => {
    if (err) return next(err);
    if (!user) handle404();
    res.status(200).json(user);
  });
};
/**
 * Get a  user Menue
 */

exports.getMenue = (req, res, next) => {
  // const userId = req.user._id;
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) return next(err);
    if (!user) handle404();
    res.status(200).json(user.userMenue);
  });
};

/**
 * Get user by Id
 */

exports.byId = (request, response) => {
  const productId = request.params.id;

  User.findOne({ _id: productId }, (error, data) => {
    if (error || !data._id) {
      return handle404(response, error);
    }
    return response.status(200).json(data);
  });
};
/*
 * update a single user
 * restriction: 'manager', 'admin'
 */
exports.updateUser = (req, res) => {
  let userTempObj = req.body;
  userTempObj.profileImage = req.file.filename;
  console.log(userTempObj);
  const userId = req.body._id;
  if (req.body._id) {
    delete req.body._id;
  }

  if (req.body.password == "" || req.body.password == null) {
    console.log("Delete Password", req.body.password);
    delete req.body.password;
  } else {
    console.log("Save Password", req.body.password);
  }
  // if (req.user.role != "admin" && req.body.role && req.body.role == "admin") return res.sendStatus(403);

  User.findById(userId, (err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    const updated = _.merge(user, userTempObj);
    updated.save((err) => {
      if (err) return validationError(res, err);

      return res.status(200).json(user);
    });
  });
};

/**
 * Change a single user's password
 * restriction: 'manager', 'admin'
 */
exports.changePassword = (req, res, next) => {
  const userId = req.params.id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;

      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  });
};

/**
 * Deletes a user
 * restriction: 'manager', 'admin'
 */
exports.destroy = (request, response) => {
  User.findOne({
    _id: request.params.id,
  }).then((user) => {
    user.isDeleted = true;
    user.save((err) => {
      if (err) console.log("Error", err);
      const back = {
        status: 200,
        message: "Deleted Successfully",
      };
      return response.status(200).json(back);
    });
  });

  // User.findOne({ _id: req.params.id }, (err, user) => {
  //   if (err) return handleError(req, res);
  //   if (!user) return res.sendStatus(404);
  //   console.log("Delete User");
  //   // if (req.user.role != "admin" && user.role == "admin") return res.sendStatus(403);
  //   user.isDeleted = true;
  //   user.save(() => {
  //     return res.sendStatus(204);
  //   });
  // });
};

/**
 * Get my info
 */
exports.me = (req, res, next) => {
  const userId = req.user._id;
  User.findOne(
    {
      _id: userId,
    },
    "-salt -hashedPassword",
    (err, user) => {
      // don't ever give out the password or salt
      if (err) return next(err);
      if (!user) return handle404();

      res.status(200).json(user);
    }
  );
};

/*
 * update a user
 */
exports.updateMyProfile = (req, res, next) => {
  const userId = req.user._id;
  User.updateOne(
    { _id: userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      job: req.body.job,
      phone: req.body.phone
    }
  ).then((Obj) => {
    res.status(200).json(Obj);
  });
};

exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  });
};

/**
 * Change a user's password
 */
exports.changeMyPassword = (req, res, next) => {
  const userId = req.user._id;
  const oldPass = String(req.body.currentPassword);
  const newPass = String(req.body.newPassword);
  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);

  User.findOne({ email: email }, (err, user) => {
    // if (user.authenticate(password)) {
    if (false) {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    } else {
      user.password = password;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    }
  });
};

exports.updateUserMenue = (req, res, next) => {
  const userId = req.user._id;
  const list = req.body;
  User.findById(userId, (err, user) => {
    user.userMenue = list;
    user.save((err) => {
      if (err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

/**
 * Authentication callback
 */
exports.authCallback = (req, res, next) => {
  res.redirect("/");
};
/** Send Email */

exports.sendEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email});
      if (user === null) {
        res.status(202).json({message:"email not in db"});
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        const emailText =
            `Your password reset token is: ${token}`;

        await User.updateOne(
            {email: req.body.email},
            {
              resetPasswordToken: token,
              resetPasswordExpires: Date.now() + 3600000,
            });
          const emails = [req.body.email];
          await SentEmail.sendEmail(
              emails,
              emailText,
              "Text",
              "Link To Reset Password"
          );
          res.status(200).json("recovery email sent");
      }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/**Match Token */
exports.reset = (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() },
  }).then((user) => {
    if (user == null) {
      res.status(202).send("password reset link is invalid or has expired");
    } else {
      res.status(200).send({
        email: user.email,
        message: "password reset link a-ok",
      });
    }
  });
};

exports.getPrefrences = (request, response) => {
  const email = request.params.email;
  User.findOne({
    email: email,
  }).then((user) => {
    if (user == null) {
      response.status(403).send("User Not found");
    } else {
      response.status(200).send({
        prefrences: user.prefrences,
      });
    }
  });
};

exports.updatePrefrences = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const Obj = req.body;
  User.findById(userId, (err, user) => {
    user.prefrences = Obj;
    user.save((err) => {
      if (err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

exports.UserLimitedInfoById = (request, response) => {
  const userId = request.params.id;

  User.findOne(
    { _id: userId },
    { email: 1, name: 1, role: 1 },
    (error, data) => {
      if (error || !data._id) {
        return handle404(response, error);
      }
      return response.status(200).json(data);
    }
  );
};

exports.UserLimitedInfo = (request, response) => {
  // User.find({}, { email: 1, name: 1, role: 1 }, (error, data) => {
  //   if (error) {
  //     return handle404(response, error);
  //   }
  //   return response.status(200).json(data);
  // });

  User.aggregate(
    [
      {
        $match: {
          isDeleted: false,
        },
      },
      { $project: { email: 1, name: 1, role: 1 } },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "name",
          as: "roles",
        },
      },
    ],
    (error, data) => {
      if (error) {
        //return handle404(response, error);
      }
      return response.status(200).json(data);
    }
  );
};

exports.GetUserRole = (request, response) => {
  const userId = request.user._id;
  User.findOne(
    { _id: userId },
    { email: 1, name: 1, role: 1 },
    (error, data) => {
      if (error || !data._id) {
        return handle404(response, error);
      }
      return response.status(200).json(data);
    }
  );
};
