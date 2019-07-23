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
}