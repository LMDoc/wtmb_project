var mongoose        = require("mongoose"),
    Character       = require("./models/character"),
    Equipment       = require("./models/equipment");

function seedDb() {
   var item = {name: 'Test Helm'}
   
   Character.find({}, (err, character) => {
        if(err) {
        console.log(err);
        } else {
            character.equipment.head.push(item)
        }
    }); 
}

module.exports = seedDb;