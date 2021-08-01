process.env.NODE_ENV = "test";

let { oneTaskData } = require("./test-data/taskData");
const Task = require("../../models/taskModel");

const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require("../../node_modules/mongoose");
const mockgoose = new Mockgoose(mongoose);

const chai = require("chai");

const { itShouldTestMinConditions, itShouldTestMaxConditions } = require("./utils/minMaxUtil");

describe("Initialize", function () {
  it("should successfully load the model", async () => {
    try {
      const Task = require("../../models/taskModel");
    } catch (err) {
      if (err) throw err;
    }
  });
});

describe("Model Test", function () {
  this.timeout(15000);
  before(function (done) {
    // Connection to db called test and promise to verify, that connection to db works
    mockgoose.prepareStorage().then(function () {
      mongoose.connect("mongodb://localhost:27017/testingDb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // For longer imports etc. needs higher time in ms to work
        connectTimeoutMS: 3000,
      })
        .then(() => {
          // Not in testing env
          if (process.env.NODE_ENV !== "test") console.log("Mongo DB connection open!")
          done()
        })
        .catch(err => {
          console.log("Mongo DB error of connection")
          console.log(err)
        })
    });

  })
  // Delete one new task based on own data
  after(async function () {
    await Task.findOneAndDelete({ who_wants_it: "petrioska" });
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination!')
      process.exit(0);
    })
  })

  describe("Mongoose validations", function () {
    describe("should checks", function () {
      describe("check correct model - save one task to db", function () {

        it("should create one task and save to db", async function () {
          const newTask = new Task(oneTaskData);
          await newTask.save();
        })
      })

      describe("check correct model - enum on done", function () {
        for (const category in Task.schema.obj["done"].enum) {

          it(`should create one task with ${Task.schema.obj["done"].enum[category]} in done`, function (done) {
            oneTaskData[category] = category;
            let newTask = new Task(oneTaskData);
            newTask.save(function (err) {
              if (err) throw err;
              done();
            });
          });
        }
      });
    });

    describe("shouldn´t checks", function () {
      describe("required fields", function () {

        it("shouldn´t create one task without date", function (done) {
          delete oneTaskData.date;
          const newTask = new Task(oneTaskData);
          newTask.save(function (err) {
            chai.expect(err).to.exist
              .and.be.instanceof(Error)
              .and.have.property("message", "Task validation failed: date: Path `date` is required.")
            oneTaskData.date = "2021-07-30"
            done();
          });
        })
        it("shouldn´t create one task without done", function (done) {
          delete oneTaskData.done;
          const newTask = new Task(oneTaskData);
          newTask.save(function (err) {
            chai.expect(err).to.exist
              .and.be.instanceof(Error)
              .and.have.property("message", "Task validation failed: done: Path `done` is required.")
            oneTaskData.done = "in process"
            done();
          });
        })


        describe("check correct model - max and min length mongoose validators", function () {
          // loop for lengths testing
          for (const property in Task.schema.obj) {
            if (property !== "done") {
              if (["date"].includes(property)) {
                itShouldTestMinConditions(oneTaskData, Task, chai, property);
                itShouldTestMaxConditions(oneTaskData, Task, chai, property);
              } else {
                itShouldTestMaxConditions(oneTaskData, Task, chai, property);
              }
            }
          }
        })
      })
    })
  })
})