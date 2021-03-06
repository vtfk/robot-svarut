'use strict'

const { logger } = require('@vtfk/logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = data => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-callback-data', data._id])
    if (data.errors.length === 0 && data.callbackData) {
      logger('info', ['save-callback-data', data._id, 'no errors', 'saving callbackdata'])
      const fileName = `${config.CALLBACK_DIRECTORY_PATH}/${data.callbackData._id}.json`
      await saveFile({ filePath: fileName, data: data.callbackData })
    } else {
      logger('warn', ['save-callback-data', data._id, 'errors', data.errors.length])
    }
    resolve(data)
  })
}
