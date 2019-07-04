const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const expressHandlebars = require("express-handlebars");
const bodyParser = require ("body-parser");

//mongo and mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/";

const PORT = process.env.PORT || 3000;

//var db = required("./models");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//static directory
app.use(express.static(__dirname +"/public"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })



//handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
//body parser
app.use(bodyParser.urlencoded({
    extended:false
}))

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });