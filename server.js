const express = require("express");
//const logger = require("morgan");
const mongoose = require("mongoose");
//const axios = require("axios");
const expressHandlebars = require("express-handlebars");
//const cheerio = require("cheerio");
const bodyParser = require("body-parser");
//const db = require("./models");
//mongo and mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database


const PORT = process.env.PORT || 3000;


const app = express();
const router = express.Router();

require("./config/routes")(router);

//app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//static directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
extended: false
}));

app.use(router);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";
mongoose.connect(MONGODB_URI)



//handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main" 
}));
app.set("view engine", "handlebars");



// const scrape = function (req, res) {
//     console.log("news");
//     // First, we grab the body of the html with axios
//     // chosse webpage to scape-------
//     return axios.get("https://www.chron.com/").then(function (response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       const $ = cheerio.load(response.data);
// //choose heading for articles---------
//       $("h5").each(function (i, element) {
//         const results = {};

//          result.title = $(this)
//          .children("a")
//          .text();
        
//          results.link = $(element).children("a").attr("href");
//         results.push({
            
            
//         });
//         db.Article.create(results).then(function (dbArticle) {
//             console.log(dbArticle);
//         }).catch(function (err) {
//             throw err;
//         })
//     });
//     res.send("scrape finished")
// });
// };

// app.get("/articles", function (req, res) {
// db.Article.find({}).then(function (dbArticle) {
//     res.json(dbArticle);
// }).catch(function (err) {
//     res.json(err);
// });
// });

// app.get("/articles/:id", function (req, res) {
// db.Article.findOne({ _id: req.params.id }).populate("Note").then(
//     function (dbArticle) {
//         res.json(dbArticle);
//     }).catch(function (err) {
//         res.json(err);
//     });
// });

// app.post("/articles/:id", function (req, res) {
// db.Comment.create(req.body).then(function (dbNote) {
//     return db.Article.findOneAndUpdate({ _id: req.params.id },
//         { Note: dbNote._id }, { new: true });
// }).then(function (dbArticle) {
//     res.json(dbArticle);
// }).catch(function (err) {
//     res.json(err);
// })
// })

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });