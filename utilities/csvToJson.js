'use strict';

// Conversion of csv to JSON format of the uploaded siles
const csvtojson = require('csvtojson');

module.exports.jsonArray = (fileName) => {
  return csvtojson({
    trim: true,
    // If there are problems with the parsing to JSON or upload, there chance that error is here
    delimiter: ',',
    checkColumn: true,
    ignoreEmpty: true,
  }).fromFile(`./uploads/${fileName}`)
}