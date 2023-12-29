const multer = require("multer");

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    const uploadPath = __dirname + "/../../src/public/uploads";

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

module.exports = multer({ storage });