'use strict';

const mongoose = require('mongoose');

// Definition of new schema
const fileSchema = new mongoose.Schema({
    local_disk_name: {
        type: String,
        required: true,
        minLength: [1, 'Field should be min. 1 characters'],
        maxLength: [100, 'Field should be max. 10 characters.'],
      },
      status: {
        type: String,
        required: true,
        enum: [
          'processed',
          'done'
        ],
      },
        date_of_upload: {
          type: String,
          required: true,
          minLength: [1, 'Field should be min. 1 characters'],
          maxLength: [100, 'Field should be max. 100 characters.']
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;