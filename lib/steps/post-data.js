'use strict'

const axios = require('axios')
const { logger } = require('@vtfk/logger')
const config = require('../../config')
const generateSystemJwt = require('../generate-system-jwt')
const generatePayload = require('../generate-payload')
const sleep = require('../sleep.js')

const postAndWait = async (data) => {
  axios.defaults.headers.common.Authorization = generateSystemJwt()
  const result = await axios.post(config.SVARUT_SERVICE_URL, generatePayload(data))

  const location = result.headers.location
  let retryAfter = result.headers['Retry-After'] || 3
  let status = result.status
  logger('info', ['post-data', data._id, 'status location', location])
  logger('info', ['post-data', data._id, 'retry-after', retryAfter])

  let retryCount = 1
  let innerResult
  while ((status !== 200 && status !== 500) && retryCount < 15) {
    if (status >= 400 && status <= 499) {
      logger('error', ['post-data', data._id, 'error from azf-svarut', status])
      throw innerResult.data
    } else if (retryCount > 1) {
      logger('info', ['post-data', data._id, 'waiting', retryAfter, 'seconds'])
      await sleep(retryAfter)
      logger('info', ['post-data', data._id, 'iteration', (retryCount - 1), 'complete'])
    }

    innerResult = await axios.get(location)
    status = innerResult.status
    retryAfter = innerResult.headers['Retry-After'] || retryAfter
    logger('info', ['post-data', data._id, 'status', status])
    retryCount++
  }

  if (innerResult && innerResult.data.customStatus && innerResult.data.customStatus === 'Failed') {
    logger('warn', ['post-data', data._id, 'customStatus', innerResult.data.customStatus])
    throw innerResult.data
  }

  return innerResult.data
}

module.exports = data => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-data', data._id, 'start'])

    try {
      const innerResult = await postAndWait(data)
      logger('info', ['post-data', data._id, 'response from azf-svarut', innerResult.customStatus])
      // delete input object from repsonse
      if (innerResult.input && innerResult.runtimeStatus === 'Completed' && innerResult.customStatus === 'Sent') {
        logger('info', ['post-data', data._id, 'removing input object from repsonse'])
        delete innerResult.input
      }
      logger('info', ['post-data', data._id, 'finished'])
      data.response = innerResult
    } catch (error) {
      logger('error', ['post-data', data._id, error])
      data.retry = true
      data.errors.push(error)
    }

    resolve(data)
  })
}
