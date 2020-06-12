'use strict'

const config = require('../../config')
const moveFile = require('../move-file')
const logger = require('../logger')

module.exports = file => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const filePath = `${config.QUEUE_DIRECTORY_PATH}/${file}`
    const runningFilePath = `${config.RUNNING_DIRECTORY_PATH}/${file}`
    logger('info', ['move-job-to-running', filePath, runningFilePath])
    await moveFile({ from: filePath, to: runningFilePath })
      .then(() => {
        logger('info', ['move-job-to-running', file, 'success'])
        resolve(file)
      })
      .catch(err => reject(err))
  })
}
