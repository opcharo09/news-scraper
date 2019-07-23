const scrape = require("../script/scrape");
const headlines = require("../controllers/headlines");
const routesController = require ("../controllers/routes");

module.exports = function(router) {
    router.get("/", function(req, res){
        res.render("home")
    });

    router.get("/saved", function(req, res){
        res.render("saved");
    });

    app.get("/articles", function (req, res) {
db.Article.find({}).then(function (dbArticle) {
    res.json(dbArticle);
}).catch(function (err) {
    res.json(err);
});
});

app.get("/articles/:id", function (req, res) {
db.Article.findOne({ _id: req.params.id }).populate("Note").then(
    function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
db.Comment.create(req.body).then(function (dbNote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id },
        { Note: dbNote._id }, { new: true });
}).then(function (dbArticle) {
    res.json(dbArticle);
}).catch(function (err) {
    res.json(err);
})
})
}