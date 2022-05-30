const multer = require('multer');
const path = require('path');

// Set the Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, process.env.UPLOAD_IMG_PATH),
  filename: (req, file, callback) => {
    callback(null, doRenameToDate());
  }
})

// Return string to rename file
function doRenameToDate() {
  const now = new Date();
  return `Onebrick_Properties_Image:${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_at_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}.jpeg`;
}

// Check file type middleware
function checkFileType(file, callback) {

  // Allowed extnames
  const fileTypes = /jpeg|jpg|png|gif/;

  // Check extname
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    return callback('Error:Images only');
  }
}

module.exports = multer({
  storage,
  fileFilter: (req, file, callback) => { checkFileType(file, callback) },
  limits: { fileSize: 10000000 }
}).single('image');
