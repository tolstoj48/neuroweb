'use strict';

// Messages
const deleteUploadedFile = require('./deleteUploadedFile');

module.exports.dFR = (res, req, fileName, type, msg) => {
  deleteUploadedFile.delete(fileName)
  req.flash(msg)
  if (type == 'error') {
    return res.status(400).send({
      result: type,
      message: msg
    })
  }
  return res.send({ result: 'success' })
}
