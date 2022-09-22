'use strict'

require('./config')
const { logger, logConfig } = require('@vtfk/logger')
const checkRetries = require('./lib/steps/check-retries')
const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const moveToRunning = require('./lib/steps/move-job-to-running')
const getFileData = require('./lib/steps/get-file-data')
const overrideRecipients = require('./lib/steps/override-recipients')
const prepareData = require('./lib/steps/prepare-data')
const postStatus = require('./lib/steps/post-data')
const saveToDone = require('./lib/steps/save-to-done')
const saveToErrors = require('./lib/steps/save-to-errors')
const saveToRetries = require('./lib/steps/save-to-retries')
const saveCallbackData = require('./lib/steps/save-callback-data')
const removeFromRunning = require('./lib/steps/remove-from-running')

logConfig({
  teams: {
    level: 'warn'
  }
})

logger('info', ['index', 'start'])

checkRetries()
  .then(getNextJobFromQueue)
  .then(moveToRunning)
  .then(getFileData)
  .then(overrideRecipients)
  .then(prepareData)
  .then(postStatus)
  .then(saveCallbackData)
  .then(saveToDone)
  .then(saveToErrors)
  .then(saveToRetries)
  .then(removeFromRunning)
  .then((data) => {
    logger('info', ['index', data._id, 'finished'])
    process.exit(0)
  })
  .catch((error) => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
