const mongoose = require('mongoose');
const equipmentSchema = require("./equipment")

let characterSchema = new mongoose.Schema({
        name:  {type: String, required: true, minlength: 3, maxlength: 11},
        role:  {type: String, required: true},
        gender: {type: String, required: true},
        race:  {type: String, default: 'Human', required: true},
        level: {type: Number, default: 1, min: 1, max: 20},
        power: {type: Number, default: 1},
        guild: {type: String, default: 'Guildless'},
        equipment: {
                weapon: [],
                offHand: [],
                neck: [],
                cloak: [],
                head: [],
                arms: [],
                chest: [],
                legs: [],
        },
        story: {type: String, default: 'Add character\'s backstory here!'}
});

module.exports = mongoose.model('Character', characterSchema);
