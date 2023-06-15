const multer = require('multer');
const path=require('path');
// Set storage engine
 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init upload
  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('image');
  
  // Check file type
  function checkFileType(file, cb) {
    console.log(file);
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
 

  module.exports = {upload};
  
  
  
  
  