const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//
const upload = multer({ storage: storage });
const main = () => {
  console.log(__dirname);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = path.join(__dirname, req.file.path);
    res.send(file);
  });
  app.post("/upload-multiple", upload.array("files"), (req, res) => {
    const filesArray = req.files.map((e) => path.join(__dirname, e.path));
    res.json(filesArray);
  });
  app.listen(process.env.PORT || 3333, (_) => console.log("Server is running"));
};

main();
