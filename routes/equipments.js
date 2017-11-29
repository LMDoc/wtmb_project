const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Equipment = require('../models/equipment');

// SHOW ALL EQUIP
router.get('/', (req, res) => {
    Equipment.find({}, (err, equipment) => {
        if(err) {
            console.log(err);
        } else {
            res.render('equipment/equipment', {equipment: equipment});
        }
    });
});

// CREATE NEW EQUIP
router.post('/', (req, res) => {
    let slot = req.body.slot;
    let name = req.body.name;
    let quality = req.body.quality;
    let power = req.body.power;
    let level = req.body.level;
    let special = req.body.special;
    let newEquipment = {name: name, slot: slot, quality: quality, power: power, level: level, special: special};  // {ExportedAs: Var Name}

   Equipment.create(newEquipment, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/equipment');
        }
    });
});


// NEW EQUIP FORM
router.get('/new', (req, res) => {
   res.render('equipment/newgear');
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
    await Equipment.findByIdAndRemove(req.params.id);
    res.redirect('/equipment');
});

module.exports = router;