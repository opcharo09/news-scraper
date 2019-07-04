const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const expressHandlebars = require("express-handlebars");
const bodyParser = require ("body-parser");

const db = require("./models");
//mongo and mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password@ds247377.mlab.com:47377/heroku_flx5r7qg";

const PORT = process.env.PORT || 3000;


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

app.get("/scrape", function (req, res) {
    console.log("news");
    // First, we grab the body of the html with axios
    // chosse webpage to scape-------
    axios.get("http://www.nytimes.com").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
//choose heading for articles---------
      $("h2").each(function (i, element) {
        const results = [];

        const title = $(element).text();
        
        const link = $(element).children().attr("href");
        results.push({
            title: title,
            link: link
        });
        db.Article.create(results).then(function (dbArticle) {
            console.log(dbArticle);
        }).catch(function (err) {
            throw err;
        })
    });
    res.send("scrape finished")
});
});

app.get("/articles", function (req, res) {
db.Article.find({}).then(function (dbArticle) {
    res.json(dbArticle);
}).catch(function (err) {
    res.json(err);
});
});

app.get("/articles/:id", function (req, res) {
db.Article.findOne({ _id: req.params.id }).populate("note").then(
    function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
db.Comment.create(req.body).then(function (dbnote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id },
        { note: dbnote._id }, { new: true });
}).then(function (dbArticle) {
    res.json(dbArticle);
}).catch(function (err) {
    res.json(err);
})
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });