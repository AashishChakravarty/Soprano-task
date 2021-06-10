const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg and .jpeg format allowed!')
      err.name = 'ExtensionError'
      return cb(err);
    }
  },
});

module.exports = upload;