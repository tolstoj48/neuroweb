'use strict';

// Used authorization from https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api

function authorize(roles = []) {
    /* Roles param can be a single role string (e.g. Role.User or 'User') 
     or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    */
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // Authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // User's role is not authorized
                return res.render('helpers/not-authorized', {
                    layout: 'index',
                    title: "NGL - Not authorized"
                });
            }
            // Authorization successful
            next();
        }
    ];
}

module.exports = authorize;