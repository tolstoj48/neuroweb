'use strict';

const fs = require('fs')
  , File = require('../models/fileModel')
  , date = new Date()
  , directory = './analysis-data'

fs.watch(directory, async (event, filename) => {
  try {
    /* Only if there has been new file created or removed
    If any file is removed, that has not been in the db, new 
    document is created in the db and the data file might be sent 
    again to the annotation process.
    */

    if (filename && event == 'rename') {
      console.log(`File change done: ${filename}, with event: ${event}`);
      // Full path to the manipulated file
      const fileDir = directory + '/' + filename;

      // Check the existence of the file with the given name
      fs.access(fileDir, fs.F_OK, async (err) => {
        // If anybody wants to delete existing file, just deletes it and sets the status in the db to done to all the documents.
        if (err) {
          await File.updateMany({ local_disk_name: `${filename}` }, { status: 'done' });
          console.error(`File has been deleted - cant be written in the db: ${fileDir}`);
          return
        }
        
        // If file doesnt exist in db, write it to the db.
        let annotated_filename = filename.slice(0, filename.search('.vcf')) + '_annotated.txt'
        console.log('Not yet in the db. Document created.');
        await File.create({
          local_disk_name: filename,
          annotated_filename: annotated_filename,
          status: 'processed',
          date_of_upload: date.toString(),
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
})