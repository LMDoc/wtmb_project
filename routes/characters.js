const   express         = require('express'),
        router          = express.Router(),
        Character       = require('../models/character'),
        Equipment       = require('../models/equipment');
        
// SHOW ALL CHARACTERS
router.get('/', async (req, res, next) => {
    const character = await Character.find({});
    res.render('character/index', {character : character});
});


// CREATE NEW CHARACTER
router.post('/', async (req, res) => {
    let newCharacter = req.body.character;
    
    await Character.create(newCharacter);
    res.redirect('/characters');
});

// SHOW SINGLE CHARACTER
router.get('/c/:id', async (req, res) => {
    
    const foundChar     = await Character.findById(req.params.id);
    const foundWeapon   = await Equipment.findById(foundChar.equipment.weapon);
    const foundOffHand  = await Equipment.findById(foundChar.equipment.offHand);
    const foundNeck     = await Equipment.findById(foundChar.equipment.neck);
    const foundCloak    = await Equipment.findById(foundChar.equipment.cloak);
    const foundHead     = await Equipment.findById(foundChar.equipment.head);
    const foundArms     = await Equipment.findById(foundChar.equipment.arms);
    const foundChest    = await Equipment.findById(foundChar.equipment.chest);
    const foundLegs     = await Equipment.findById(foundChar.equipment.legs);
    
    res.render('character/showChar', 
        {
            character: foundChar,
            weapon: foundWeapon,
            offHand: foundOffHand,
            neck: foundNeck,
            cloak: foundCloak,
            head: foundHead,
            arms: foundArms,
            chest: foundChest,
            legs: foundLegs,
            
        }
    );
});



// NEW CHARACTER FORM
router.get('/new', (req, res) => {
   res.render('character/new');
});

// lvl up route
router.post('/c/:id/lvlup', async (req, res) => {
    let character = await Character.findById(req.params.id);
    if (character.level < 20) {
       character.level += 1;
    }
    await character.save();
    res.redirect('/characters/c/'+character.id);
});

// lvl down route
router.post('/c/:id/lvldown', async (req, res) => {
    let character = await Character.findById(req.params.id);
    if (character.level > 1) {
       character.level -= 1;
    }
    await character.save();
    res.redirect('/characters/c/'+character.id);
});

// ADD EQUIPMENT TO CHARACTER
router.post('/c/:id/equipment', async (req, res) => {
    let equipment = req.body.equipment;
    let slot = req.body.slot;

    if (slot === 'Weapon') 
    {
        const character = await Character.findById(req.params.id);
                character.equipment.weapon = [];
                character.equipment.weapon.push(equipment);
                character.save();
                res.redirect('/characters/c/'+character.id);
    }
    else if (slot === 'Off-Hand')
    {
        const character = await Character.findById(req.params.id);
                character.equipment.offHand = [];
                await character.equipment.offHand.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
    else if (slot === 'Neck')
    {
     const character = await Character.findById(req.params.id);
                character.equipment.neck = [];
                await character.equipment.neck.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
    else if (slot === 'Cloak')
    {
     const character = await Character.findById(req.params.id);
                character.equipment.cloak = [];
                await character.equipment.cloak.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
     else if (slot === 'Head')
    {
     const character = await Character.findById(req.params.id)
                character.equipment.head = [];
                await character.equipment.head.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
     else if (slot === 'Arms')
    {
     const character = await Character.findById(req.params.id)
                character.equipment.arms = [];
                await character.equipment.arms.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
    else if (slot === 'Chest')
    {
     const character = await Character.findById(req.params.id);
                character.equipment.chest = [];
                await character.equipment.chest.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
    else if (slot === 'Legs')
    {
     const character = await Character.findById(req.params.id);
                character.equipment.legs = [];
                await character.equipment.legs.push(equipment);
                await character.save();
                res.redirect('/characters/c/'+character.id);
    }
});


// EDIT ROUTE
router.get('/c/:id/edit', async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render('character/edit', {character: character});
});


// UPDATE ROUTE
router.put('/c/:id', async (req, res) => {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body.character);
    res.redirect('/characters/c/'+character.id);
});


// DELETE ROUTE
router.delete('/c/:id', async (req, res) => {
    await Character.findByIdAndRemove(req.params.id);
    res.redirect('/');
});



// EQUIPMENT ROUTES
router.get('/c/:id/equipment/pick/weapon', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Weapon'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/neck', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Neck'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/off-hand', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Off-Hand'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/cloak', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Cloak'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/head', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Head'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/arms', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Arms'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/chest', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Chest'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

router.get('/c/:id/equipment/pick/legs', async (req, res) => {
    
    const equipment = await Equipment.find({slot: 'Legs'});
    const character = await Character.findById(req.params.id);
    res.render('equipment/pick', {equipment: equipment, character: character});
});

module.exports = router;