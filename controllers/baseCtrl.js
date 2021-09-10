'use strict';

const Task = require('../models/taskModel');
const Comment = require('../models/commentModel');
const Gene = require('../models/geneModel');
const createError = require('http-errors');

// Render page with useful links
module.exports.home = async (req, res) => {
  let data = await Task.find().sort({ date: 'asc', test: -1 });
  res.render('main', {
    layout: 'index',
    title: 'NGL - HUB',
    data
  });
}

// Render page with db search
module.exports.inhousedb = async (req, res) => {
  const numberOfDbEntries = await Gene.countDocuments({});
  res.render('inhousedb', {
    layout: 'index',
    title: 'NGL - in-house database',
    numberOfDbEntries,
    searched: false,
  });
}

// Render annotation page
module.exports.annotation = (req, res) => {
  res.render('annotation', {
    layout: 'index',
    title: 'NGL - Annotation',
  });
}

// Render filter page
module.exports.filter = (req, res) => {
  res.render('filter', {
    layout: 'index',
    title: 'NGL - Filter',
  });
}

// Render merge page
module.exports.merge = (req, res) => {
  res.render('merge', {
    layout: 'index',
    title: 'NGL - Merge',
  });
}

// Render beos page
module.exports.beds = (req, res) => {
  res.render('beds', {
    layout: 'index',
    title: 'NGL - BEDs',
  });
}
// Render fastqs page
module.exports.fastqs = (req, res) => {
  const fs = require('fs');
  const testFolder = './data';
  let data = [];

  // Getting the list of all files in the given directory
  fs.readdir(testFolder, (err, files) => {
    if (err) createError(400, 'Files couldn´t be read from the directory!');
    files.forEach(file => {
      data.push(file)
    })
    res.render('fastqs', {
      layout: 'index',
      title: 'NGL - FASTQs',
      data,
    })

  })
};

// Render bam-crams page
module.exports.bamcrams = (req, res) => {
  res.render('bam-crams', {
    layout: 'index',
    title: 'NGL - BAM-CRAMs',
  });
}

// Render ngs-com page
module.exports.ngscom = async (req, res) => {
  const data = await Comment.find().sort({ name: 'asc', test: -1 });
  res.render('ngs-com', {
    layout: 'index',
    title: 'NGL - NGS Comments',
    data
  });
}


