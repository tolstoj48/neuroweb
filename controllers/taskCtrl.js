'use strict';

// Render new task form
module.exports.new = (req, res) => {
  res.render('new-task', {
    layout: 'index',
    title: 'NGL - New task',
  });
}