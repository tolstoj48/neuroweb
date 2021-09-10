'use strict';

const userReqValidationSchema = require('../utilities/userReqValidationSchema');
const { userNewSchema } = userReqValidationSchema;
const createError = require('http-errors');

// Validate created user
module.exports.validateNewUser = (req, res, next) => {
  let validatedObj = req.body;
  let error = false;

  validatedObj = userNewSchema.validate(validatedObj).value;
  error = userNewSchema.validate(validatedObj).error;

  if(error) {
    const msg = error.details.map(el => el.message).join(',')
    next(createError(400, msg));
  } else {
    res.locals.validatedObj = validatedObj;
    next();
  }
}