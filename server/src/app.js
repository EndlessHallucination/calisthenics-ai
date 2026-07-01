const express = require("express");
const app = express();
const skillsRouter = require("./routes/skills");

app.use(express.json());

app.use("/api/skills", skillsRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
