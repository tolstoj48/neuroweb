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
    next(createError(400, 'Task has not been saved in the db'));
  }
  req.flash("success", "New task has been created!");
  res.redirect(`/`);
}

// Edit existing task page
module.exports.editTask = async(req, res) => {
  // Save parametr
  let { taskId } = req.params;
  // Search given task by id from db and the clicked link
  const detailTaskData = await Task.findById( taskId );
  if (!detailTaskData) {
    req.flash("error", "The task does not exist!");
    return res.redirect("/");
  }
  res.render("edit-task", {
    layout: 'index' ,
    title: 'NGL - Edit an existing task',
    task: detailTaskData 
  });
}

// Update detail of the task in db
module.exports.updateTask = async (req, res, next) => {
  // Save the id from the link
  let { taskId } = req.params;
  // Save the trimmed data to db
  const { date, to_do_task, who_wants_it, done } = res.locals.validatedObj;
  // Finds the task, run validators
  const taskDb = await Task.findByIdAndUpdate( taskId,  { 
    date : `${date}`, 
    to_do_task : `${to_do_task}` ,
    who_wants_it: `${who_wants_it}`,
    done: `${done}`,
  }, {runValidators: true, new: true})
  if (!taskDb) {
    next(createError(400, 'Task has not been updated in the db!'));
  }
  req.flash("success", "The task has been updated!");
  res.redirect(`/`);
}

// Confirm delete
module.exports.confirmDeleteTask = async (req, res) => {
  const  { taskId } = req.params;
  const detailTaskData = await Task.findById( taskId );
  if (!detailTaskData) {
    req.flash("error", "The task does not exist!");
    return res.redirect("/");
  }
  res.render("confirm-delete-task", {
    layout: 'index' ,
    title: 'NGL - Confirm the delete of the task',
    task: detailTaskData 
  });
}

// Delete task
module.exports.deleteTask = async (req, res) => {
  const  { taskId } = req.params
  await Task.findByIdAndDelete(taskId)
  req.flash("success", "The task has been deleted!")
  res.redirect("/")
}

