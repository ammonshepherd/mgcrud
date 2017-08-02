var fs = require('fs');

exports.handlePicture = function(fileUpload, picName, delPic) {
  if (fileUpload) {
    pictureValue = fileUpload.filename;
    // Delete existing pic if there is one
    if(picName) {
      fs.unlink('./app/public/uploads/' + picName, function(err) {
        if (err) console.log(err);
      });
    }
  } else {
    pictureValue = picName;
  }
    // Set the value in the db to null, and delete the file
  if (delPic == 'on') {
    pictureValue = '';
    fs.unlink('./app/public/uploads/' + picName, function(err) {
      if (err) console.log(err);
    });
  }

  return pictureValue;
};
