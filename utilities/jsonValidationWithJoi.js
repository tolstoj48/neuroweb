'use strict';

// Validation of the uploads
const reqValidSchema = require('./geneReqValidationSchema')
  // JOI validation schema of the gene position
  , { geneImportSchema } = reqValidSchema;

module.exports.jsonValidationWithJoi = (jsonArray) => {
  // Not imported array for logs for admin
  let arr = []
  jsonArray.forEach(async (geneObj) => {
    try {
      const error = geneImportSchema.validate(geneObj).error
      if (error) arr.push([error._original['gNomen'], error.details[0].message])
    } catch (e) {
      console.log(e.message)
    }
  })
  return arr
}