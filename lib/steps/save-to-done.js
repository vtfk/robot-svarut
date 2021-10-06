'use strict'

const { logger } = require('@vtfk/logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = data => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-done', data._id])
    if (data.errors.length === 0) {
      logger('info', ['save-to-done', data._id, 'no errors', 'saving to done'])
      const fileName = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({ filePath: fileName, data: data })
    } else {
      logger('warn', ['save-to-done', data._id, 'errors', data.errors.length])
    }
    resolve(data)
  })
}
