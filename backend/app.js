const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./controllers/products");

const app = express();


var db = "mongodb+srv://talp:@FadSJwF98NtMuk@cluster0.vbnc3.mongodb.net/node-angular"

  mongoose.connect(db, {useNewUrlParser: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/products", postsRoutes);

module.exports = app;
