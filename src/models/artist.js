const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    artistName: String,
    bestSong: String,
    numberReplays: Number
})

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistSchema;
