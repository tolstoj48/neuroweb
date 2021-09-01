
// Own error
const createError = require('http-errors');
// Model import
const Gene = require('../models/geneModel');
// Custom App error
const AppError = require("../utilities/appErrorUtil")

module.exports.pAndI = (jsonArray) => {
  jsonArray.forEach( async (geneObj) => {
    try {
      // Save new position to the db
      let newGenePosition = await new Gene(geneObj);
      let saved = await newGenePosition.save();
      if (!saved) {
        req.flash("error", "Control imported data quality! - Validation error on the db server!");
        throw new AppError('No data upload has been done', 400);
      } 
    } catch(e) {
      console.log(e.message)
    }
  })
}