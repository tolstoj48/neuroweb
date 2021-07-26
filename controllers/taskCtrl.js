'use strict';

const Task = require("../models/taskModel");

// Render new task form
module.exports.new = (req, res) => {
  res.render('new-task', {
    layout: 'index',
    title: 'NGL - Create a new task',
  });
}

// Creates new task and redirect to the list of the tasks
module.exports.postNewTask = async (req, res, next) => {
  const newTask = new Task(res.locals.validatedObj);
  const saved = await newTask.save();
  if(!saved) {
    next(createError(400, 'Data nebyla uložena do db!'));
  }
  //req.flash("success", "New task has been created!");
  res.redirect(`/`);
}

