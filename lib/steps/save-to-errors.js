'use strict'

const { logger } = require('@vtfk/logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = data => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-error', data._id])
    if (data.errors.length > 0 && data.retry === false) {
      const fileName = `${config.ERRORS_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({ filePath: fileName, data: data })
      logger('info', ['save-to-error', data._id, fileName, 'success'])
    } else {
      if (data.retry === true) {
        logger('info', ['save-to-error', data._id, 'will retry'])
      } else {
        logger('info', ['save-to-error', data._id, 'no errors'])
      }
    }
    resolve(data)
  })
}
