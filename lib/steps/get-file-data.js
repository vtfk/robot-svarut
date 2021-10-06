'use strict'

const { logger } = require('@vtfk/logger')
const config = require('../../config')

module.exports = file => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.RUNNING_DIRECTORY_PATH}/${file}`
    logger('info', ['get-file-data', filePath])
    const data = require(filePath)
    if (data) {
      logger('info', ['get-file-data', data._id, 'data found'])
      resolve(data)
    } else {
      const error = new Error('File not found')
      logger('error', ['get-file-data', 'error', error])
      reject(error)
    }
  })
}
