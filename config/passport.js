
//here i have migrated the code from app.js but now passport is not defined!, is it ok to require the passport module in each file?,
//wouldnt this confuse the refrences of each instantiated objected across
module.exports = passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));
module.exports = passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

module.exports = passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

//here how can I pass into this file the app instance, or shouldnt i place it here?,
app.use(passport.initialize());
app.use(passport.session());
