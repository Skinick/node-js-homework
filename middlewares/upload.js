const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    const uinquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uinquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extention not allow"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerConfig,
  limits,
  //fileFilter,
});

module.exports = upload;