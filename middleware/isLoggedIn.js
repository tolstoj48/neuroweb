'use strict';

// Is the user logged in? 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You have to be logged in!');
        return res.redirect('/login');
    }
    next();
}