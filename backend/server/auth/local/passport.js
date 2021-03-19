const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.setup = (User, config) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password" // this is the virtual field on the model
      },

      (email, password, done) => {
        User.findOne(
          {
            $or: [{ email: email.toLowerCase() }, { name: email.toLowerCase() }]
          },
          (err, user) => {
            if (err) return done(err);

            if (!user) {
              return done(null, false, {
                message: "This email is not registered."
              });
            }
            if (!user.authenticate(password)) {
              return done(null, false, {
                message: "This password is not correct."
              });
            }
            return done(null, user);
            // Role.findOne(
            //   {
            //     name: user.role
            //   },
            //   (err, role) => {
            //     if (err) return done(err);
            //
            //     if (!role) {
            //       return done(null, false, {
            //         message: "This role does not exist."
            //       });
            //     }
            //     user.permissions = role.permissions;
            //     return done(null, user);
            //   }
            // );
          }
        );
      }
    )
  );
};
