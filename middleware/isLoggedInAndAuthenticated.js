'use strict';

// Is the user logged in and authenticated then can not access login page
module.exports.isLoggedInAndAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.path === '/login') return res.redirect('/');
    next();
}