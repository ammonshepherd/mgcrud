var multer = require('multer');

var storageType = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storageType });

module.exports = upload;
