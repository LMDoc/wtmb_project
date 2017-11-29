const   express             = require("express"),
        bodyParser          = require('body-parser'),
        mongoose            = require("mongoose"),
        methodOverride      = require("method-override");

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/daybreak', {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

// ROUTES //
const   characterRoutes = require("./routes/characters"),
        equipmentRoutes = require("./routes/equipments");

//Landing Page
app.get('/', (req, res, next) => {
    res.redirect('/characters');
});

app.use('/characters', characterRoutes);
app.use('/equipment', equipmentRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server Listening...');
});
