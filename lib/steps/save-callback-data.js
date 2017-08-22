'use strict'

const uuid = require('uuid')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-callback-data', data._id])
    if (data.errors.length === 0 && data.callbackData) {
      logger('info', ['save-callback-data', data._id, 'no errors', 'saving callbackdata'])
      const fileName = `${config.CALLBACK_DIRECTORY_PATH}/${uuid()}.json`
      await saveFile({filePath: fileName, data: data.callbackData})
    } else {
      logger('warn', ['save-callback-data', data._id, 'errors', data.errors.length])
    }
    resolve(data)
  })
}
