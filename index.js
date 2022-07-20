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
  const __dirname1 = path.resolve();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.post("/upload", upload.single("file"), (req, res) => {
    app.use(express.static(path.join(__dirname1, "/uploads")));

    const file =  path.resolve(__dirname1, req.file.path)
    res.send(file);
  });
  app.post("/upload-multiple", upload.array("files"), (req, res) => {
    const filesArray = req.files.map((e) => e.path);
    res.json(filesArray);
  });
  app.listen(process.env.PORT || 3333, (_) => console.log("Server is running"));
};

main();
