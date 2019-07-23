const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function (cb) {
    console.log("news");
       
        return axios.get("https://www.chron.com/").then(function (err, res, body) {
          
          const $ = cheerio.load(body);

          $("h5").each(function(i, element) {
            const results = {};
    
             result.title = $(this)
             .children("a")
             .text();
            
             results.link = $(element).children("a").attr("href");
            results.push({
                
                
            });
            db.Article.create(results).then(function (dbArticle) {
                console.log(dbArticle);
            }).catch(function (err) {
                throw err;
            })
        });
        cb("articles")
    });
    };

    module.exports = scrape;