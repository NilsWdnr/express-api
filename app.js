const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const invalidPathHandler = require('./middleware/invalidPathHandler');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const postsRouter = require('./routes/postsRouter');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

//neue Instanz von Express erstellen
const app = express();

//dotenv konfigurieren;
dotenv.config();

//port definieren
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

//cors Optionen
const corsOptions = {
    origin: ['http://localhost:3000','https://advanced-specialised-project-1fd524002e25.herokuapp.com/dashboard']
}
app.use(cors(corsOptions));
//Body-Parsing hinzufügen
app.use(bodyParser.urlencoded({ extended: true }));
//JSON Middleware hinzufügen
app.use(express.json());
// Assets aus dem public Ordner laden
app.use(express.static('public'));
// Rate Limiter geladen
app.use(rateLimiter);
// Session middleware hinzugefügt
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//Routes
app.use('/user', userRouter);
app.use('/post', postsRouter);
app.use('/dashboard',dashboardRouter);

app.get('/',(req, res) => {
    if (req.accepts('html')) {
        res.redirect('/dashboard');
    }
})

// //Error Handling falls ein ungültiger Pfad angefragt wurde
app.use(invalidPathHandler);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//mit MongoDB verbinden
mongoose.connect(mongoURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        })
    })
    .catch((error) => {
        console.error('Error while connecting to database: ' + error);
    })