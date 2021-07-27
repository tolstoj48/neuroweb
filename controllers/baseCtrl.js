'use strict';

const Task = require("../models/taskModel");

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
module.exports.inhousedb = (req, res) => {
  res.render('inhousedb', {
    layout: 'index',
    title: 'NGL - in-house database',
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
  res.render('fastqs', {
    layout: 'index',
    title: 'NGL - FASTQs',
  });
}
// Render bam-crams page
module.exports.bamcrams = (req, res) => {
  res.render('bam-crams', {
    layout: 'index',
    title: 'NGL - BAM-CRAMs',
  });
}

// Render ngs-com page
module.exports.ngscom = (req, res) => {
  res.render('ngs-com', {
    layout: 'index',
    title: 'NGL - NGS Comments',
  });
}


