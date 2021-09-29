'use strict';

// Save variable node_env to dev by default
const env = process.env.NODE_ENV || 'development'

// Login data
const credentials = require(`./.credentials.${env}.json`)

// Export modul
module.exports = { credentials }