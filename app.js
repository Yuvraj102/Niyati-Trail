const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const formidable = require("formidable");
const os = require("os");
const cluster = require("cluster");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// firebase imports
const { addWork, fetchWork } = require("./controller/dbManager");

// @1
app.get("/", async (req, res) => {
  // Fetch all records
  const jobs = await fetchWork();

  res.render("home", { jobs });
});
// @2 post work here
app.post("/want-work", (req, res) => {
  const form = new formidable.IncomingForm();
  // console.log("request received", req.body);
  form.parse(req, async function (err, fields, files) {
    // console.log(fields, files);
    const filePath = files.workPic.filepath;
    // console.log(fields, filePath, files);
    await addWork(
      fields,
      filePath,
      files.workPic.originalFilename,
      files.workPic.mimetype.split("/")[1]
    );
    res.redirect("/");
  });
});
// @3 submit work form
app.get("/submit-work", (req, res) => {
  res.render("wantWork");
});
// @4
app.get("/work-profile", (req, res) => {
  // console.log(req.query);
  if (!req.query) {
    res.send("<h2>no query present</h2>");
  }
  res.render("needworkdescription", { profile: req.query });
});

// get all work @TODO move this to home
app.get("/get-work", async (req, res) => {
  const jobs = await fetchWork();
  res.send(jobs);
});

// LISTENING
const cpus = os.cpus().length;
const PORT = process.env.PORT || 3000;
if (cluster.isMaster) {
  for (let z = 0; z < cpus; z++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT} with pid : ${process.pid}`);
  });
}
