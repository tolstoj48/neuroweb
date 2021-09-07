'use strict';

const { exec } = require('child_process');

let script = exec('sh ./shellScripts/hi.sh',
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
