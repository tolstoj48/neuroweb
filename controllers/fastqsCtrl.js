'use strict';

const fs = require('fs');
const dataFolder = './data';
const createError = require('http-errors');
const path = require('path');

// Sends the file with fileName from the clicked link and on the address listed below
module.exports.downloadAFile = (req, res) => {
  let { fileName } = req.params;
  fs.readdir(dataFolder, (err, files) => {
    if (err) createError(400, 'Files couldn´t be read from the directory!');
    // Find the file in the directory - simple iteration - could be solved with better way
    for (let i = 0; i < files.length; i++) {
      if (files[i] === fileName) {
        // From where is the file beeing sent
        res.download(path.join(__dirname, '..', 'data/', `${fileName}`), function (err) {
          if (err) { 
            console.log("Error: ", err);
          } else {
          console.log("File sent!")
        }
        });
        
      }
    }
  })
}

