'use strict';

const fs = require('fs')

// Delete all the files in the directory
module.exports.delete = (fileName) => {
  return fs.unlink(`./uploads/${fileName}`, (err) => {
    if (err) {
      console.log(err)
      return
    } else {
      console.log('The uploaded file in ./uploads has been deleted after the import')
      return
    }
  })
}
