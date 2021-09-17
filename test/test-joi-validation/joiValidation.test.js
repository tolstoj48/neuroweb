'use strict';

const chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
  , taskReqValidationSchema = require('../../utilities/taskReqValidationSchema')
  , commentReqValidationSchema = require('../../utilities/commentReqValidationSchema')
  , userReqValidationSchema = require('../../utilities/userReqValidationSchema')
  , { taskNewSchema } = taskReqValidationSchema
  , { commentNewSchema } = commentReqValidationSchema
  , { makeString } = require('./utilities/makeString')
  , { userNewSchema } = userReqValidationSchema

chai.use(chaiHttp);


describe('JOI validation test - Task', function () {

  it('should successfully validate data', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-31',
      'who_wants_it': 'svjiotrof',
      'to_do_task': 'nicnedělání',
      'done': 'false'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.be.undefined;
  })

  it('should throw Error - short date', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-1',
      'who_wants_it': 'svjiotrof',
      'to_do_task': 'nicnedělání',
      'done': 'false'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"date" length must be at least 10 characters long');
  })

  it('should throw Error - long date', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-100',
      'who_wants_it': 'svjiotrof',
      'to_do_task': 'nicnedělání',
      'done': 'false'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"date" length must be less than or equal to 10 characters long');
  })

  it('should throw Error - missing date', function () {
    const validatedObj = taskNewSchema.validate({
      'who_wants_it': 'svjiotrof',
      'to_do_task': 'nicnedělání',
      'done': 'false'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"date" is required');
  })

  it('should throw Error - too long to_do_task', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-10',
      'who_wants_it': 'svjiotrof',
      'to_do_task': 'svjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofvjiotrofsvjiotrofsvjiotrofsvjiotrofvjiotrofsvjiotrofsvjiotrofsvjiotrofvjiotrofsvjiotrofsvjiotrofsvjiotrofvjiotrofsvjiotrofsvjiotrofsvjiotrof',
      'done': 'true'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"to_do_task" length must be less than or equal to 1500 characters long');
  })

  it('should throw Error - too long who_wants_it', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-10',
      'who_wants_it': 'svjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrof',
      'to_do_task': 'nicnedělá',
      'done': 'in process'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"who_wants_it" length must be less than or equal to 50 characters long');
  })

  it('should throw Error - done not in [true, false, in process]', function () {
    const validatedObj = taskNewSchema.validate({
      'date': '2021-08-10',
      'who_wants_it': 'svjiotrofsvj',
      'to_do_task': 'nicnedělá',
      'done': 'there'
    }).value;
    const error = taskNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"done" must be one of [true, false, in process]');
  })
});


describe('JOI validation test - Comment', function () {

  it('should successfully validate data', function () {
    const validatedObj = commentNewSchema.validate({
      'name': '2021-08-31',
      'content': 'svjiotrof',
    }).value;
    const error = commentNewSchema.validate(validatedObj).error;
    expect(error).to.be.undefined;
  })

  it('should throw Error - long name', function () {
    const validatedObj = commentNewSchema.validate({
      'name': makeString(155),
      'content': 'svjiotrof',
    }).value;
    const error = commentNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"name" length must be less than or equal to 150 characters long');
  })

  it('should throw Error - missing name', function () {
    const validatedObj = commentNewSchema.validate({
      'content': 'svjiotrof',
    }).value;
    const error = commentNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"name" is required');
  })
});

describe('JOI validation test - User', function () {

  it('should successfully validate data', function () {
    const validatedObj = userNewSchema.validate({
      'username': '2021-08-31',
      'email': 'svjiotrof',
      'role': 'Admin',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.be.undefined;
  })

  it('should throw Error - long username', function () {
    const validatedObj = userNewSchema.validate({
      'username': makeString(155),
      'email': 'svjiotrof',
      'role': 'Admin',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"username" length must be less than or equal to 100 characters long');
  })

  it('should throw Error - long email', function () {
    const validatedObj = userNewSchema.validate({
      'username': "pjotr",
      'email': makeString(155),
      'role': 'Admin',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"email" length must be less than or equal to 100 characters long');
  })

  it('should throw Error - missing username', function () {
    const validatedObj = userNewSchema.validate({
      'email': 'svjiotrof',
      'role': 'Admin',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"username" is required');
  })

  it('should throw Error - missing email', function () {
    const validatedObj = userNewSchema.validate({
      'username': 'svjiotrof',
      'role': 'Normal',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"email" is required');
  })

  it('should throw Error - missing role', function () {
    const validatedObj = userNewSchema.validate({
      'username': 'svjiotrof',
      'email': 'Admin',
      'password': "AlexKral"
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"role" is required');
  })

  it('should throw Error - missing password', function () {
    const validatedObj = userNewSchema.validate({
      'username': 'svjiotrof',
      'role': 'Admin',
      'email': 'neco',
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"password" is required');
  })

  it('should throw Error - invalid role', function () {
    const validatedObj = userNewSchema.validate({
      'username': 'svjiotrof',
      'role': 'Kokon',
      'email': 'neco',
      'password': "AlexKral",
    }).value;
    const error = userNewSchema.validate(validatedObj).error;
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message', '"role" must be one of [Admin, Normal]');
  })
});
