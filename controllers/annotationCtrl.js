'use strict';

const File = require('../models/fileModel')
  , fs = require('fs')
  , path = require('path')
  , multer = require('multer')
  , AppError = require('../utilities/appErrorUtil')

// Validation and views setup
const fileS = 6000000000
  , allowedFiles = '.vcf or .vcf.gz'
  , uploadFlag = true

// Render annotation page
module.exports.annotation = async (req, res) => {
  let data = await File.find().sort({ date_of_upload: 'desc' });
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

// Render annotation page upload
module.exports.uploadFileForAnotation = async (req, res) => {
  res.render('annotations/upload-data', {
    layout: 'index',
    title: 'NGL - Annotation file upload',
    fileS,
    allowedFiles,
    uploadFlag
  });
}

// Validate data and save them to the in-house db
module.exports.importData = async (req, res) => {
  // Setup the place to store the file and its name
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './analysis-data')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
  })

  // Limit the type and size of the file
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const ext = path.extname(file.originalname)
      if (ext !== '.vcf' && ext !== '.gz') {
        return callback(new AppError(`Allowed types of files are: ${allowedFiles}!`), false)
      }
      // If the file does already exists on the HDD, then just generate AppError
      if (fs.existsSync(`./analysis-data/${file.originalname}`)) {
        return callback(new AppError(`A file with the same name already exists on the server. Please, change the name or ask the admin of the web.`), false)
      }
      callback(null, true)
    },
    limits: {
      fileSize: fileS,
    }
  }).single("analysis")

  // Calling multer with the setup
  upload(req, res, (err) => {
    if (err) {
      // Different type of errors
      console.log(err.message)
      return res.status(400).send({
        result: 'error',
        message: err.message
      })
    }

    // Only if there is uploaded file otherwise not finished upload
    fs.access(`./analysis-data/${req.file.filename}`, fs.constants.F_OK, (err) => {
      //If there is no file then there must be end, otherwise finished
      if (err) {
        res.status(400).send({
          result: 'error',
          message: 'The file has not been uploaded on the server!'
        })
      } else {
        // Redirect uploaded file
        return res.send({ result: 'success' })
      }
    })
  })
}
