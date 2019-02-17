/*jshint esversion: 6 */
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
// const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const app = express();
var database = require('./app/config/db');

app.use(session({
    secret:'asgencer knows how to code',
    resave: true,
    saveUninitialized:false
}));

mongoose.connect(database.url, {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

var routes = require('./app/routes/index');
app.use('/', routes);

app.use(function(req,res,next){
    var err = new Error('Dosya Bulunamadı');
    err.status = 404;
    next(err);
});

app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

// MongoClient.connect(db.url, (err, client) => {
//     var db = client.db('onurludenetim');
//     if (err) {
//         return console.log(err);
//     }
//     require('./app/routes')(app, db);
//     app.listen(process.env.PORT || 4000, function(){
//     console.log('Your node js server is running');
// });
// });