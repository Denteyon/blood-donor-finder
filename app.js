const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');

const publicPath = path.join(__dirname,'public');

var app = express();
const port = process.env.PORT || 3000;

const router = require('./router/router');

// Set up mongoose connection
var dev_db_url = 'mongodb+srv://ashaygyi:ashaygyi@full-cycle-rg79z.gcp.mongodb.net/fullcycleApp?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(express.static(publicPath));

app.use('/', router.router);


// app.get('/', (req, res)=>{
//     res.send('Hello');
// });

app.listen(port, () => {
    console.log(`server is up and running at ${port}`);
});
