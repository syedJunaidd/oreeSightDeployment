const multer = require('multer');

exports.storage= multer.diskStorage({
  destination: function (request, file, callBack) {
    callBack(null, './uploads/');
  },
  filename: function (request, file, callBack){
    callBack(null, new Date().toISOString()+file.originalname);
  }
});


// exports.upload = multer({storage: storage});

