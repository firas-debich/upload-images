const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const main = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file.path;
    res.send(file);
  });
  app.post("/upload-multiple", upload.array("files"), (req, res) => {
    const filesArray = req.files.map((e) => e.path);  

    res.json(filesArray);
  });

  app.listen(process.env.PORT || 3333, (_) => console.log("Server is running"));
};

main();
