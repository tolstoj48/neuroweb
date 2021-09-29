'use strict';

const Task = require('../models/taskModel')
  , Comment = require('../models/commentModel')
  , Gene = require('../models/geneModel')
  , File = require('../models/fileModel')
  , createError = require('http-errors')
  , fs = require('fs')
  , path = require('path')

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
module.exports.annotation = async (req, res) => {
  let data = await File.find().sort({ date: 'asc', test: -1 });
  res.render('annotation', {
    layout: 'index',
    title: 'NGL - Annotation',
    data,
  });
}

// Sends the file with fileName from the clicked link and on the address listed below
module.exports.downloadAnnotatedFile = (req, res) => {
  let { fileName } = req.params;
  // Check the existence of the given file in the dir
  fs.access(`./annotated-data/${fileName}`, (err) => {
    // If there is no such file, redirect and flash
    if (err) {
      console.log('Error: ', err)
      req.flash('error', `The file: ${fileName} is not available on the server, contact the admin of the web!`);
      res.redirect(`/annotation`);
    // Else, send the given file for download and log it
    } else {
      res.download(path.join(__dirname, '..', 'annotated-data/', `${fileName}`), function (err) {
        if (err) {
          console.log('Error: ', err)
        } else {
          console.log(`File: ${fileName} sent!`)
        }
      })
    }
  })
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


