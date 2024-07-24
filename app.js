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
const cookieParser = require('cookie-parser');

//neue Instanz von Express erstellen
const app = express();

//dotenv konfigurieren;
dotenv.config();

//port definieren
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

//add cors options
const corsOptions = {
    origin: ['http://localhost:3000','https://advanced-specialised-project-1fd524002e25.herokuapp.com/dashboard']
}
app.use(cors(corsOptions));
//add body-parsing
app.use(bodyParser.urlencoded({ extended: true }));
//use json
app.use(express.json());
//allow loading assets from public folder
app.use(express.static('public'));
//add rate limit
app.use(rateLimiter);
//add cookie-parsing
app.use(cookieParser());
//routes
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