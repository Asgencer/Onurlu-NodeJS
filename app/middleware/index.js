function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
      return res.redirect('/homepage');
    }
    return next();
  }

  function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('Bu sayfayı görmek için giriş yapmanız gerekiyor.');
      err.status = 401;
      return next(err);
    }
  }

  module.exports.loggedOut = loggedOut; 
  module.exports.requiresLogin = requiresLogin; 