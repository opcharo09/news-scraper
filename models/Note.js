const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    noteBody: {
        type: String,
        required: true
    }
});
const note = mongoose.model("note", noteSchema);
module.exports = note;