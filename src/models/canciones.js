const mongoose = require("mongoose");

const cancionesSchema = new mongoose.Schema({
    name: String,
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    numberReplays: Number
});


const cancionesModel = mongoose.model("Canciones", cancionesSchema);

module.exports = cancionesModel;
