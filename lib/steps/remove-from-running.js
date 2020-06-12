'use strict'

const config = require('../../config')
const deleteFile = require('../delete-file')
const logger = require('../logger')

module.exports = data => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    logger('info', ['remove-from-running', data._id])
    const fileName = `${config.RUNNING_DIRECTORY_PATH}/${data._id}.json`
    await deleteFile(fileName)
    resolve(data)
  })
}
