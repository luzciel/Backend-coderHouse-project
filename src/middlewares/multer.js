const multer = require("multer");

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../../src/public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

module.exports = multer({ storage });