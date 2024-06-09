const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cancionesSchema = new mongoose.Schema({
    name: String,
    artist: String,
    numberReplays: Number
})

const cancionesModel = mongoose.model("Canciones", cancionesSchema);

module.exports = cancionesModel;
