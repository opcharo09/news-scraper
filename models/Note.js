const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    headline: {
        type: this.schema.types.objectId,
        ref: "Headline"
    },
    
       
        noteText: String
    
});
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;