var passport = require('passport');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/auth');
}
var url = require('url');

module.exports = function(app){
	// Configure Passport
	var expressSession = require('express-session');
	app.use(expressSession({secret: 'mySecretKey'}));
	app.use(passport.initialize());
	app.use(passport.session());


	// Initialize Passport
	var initPassport = require('../passport/init');
	initPassport(passport);

	// GET login page
	app.get('/auth', function(req, res, next) {
		if(req.isAuthenticated()){
			res.redirect('/user');
		}
	  res.render('login', { title: 'InternsHub | Auth' });
	});

	// GET user dashboard
	app.get('/user', isAuthenticated, function(req, res){
	  res.render('user', { title: 'InternsHub | Dashboard', user: req.user });
	});

	// Handle Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/auth');
	});

	// handle the callback after google has authenticated the user
  app.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/auth' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/user');
	  }
	);

	// route for google authentication and login
  app.get('/auth/google',
	  passport.authenticate('google', {scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]}),
		function(req, res){
	    // The request will be redirected to Google for authentication, so
	    // this function will not be called.
	  }
	);
}
