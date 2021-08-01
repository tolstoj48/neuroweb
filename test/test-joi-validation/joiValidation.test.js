"use strict";

const chai = require('chai')
      ,chaiHttp = require('chai-http')
      ,expect = chai.expect
      ,reqValidationSchema = require("../../utilities/reqValidationSchema")
      ,{ taskNewSchema } = reqValidationSchema

chai.use(chaiHttp);

describe("JOI validation test", function () {

    it("should successfully validate data", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-31",
        "who_wants_it": "svjiotrof",
        "to_do_task": "nicnedělání",
        "done": "false"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.be.undefined;
    })

    it("should throw Error - short date", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-1",
        "who_wants_it": "svjiotrof",
        "to_do_task": "nicnedělání",
        "done": "false"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"date" length must be at least 10 characters long');
    })

    it("should throw Error - long date", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-100",
        "who_wants_it": "svjiotrof",
        "to_do_task": "nicnedělání",
        "done": "false"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"date" length must be less than or equal to 10 characters long');
    })

    it("should throw Error - missing date", function () {
      const validatedObj = taskNewSchema.validate({
        "who_wants_it": "svjiotrof",
        "to_do_task": "nicnedělání",
        "done": "false"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"date" is required');
    })

    it("should throw Error - to long to_do_task", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-10",
        "who_wants_it": "svjiotrof",
        "to_do_task": "nicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělánínicneděláníniělánínicneděláníniělánínicnedělánínicnedělánínicnedělánínicnedělánínicnedělání",
        "done": "true"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"to_do_task" length must be less than or equal to 1500 characters long');
    })

    it("should throw Error - too long who_wants_it", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-10",
        "who_wants_it": "svjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrofsvjiotrof",
        "to_do_task": "nicnedělá",
        "done": "in process"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"who_wants_it" length must be less than or equal to 50 characters long');
    })

    it("should throw Error - done not in [true, false, in process]", function () {
      const validatedObj = taskNewSchema.validate({
        "date": "2021-08-10",
        "who_wants_it": "svjiotrofsvj",
        "to_do_task": "nicnedělá",
        "done": "there"
      }).value;
      const error = taskNewSchema.validate(validatedObj).error;
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property("message", '"done" must be one of [true, false, in process]');
    })
  });
