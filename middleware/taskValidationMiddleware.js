'use strict';

const reqValidationSchema = require("../utilities/reqValidationSchema");
const { taskNewSchema } = reqValidationSchema;

const createError = require('http-errors');

// Validate created task
module.exports.validateNewTask = (req, res, next) => {
  let validatedObj = req.body;
  let error = false;
  console.log(validatedObj);

  validatedObj = taskNewSchema.validate(validatedObj).value;
  error = taskNewSchema.validate(validatedObj).error;

  if(error) {
    const msg = error.details.map(el => el.message).join(",")
    next(createError(400, msg));
  } else {
    res.locals.validatedObj = validatedObj;
    next();
  }
}