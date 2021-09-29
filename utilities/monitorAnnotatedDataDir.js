'use strict';

const fs = require('fs')
  , File = require('../models/fileModel')
  , directory = './annotated-data'
  // Annotation extension
  , annotationFlag = '_annotated'

fs.watch(directory, async (event, filename) => {
  try {
    /* Only if there has been new file created or removed
    If any file is created/removed, we change the status of 
    the file in the db to 'done'.
    */

    if (filename && event == 'rename') {
      console.log(`File change done: ${filename}, with event: ${event}`);
      // The name of the original uploaded file written in the db - we have to find it and change the status
      let shortenedFilenameForDbSearch = filename.slice(0, filename.search(annotationFlag)) + '.vcf';
      // Updates all the documents in the db with the given name and sets status to done - if new file --> must be status change, we got the annotation done
      await File.updateMany({ local_disk_name: `${shortenedFilenameForDbSearch}` }, { status: 'done' });
    }
  } catch (error) {
    console.log(error)
  }
})