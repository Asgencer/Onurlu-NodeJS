/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var today = createDate();
var mid = require('../middleware/index');
var registeredUser = require('../modals/user');
var targetModel = require('../modals/target');
var announcementModel = require('../modals/announcement');

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

router.get('/homepage', mid.requiresLogin, function(req, res, next){
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      var date = today[3] + today[4] + "/" + today[6] + today[7] + today[8] + today[9];
      targetModel.findOne({"date" : date}).exec(function(err,target){
        announcementModel.find({}).lean().exec(function (err,announcements){
          console.log(target);
          return res.render('index', {
            title: "Ana Sayfa",
            user: fullname,
            date: today,
            targets: target,
            announcementList : announcements
          });
        });
      });
    });
});

router.get('/getAllAnnouncements', function (req, res, next) {
  announcementModel.find({}).lean().exec(function (err,announcements){
    if(err){
      return next(err);
    }
    return res.send(announcements);
  });
})

router.post('/createAnnouncement', function(req,res,next) {
  var announcementData = {
    header: req.body.header,
    body: req.body.body
  };

  announcementModel.create(announcementData, function(err, announcement) {
    if(err){
      console.log(err);
      return next(err);
    }
    return (res.send(announcement));
  });
});

router.post('/createtargets', function(req,res,next) {
  var targetData = {
    date: req.body.date,
    sololda: req.body.sololda,
    solomda: req.body.solomda,
    ankastrelda: req.body.ankastrelda,
    ankastremda: req.body.ankastremda,
    cp1: req.body.cp1,
    cp2: req.body.cp2,
    iron: req.body.iron,
    vcleaner: req.body.vcleaner
  };

  targetModel.create(targetData, function(err, target) {
    if(err){
      console.log(err);
      return next(err);
    }
    return (res.send(target));
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
        req.session.userId = user._id;
        return res.redirect('/homepage');
      }
    });
  }
  else {
    var error = new Error('Tüm alanları doldurunuz.');
    error.status = 400;
    return next(error);
  }
});

router.get('/logout', function (req, res, next){
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }
      else {
        return res.redirect('/');
      }
    });
  }
});

router.get('/', mid.loggedOut, function (req, res, next) {
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

router.get('/stocks', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('stocks', {
        title: "Stok Sorgulama",
        user: fullname,
        date: today
      });
    });
});

router.get('/price', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('price', {
        title: "Fiyat Sorgulama",
        user: fullname,
        date: today
      });
    });
});

router.get('/delivery', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('delivery', {
        title: "Teslimatlar",
        user: fullname,
        date: today
      });
    });
});
router.get('/orders', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('orders', {
        title: "Siparişler",
        user: fullname,
        date: today
      });
    });
});
router.get('/administration', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('administration', {
        title: "Yönetim",
        user: fullname,
        date: today
      });
    });
});
router.get('/settings', mid.requiresLogin, function (req, res, next) {
  
  registeredUser.findById(req.session.userId)
    .exec(function (error, user){
      if(error){
        return next(error);
      }
      var fullname = user.name + " " + user.surname;
      return res.render('settings', {
        title: "Ayarlar",
        user: fullname,
        date: today
      });
    });
});

module.exports = router;