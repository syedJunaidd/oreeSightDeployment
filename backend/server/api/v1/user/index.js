// "use strict";;

const express = require("express");
const controller = require("./user.controller");
const auth = require("../../../auth/auth.service");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve(__dirname, "../../../static/profileImages"));
    cb(null, path.resolve(__dirname, "../../../static/profileImages"));
  },
  filename: function (req, file, cb) {
    var typ = file.mimetype.split("/");
    var imgType = typ[1];
    cb(null, file.originalname + "-" + Date.now() + '.' + imgType);
    // cb(null, file.fieldname + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

/*
 * new user sign-up
 */
router.post("/", controller.create);

/*
 * user authenticated area
 */
// get own profile information
router.get("/profile", auth.isAuthenticated(), controller.me);

// update profile
router.put(
  "/updateProfile",
  auth.isAuthenticated(),
  controller.updateMyProfile
);
router.put(
  "/updatePassword",
  auth.isAuthenticated(),
  controller.changeMyPassword
);

/*
 * user manager, admin area
 */
// create a new user
router.post("/register", controller.registerUser);
router.post("/forgotPassword", controller.sendEmail);
// get the list of users
router.get("/", controller.index);

// get the profile information of particular user

router.get("/profile/:id", auth.isAuthenticated(), controller.show);
//, auth.hasRole("manager")
// update the information of user
router.put("/", auth.isAuthenticated(), upload.single("profilePicture"), controller.updateUser);
router.put(
  "/updatePassword/:id",
  auth.isAuthenticated(),
  controller.changePassword
);

// delete a user
router.delete("/:id", auth.isAuthenticated(), controller.destroy);

router.get("/reset", auth.isAuthenticated(), controller.reset);
router.post("/resetPassword", auth.isAuthenticated(), controller.resetPassword);
router.post(
  "/updateUserMenue",
  auth.isAuthenticated(),
  controller.updateUserMenue
);
router.get("/menue/:id", auth.isAuthenticated(), controller.getMenue);
// router.get("/:id", controller.byId);
router.get("/prefrences/:email", controller.getPrefrences);
router.put(
  "/updateprefrences",
  auth.isAuthenticated(),
  controller.updatePrefrences
);
router.get("/limtedinfo/:id", controller.UserLimitedInfoById);
router.get("/limtedinfo", controller.UserLimitedInfo);
router.get("/getuserrole", auth.isAuthenticated(), controller.GetUserRole);
module.exports = router;
