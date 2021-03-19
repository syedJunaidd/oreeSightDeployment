// "use strict";;

const express = require("express");
const controller = require("./project.controller");
const auth = require("../../../auth/auth.service");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve(__dirname, "../../../static/files"));
    cb(null, path.resolve(__dirname, "../../../static/files"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now()+".mpp");
    // cb(null, file.fieldname + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

/*
 * create project
 */
router.post(
  "/",
  auth.isAuthenticated(),
  upload.single("file"),
  controller.createProject
);

// get project object
router.get("/", auth.isAuthenticated(), controller.getProjectsList);

// delete a project
router.delete("/:id", auth.isAuthenticated(), controller.deleteProject);

router.get("/dashboard", auth.isAuthenticated(), controller.getDashboard);

module.exports = router;
