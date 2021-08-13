'use strict';

const comment = require("../models/commentModel");

// Render new comment form
module.exports.new = (req, res) => {
  res.render('comments/new-comment', {
    layout: 'index',
    title: 'NGL - Create a new comment',
  });
}

// Creates new comment and redirect to the list of the comments
module.exports.postNewComment = async (req, res, next) => {
  const newcomment = new comment(res.locals.validatedObj);
  const saved = await newcomment.save();
  if(!saved) {
    next(createError(400, 'comment has not been saved in the db'));
  }
  req.flash("success", "New comment has been created!");
  res.redirect(`/ngs-com`);
}

// Edit existing comment page
module.exports.editComment = async(req, res) => {
  // Save parametr
  let { commentId } = req.params;
  // Search given comment by id from db and the clicked link
  const detailcommentData = await comment.findById( commentId );
  if (!detailcommentData) {
    req.flash("error", "The comment does not exist!");
    return res.redirect("/ngs-com");
  }
  res.render("comments/edit-comment", {
    layout: 'index' ,
    title: 'NGL - Edit an existing comment',
    comment: detailcommentData 
  });
}

// Update detail of the comment in db
module.exports.updateComment = async (req, res, next) => {
  // Save the id from the link
  let { commentId } = req.params;
  // Save the trimmed data to db
  const { name, content } = res.locals.validatedObj;
  // Finds the comment, run validators
  const commentDb = await comment.findByIdAndUpdate( commentId,  { 
    name : `${name}`, 
    content : `${content}` ,
  }, {runValidators: true, new: true})
  if (!commentDb) {
    next(createError(400, 'comment has not been updated in the db!'));
  }
  req.flash("success", "The comment has been updated!");
  res.redirect(`/ngs-com`);
}

// Confirm delete
module.exports.confirmDeleteComment = async (req, res) => {
  const  { commentId } = req.params;
  const detailCommentData = await comment.findById( commentId );
  if (!detailCommentData) {
    req.flash("error", "The comment does not exist!");
    return res.redirect("/");
  }
  res.render("comments/confirm-delete-comment", {
    layout: 'index' ,
    title: 'NGL - Confirm the delete of the comment',
    comment: detailCommentData 
  });
}

// Delete comment
module.exports.deleteComment = async (req, res) => {
  const  { commentId } = req.params
  await comment.findByIdAndDelete(commentId)
  req.flash("success", "The comment has been deleted!")
  res.redirect("/ngs-com")
}

