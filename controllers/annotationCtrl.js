'use strict';

const File = require('../models/fileModel')
  , fs = require('fs')
  , path = require('path')


// Validation and views setup
const fileS = 6000000000
  , allowedFiles = ".vcf"
  , uploadFlag = true

// Render annotation page
module.exports.annotation = async (req, res) => {
  let data = await File.find().sort({ date: 'asc', test: -1 });
  res.render('annotations/annotation', {
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

// Render annotation page
module.exports.uploadFileForAnotation = async (req, res) => {
  res.render('annotations/upload-data', {
    layout: 'index',
    title: 'NGL - Annotation file upload',
    fileS,
    allowedFiles,
    uploadFlag
  });
}
