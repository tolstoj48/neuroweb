
// Own error
const createError = require('http-errors');

module.exports.pAndI = (jsonArray) => {
  jsonArray.forEach( async (geneObj) => {
    try {
      // uložení nové žopl do db
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