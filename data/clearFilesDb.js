// Clear all the data from the in-house database
const mongoose = require('mongoose');
const File = require('../models/fileModel');


// připojení k DB - musí běžet
mongoose.connect('mongodb://localhost:27017/neuroweb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection open!')
  })
  .catch(err => {
    console.log('Error of connection')
    console.log(err)
  });

const clearDb = async () => {
    await File.remove({})
      .then(data => {
        console.log('Db cleared!');
        // Imported data
        console.log(data);
        // End process
        process.emit('SIGINT');
      });
  }

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

clearDb();