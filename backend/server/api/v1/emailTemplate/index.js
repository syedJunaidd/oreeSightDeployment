const express = require("express");
const controller = require("./emailTemplate.controller");
const auth = require("../../../auth/auth.service");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/static/uploads')

    },

    filename: function (request, file, callBack) {
        callBack(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname)
        );
    }
});

var upload = multer({ storage: storage });


router.post("/save", auth.isAuthenticated(), upload.array('productImages', 5), controller.create);

//Get Templates By Type(email/Web) and User Id
router.get("/bytype/:type", auth.isAuthenticated(), controller.listTemplates);

router.get("/send/:Id", auth.isAuthenticated(), controller.sendNewsletter);

router.get("/:id", controller.byId);

router.delete("/:id", controller.remove);
// console.error('some error')
router.put("/", upload.array('productImages', 5), auth.isAuthenticated(), controller.updateTemplate);

module.exports = router;
