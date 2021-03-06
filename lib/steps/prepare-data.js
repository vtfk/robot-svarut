'use strict'

const { logger } = require('@vtfk/logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    logger('info', ['prepare-data', data._id])
    data.errors = []
    data.jobId = data._id
    data.retry = false
    resolve(data)
  })
}
