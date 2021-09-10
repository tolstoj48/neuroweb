'use strict';

// is the user logged in? 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You have to be logged in!');
        return res.redirect('/login');
    }
    //if (req.isAuthenticated() && req.path === '/login') res.redirect('/');
    next();
}