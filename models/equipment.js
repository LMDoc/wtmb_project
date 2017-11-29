const mongoose = require('mongoose');

let equipmentSchema = new mongoose.Schema({
    slot: String,
    name: String,
    image: String,
    quality: String,
    level: Number,
    power: {type: Number, default: 1},
});



module.exports = mongoose.model('Equipment', equipmentSchema); 


;