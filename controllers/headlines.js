const scrape = require("../script/scrape");

const Article = require("../models/Article");

module.exports= {
   
       fetch: function(cb) {
          
          scrape(function(data) {
              const articles= data;
              for (var i=0; i < articles.length; i++){
                  articles[1].saved = false;
              }

              Article.collection.InsertMany( arcticles, {ordered:false}, function(err, docs){
                  cd(err,docs);
              });
          });
       },
    delete: function(query, cb) {
        Article.remove(query,cb);

    },

    get: function(query, cb) {
        Article.find(query)
        .sort({_id: -1})
        .exec(function(err,doc){
            cb(doc);
        });
    },
    update: function(query,cb){
        Article.update({_id: query._id,{
            $set:query
        }, {}, cb);
    }
}
