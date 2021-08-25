"use strict";

// Validation of the uploads
const reqValidSchema = require("./geneReqValidationSchema");
// JOI validation schema of the gene position
const { geneImportSchema } = reqValidSchema;

module.exports.jsonValidationWithJoi = (jsonArray) => {
  // pole neuploadovaných u importu pro uživatele a systémového admina
  let arr = []
  jsonArray.forEach( async (geneObj) => {
    try {
      const error = geneImportSchema.validate( geneObj ).error
      if(error) arr.push([error._original["GNomen"], error.details[0].message])
    } catch(e) {
      console.log(e.message)
    }
  })
  return arr
}