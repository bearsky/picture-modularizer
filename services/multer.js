const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = `./public/uploads/${new Date().toISOString().split('.')[0]}-${path.parse(file.originalname).name}`;
    fs.mkdir(dir, err => cb(err, dir))
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString().split('.')[0]}-${file.originalname}`)
  },
});
const multerUpload = multer({ storage: storage });

module.exports = multerUpload;