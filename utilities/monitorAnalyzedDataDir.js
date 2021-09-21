'use strict';

const fs = require('fs')
  , File = require('../models/fileModel')
  , date = new Date().toString();

fs.watch('./analyzed-data', async (event, filename) => {
  try {
    // Only if there has been new file created or removed
    if (filename && event == 'rename') {
      console.log(`File change done: ${filename}, with event: ${event}`);
      const file = await File.find({ final_name: `${filename}` });
      if (!file[0]) {
        console.log('Not yet in the db');
        // need change the name
        await File.create({ 
          original_name: filename, 
          // Chnage this
          final_name: filename, 
          status: 'processed',
          date_of_upload: date,
        })
      } else {
        await File.updateOne({ final_name: `${filename}` }, {status: 'done'});
        console.log('Already in the db.');
      }
    }
  } catch (error) {
    console.log(error)
  }

})