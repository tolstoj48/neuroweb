"use strict";
process.env.NODE_ENV = "test";

let { oneTaskData } = require("./test-data/taskData");
const Task = require("../../models/taskModel");

let { oneCommentData } = require("./test-data/commentData");
const Comment = require("../../models/commentModel");
const { editComment } = require("../../controllers/commentCtrl");

const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require("../../node_modules/mongoose");
const mockgoose = new Mockgoose(mongoose);

const chai = require("chai");
const assert = chai.assert;

const { itShouldTestMinConditions, itShouldTestMaxConditionsTask, itShouldTestMaxConditionsComment } = require("./utils/minMaxUtil");

describe("Initialize", function () {
  it("should successfully load the Task model", async () => {
    try {
      const Task = require("../../models/taskModel");
    } catch (err) {
      if (err) throw err;
    }
  });

  it("should successfully load the Comment model", async () => {
    try {
      const Comment = require("../../models/commentModel");
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
  });

  // Delete one new task based on own data
  after(function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination!')
      process.exit(0);
    })
  })

  describe("Task model test", function () {
    describe("check list of entries to Task model", function () {
      before(async function () {
        for (const category in Task.schema.obj["done"].enum) {
          oneTaskData[category] = category;
          let newTask = new Task(oneTaskData);
          await newTask.save();
        }
      });

      after(async function () {
        await Task.deleteMany({ who_wants_it: "petrioska" });
      });

      it("should have three entries", async function () {
        const arrayOfTasks = await Task.find({});
        assert.exists(arrayOfTasks);
        assert.isArray(arrayOfTasks);
        assert.lengthOf(arrayOfTasks, 3);
      })

      it("should have particular dates", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task["date"], /2021-08-0/, "correct key");
        }
      });

      it("shouldn´ have particular dates", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task["date"], /2021-p08-0/, "regexp does not match");
        }
      });

      it("should have particular who_wants_it", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task["who_wants_it"], /petrioska/, "correct key");
        }
      });

      it("shouldn´t have particular who_wants_it", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task["who_wants_it"], /petriosky/, "regexp does not match");
        }
      });

      it("should have particular to_do_task", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task["to_do_task"], /něco/, "correct key");
        }
      });

      it("shouldn´t have particular to_do_task", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task["to_do_task"], /totok/, "regexp does not match");
        }
      });

      it("should have particular done", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task["done"], /in process/, "correct key");
        }
      });

      it("shouldn´t have particular done", async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task["done"], /totok/, "regexp does not match");
        }
      });
    });

    describe("read a task", function () {
      before(async function () {
        let newTask = new Task(oneTaskData);
        await newTask.save();
      });

      after(async function () {
        await Task.deleteOne({ who_wants_it: "petrioska" });
      });

      it("should have proper task", async function () {
        const task = await Task.find({ who_wants_it: "petrioska" });
        assert.exists(task);
        assert.deepEqual({
          date: task[0].date,
          who_wants_it: task[0].who_wants_it,
          to_do_task: task[0].to_do_task,
          done: task[0].done,
        },
          {
            date: "2021-08-05",
            who_wants_it: "petrioska",
            to_do_task: "něco",
            done: "in process",
          })
      });

      // Negativce test that throws should be in try catch block and ensure, that AssertionError is thrown
      it("unknown task should fail", async function () {
        try {
          const task = await Task.find({ date: 'badkey12' });
          assert.notExists(task);
          throw new Error('should not get here');
        } catch (err) {
          // An error is expected, so it is an error if
          // the 'should not get here' error is thrown
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe("Comment model test", function () {
    describe("check list of entries to Comment model", function () {
      before(async function () {
          let newComment = new Comment(oneCommentData);
          await newComment.save();
      });

      after(async function () {
        await Comment.deleteOne({ name: "Testovací komentář" });
      });

      it("should have one entry", async function () {
        const arrayOfComments = await Comment.find({});
        assert.exists(arrayOfComments);
        assert.isArray(arrayOfComments);
        assert.lengthOf(arrayOfComments, 1);
      })

      it("should have particular name", async function () {
        const comment = await Comment.find({});
        assert.match(comment[0]["name"], /Testovací komentář/, "correct key");
      });

      it("shouldn´ have particular name", async function () {
        const comment = await Comment.find({});
        assert.notMatch(comment[0]["name"], /Fufo/, "regexp does not match");
      });

      it("should have particular content", async function () {
        const comment = await Comment.find({});
        assert.match(comment[0]["content"], /Tohle je obsah prvního testovacího komentáře./, "correct key");
      });

      it("shouldn´t have particular content", async function () {
        const comment = await Comment.find({});
        assert.notMatch(comment[0]["content"], /petriosky/, "regexp does not match");
      });
    });

    describe("read a comment", function () {
      before(async function () {
        let newComment = new Comment(oneCommentData);
        await newComment.save();
      });

      after(async function () {
        await Comment.deleteOne({ name: "Testovací komentář" });
      });

      it("should have proper comment", async function () {
        const comment = await Comment.find({ name: "Testovací komentář" });
        assert.exists(comment);
        assert.deepEqual({
          name: comment[0].name,
          content: comment[0].content,
        },
          {
            name: "Testovací komentář",
            content: "Tohle je obsah prvního testovacího komentáře.",
          })
      });

      // Negative test that throws should be in try catch block and ensure, that AssertionError is thrown
      it("unknown task should fail - comment", async function () {
        try {
          const comment = await Comment.find({ date: 'badkey12' });
          assert.notExists(comment);
          throw new Error('should not get here');
        } catch (err) {
          // An error is expected, so it is an error if
          // the 'should not get here' error is thrown
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe("Mongoose validation tests - Task", function () {
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
      });

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
      });

      describe("check correct model - max and min length mongoose validators", function () {
        // loop for lengths testing
        for (const property in Task.schema.obj) {
          if (property !== "done") {
            if (["date"].includes(property)) {
              itShouldTestMinConditions(oneTaskData, Task, chai, property);
              itShouldTestMaxConditionsTask(oneTaskData, Task, chai, property);
            } else {
              itShouldTestMaxConditionsTask(oneTaskData, Task, chai, property);
            }
          }
        }
      });
    });
  });

  describe("Mongoose validation tests - Comment", function () {
    describe("required fields", function () {
      it("shouldn´t create one comment without name", function (done) {
        delete oneCommentData.name;
        const newComment = new Comment(oneCommentData);
        newComment.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property("message", "comment validation failed: name: Path `name` is required.")
          oneCommentData.name = "Testovací komentář"
          done();
        });
      });

      describe("check correct model - max and min length mongoose validators", function () {
        // loop for lengths testing
        for (const property in Comment.schema.obj) {
          if (property !== "done") {
            itShouldTestMaxConditionsComment(oneCommentData, Comment, chai, property);
          }
        }
      });
    });
  });
});