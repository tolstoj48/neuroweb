'use strict';

// Model import
const Gene = require('../models/geneModel');

// Multer dependency - file upload
const multer = require("multer")
  // Filesystem dependency
  , fs = require("fs")
  // Nodejs path
  , path = require("path")
  // Validation of the JSON array with JOI
  , jsonJoiValidation = require("../utilities/jsonValidationWithJoi")
  // Parse and import module
  , parseAndImport = require("../utilities/parseAndImport")
  // Delete, flash, redirect utility
  , deleteFlashRedirect = require("../utilities/deleteFlashRedirect")
  , csvToJson = require("../utilities/csvToJson")
  , AppError = require("../utilities/appErrorUtil")



// Validation and views setup
const fileS = 6000000000
  , allowedFiles = '.csv'
  , uploadFlag = true


// Search db for gNomen position
module.exports.searchGene = async (req, res) => {
  const { searchGnomen, searchGeneRefGene } = req.query;
  let data = '';
  // What has been searched for -> information for the search result in the view needed
  let searchedCategory = searchGnomen ? 'gNomen' : 'Gene_refGene';
  // Expression for the result of the search in the view
  let searchedExp = searchGnomen ? searchGnomen : searchGeneRefGene;
  // Trimed expression in the case user use whitespaces at the beginning and end of the searched expression
  if (searchedExp) searchedExp = searchedExp.trim();

  if (searchGnomen == '' || searchGnomen == ' ') {
    // Fulltext search - GNomen - needs non existent and empty
    const dataNoGNomen = await Gene.find({ gNomen: { '$exists': false } });
    const dataEmptyNoGNomen = await Gene.find({ gNomen: '' });
    data = dataNoGNomen.concat(dataEmptyNoGNomen);
    // Setup information for the search result - searched category
    searchedCategory = 'gNomen';
  } else if (searchGnomen) {
    data = await Gene.find({ gNomen: { '$regex': `${searchGnomen.trim()}`, '$options': 'i' } });
  } else if (searchGeneRefGene == '' || searchGeneRefGene == ' ') {
    // Fulltext search - GeneRefGene - needs non existent and empty
    const dataNoGeneRefGene = await Gene.find({ Gene_refGene: { '$exists': false } });
    const dataEmptyGeneRefGene = await Gene.find({ Gene_refGene: '' });
    data = dataNoGeneRefGene.concat(dataEmptyGeneRefGene);
    // Setup information for the search result - searched category
    searchedCategory = 'Gene_refGene';
  } else if (searchGeneRefGene) {
    // Fulltext search - geneRefGene
    data = await Gene.find({ Gene_refGene: { '$regex': `${searchGeneRefGene.trim()}`, '$options': 'i' } });
  } else {
    // Fulltext search - nothing filled in by the user
    data = await Gene.find();
  }
  // Information about the number of gene positions result
  const numberOfFoundPositions = data.length;

  const numberOfDbEntries = await Gene.countDocuments({});

  res.render('genes/search-genes', {
    layout: 'index',
    title: 'NGL - search in-house db',
    numberOfDbEntries,
    data,
    searchedExp,
    searchedCategory,
    numberOfFoundPositions,
    searched: true,
  });
}

// Get import data main page
module.exports.importDataMainPage = (req, res) => {
  res.render('genes/import-data', {
    layout: 'index',
    title: 'NGL - import data to inhouse db',
    fileS,
    allowedFiles,
    uploadFlag
  });
}

// Validate data and save them to the in-house db
module.exports.importData = async (req, res) => {
  // Variable with the name of the file
  const fileName = "db.csv"
  // If uploaded file exists, delete it
  fs.access(`./uploads/${fileName}`, fs.constants.F_OK, async (err) => {
    // If there is no file, skip
    if (err) {
      return
    }
    // File deletion
    await fs.unlink(`./uploads/${fileName}`, (err) => {
      if (err) console.log("File has not been deleted from the server.")
      console.log(`File: ./uploads/${fileName} has been deleted!`)
    })
  })

  // Setup the place to store the file and its name
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads")
    },
    filename: function (req, file, callback) {
      callback(null, fileName)
    }
  })


  // Limit the type and size of the file
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const ext = path.extname(file.originalname)
      if (ext !== ".csv") {
        return callback(new AppError(`Allowed types of files are: ${allowedFiles}!`), false)
      }
      callback(null, true)
    },
    limits: {
      fileSize: fileS,
    }
  }).single("genes")

  // Calling multer with the setup
  upload(req, res, (err) => {
    // If an error
    if (err instanceof multer.MulterError) {
      console.log(err.message);
      // Size errror and log
      return res.status(400).send({
        result: "error",
        message: `Uploaded file is bigger then allowed size ${fileS / 1000000} MB.`
      })
      // Other uploading errors
    } else if (err) {
      // Different type of errors
      req.flash("error", err.message)
      console.log(err.message)
      return res.redirect(400, "genes/import-data")
    }

    // Only if there is uploded file otherwise not possible to convert to json and db
    fs.access(`./uploads/${fileName}`, fs.constants.F_OK, async (err) => {
      //If there is no file then there must be end, otherwise parsing data
      if (err) {
        res.status(400).send({
          result: "error",
          message: `There is no file for uploading data to in-house db on the server!`
        })
      } else {
        let arr = []
        let jsonArray = []

        try {
          // If there is file and no error, then convert the file to the JSON array 
          jsonArray = await csvToJson.jsonArray(fileName)
          // Validation with the JOI before saving to the db 
          arr = await jsonJoiValidation.jsonValidationWithJoi(jsonArray)
        } catch (e) {
          console.log(e.message)
        }

        // If there are no errors, then import the data to the db
        if (arr.length == 0) {
          // Basic parsing and import to the in-house db
          if (jsonArray.length > 0) {
            await parseAndImport.pAndI(jsonArray)
          } else {
            // Delete, flash, redirect uploaded file
            deleteFlashRedirect.dFR(
              res,
              req,
              fileName,
              "error",
              "No gene positions in the csv!")
            // End fs.access
            return
          }
        } else {
          console.log(arr)
          // Delete, flash, redirect uploaded file
          deleteFlashRedirect.dFR(
            res,
            req,
            fileName,
            "error",
            `No gene positions has been imported!!! Incorrect values on gene positons: ${arr}!`,
          )
          // ukončení fs.access
          return
        }
        // Delete, flash, redirect uploaded file
        deleteFlashRedirect.dFR(
          res,
          req,
          fileName,
          "success",
          "The data import has been successfully completed."
        )
      }
    })
  })
}

// Import new db
module.exports.deleteDataConfirmPage = (req, res) => {
  res.render('genes/delete-confirm', {
    layout: 'index',
    title: 'NGL - delete all the data from in-house db',
  });
}

// Import new db
module.exports.deleteData = async (req, res) => {
  // Delete all the data from in-house db
  await Gene.remove({});
  req.flash('succes', 'The in-house db has been cleared!');
  const numberOfDbEntries = await Gene.countDocuments({});
  res.render('inhousedb', {
    layout: 'index',
    title: 'NGL - in-house database',
    numberOfDbEntries,
    searched: false
  });
}