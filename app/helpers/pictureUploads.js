var fs = require('fs');

/* 
  * fileUpload = the object containing the uploaded file
  * picName = a hidden element with the value of the current image name if
  *   there is one in the database.
  * delPic = check box, boolean true to delete the picture, false to not delete
  *   the current image
*/
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
