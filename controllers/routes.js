const Note = require("../script/scrape");



module.exports= {
   
 

    get: function(data, cb) {
        Note.find({
            _articleId: data._id
        }, cb);

    },

    save: function(data, cb){
        const newNote ={
            _articleId: data,_id,
            noteText: data.noteText
        };
        Note.create(newNote, function(err, doc){
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
                cb(doc);
                        }
        });
    },

    delete: function(data, cb){
        Note.remove({
            _id: data._id 
        }, cb);

        }
    };
 