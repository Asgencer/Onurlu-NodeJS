/*jshint esversion: 6 */
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8001;
var db = require('./app/config/db');
var today = createDate();
var user = {name: "Semih Gençer"};

function createDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}



app.get('/', (req, res) => {
    res.render('index', {
        title: "Ana Sayfa",
        user: user.name,
        date: today
    });
});
app.get('/stocks', (req, res) => {
    res.render('stocks', {
        title: "Stok Sorgulama",
        user: user.name,
        date: today
    });
});
app.get('/price', (req, res) => {
    res.render('price', {
        title: "Fiyat Hesaplama",
        user: user.name,
        date: today
    });
});

app.get('/delivery', (req, res) => {
    res.render('delivery', {
        title: "Teslimatlar",
        user: user.name,
        date: today
    });
});
app.get('/orders', (req, res) => {
    res.render('orders', {
        title: "Siparişler",
        user: user.name,
        date: today
    });
});
app.get('/administration', (req, res) => {
    res.render('administration', {
        title: "Yönetim",
        user: user.name,
        date: today
    });
});
app.get('/settings', (req, res) => {
    res.render('settings', {
        title: "Ayarlar",
        user: user.name,
        date: today
    });
});

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, (err, client) => {
    var db = client.db('onurludenetim');
    if (err) {
        return console.log(err);
    }
    require('./app/routes')(app, db);
    app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

});