'use strict';

const commentReqValidationSchema = require("../utilities/commentReqValidationSchema");
const { commentNewSchema } = commentReqValidationSchema;

const createError = require('http-errors');

// Validate created comment
module.exports.validateNewComment = (req, res, next) => {
  let validatedObj = req.body;
  let error = false;

  validatedObj = commentNewSchema.validate(validatedObj).value;
  error = commentNewSchema.validate(validatedObj).error;

  if(error) {
    const msg = error.details.map(el => el.message).join(",")
    next(createError(400, msg));
  } else {
    res.locals.validatedObj = validatedObj;
    next();
  }
}