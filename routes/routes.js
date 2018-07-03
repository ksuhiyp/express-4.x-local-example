var app = express.Routes;
// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', {
      user: req.user
    });
  });

app.get('/login',
  function(req, res) {
    res.render('login');
  });
//look at the comments on passport.js. same here if i migrate this into a seperated file I am required to import
//a new passport module in order to prevent passport not defined err, is there a way to share across the same
//instance of passport, or am i miss understanding the concept of modules
app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('profile', {
      user: req.user
    });
  });
