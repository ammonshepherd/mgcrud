var path = require('path');
var multer = require('multer');

var storageType = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/public/uploads/');
  },
  filename: function (req, file, cb) {
    var fileParse = path.parse(file.originalname);
    var fileName = fileParse.name + '-' + Date.now() + fileParse.ext;
    fileName = fileName.replace(/[^\w.]+/g, '_');
    cb(null, fileName);
  }
});

var upload = multer({ storage: storageType });

module.exports = upload;
