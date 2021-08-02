"use strict";

const mongoose = require("mongoose");

// Definition of new schema
const taskSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        minLength: [10, "Field should be min. 10 characters."],
        maxLength: [10, "Field should be max. 10 characters."]
    },
    who_wants_it: {
        type: String,
        maxLength: [50, "Field should be max. 50 characters."]
    },
    to_do_task: {
        type: String,
        maxLength: [1500, "Field should be max. 1500 characters."]
    },
    done: {
        type: String,
        required: true,
        enum: [
          "true",
          "false",
          "in process"
      ],
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;