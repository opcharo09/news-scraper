var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require ("body-parser");

var PORT = process.env.PORT || 3000;

//var db = required("./models");

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//static directory
app.use(express.static(__dirname +"/public"));
//handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
//body parser
app.use(bodyParser.urlencoded({
    extende:false
}))
//mongo and mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/";

mongoose.connect(MONGODB_URI);

mongoose.connect("mongod://localhost/", {useNewUrlParse: true});


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });