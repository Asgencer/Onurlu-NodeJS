/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var today = createDate();
var user = {
  name: "Semih Gençer"
};
var registeredUser = require('../../modals/user');

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

router.get('/homepage', function(req, res, next){
  return res.render('index', {
    title: "Ana Sayfa",
    user: user.name,
    date: today
  });
});

router.post('/register', function(req, res, next){
  if(req.body.username && req.body.name && req.body.surname && req.body.password && req.body.confirmPassword){
    if(req.body.password != req.body.confirmPassword){
      var err = new Error('Şifreler eşleşmiyor');
      err.status = 400;
      return next(err);
    }

    //Create User
    var userData = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password
    };

    registeredUser.create(userData, function (error, user){
      if(error){
        return next(error);
      }
      else {
        return res.redirect('/homepage');
      }
    });
  }
  else {
    var err = new Error('Tüm alanları doldurunuz.');
    err.status = 400;
    return next(err);
  }
});

router.get('/', function (req, res, next) {
  return res.render('login', {
    title: "Bosch Onurlu Takip Sistemi",
    date: today
  });
});

router.post('/', function (req, res, next){
  if(req.body.username && req.body.password){
    registeredUser.authenticate(req.body.username, req.body.password, function(error, user){
      if(error){
        return next(error);
      }
      else if (!user){
        var err = new Error('Kullanıcı bulunamadı.');
        err.status = 401;
        return next(err);
      }
      else {
        req.session.userId = user._id;
        return res.redirect('/homepage');
      }
    });
  }
  else {
    var error = new Error('Tüm alanları doldurunuz.');
    error.status = 401;
    return next(error);
  }
});

router.get('/stocks', function (req, res, next) {
  return res.render('stocks', {
    title: "Stok Sorgulama",
    user: user.name,
    date: today
  });
});

router.get('/price', function (req, res, next) {
  return res.render('price', {
    title: "Fiyat Hesaplama",
    user: user.name,
    date: today
  });
});

router.get('/delivery', function (req, res, next) {
  return res.render('delivery', {
    title: "Teslimatlar",
    user: user.name,
    date: today
  });
});
router.get('/orders', function (req, res, next) {
  return res.render('orders', {
    title: "Siparişler",
    user: user.name,
    date: today
  });
});
router.get('/administration', function (req, res, next) {
  return res.render('administration', {
    title: "Yönetim",
    user: user.name,
    date: today
  });
});
router.get('/settings', function (req, res, next) {
  return res.render('settings', {
    title: "Ayarlar",
    user: user.name,
    date: today
  });
});

module.exports = router;