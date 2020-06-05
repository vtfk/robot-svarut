'use strict'

const axios = require('axios')
const config = require('../../config')
const generateSystemJwt = require('../generate-system-jwt')
const generatePayload = require('../generate-payload')
const logger = require('../logger')
const sleep = require('../sleep.js')

const postAndWait = async (data) => {
  axios.defaults.headers.common['Authorization'] = generateSystemJwt()
  const result = await axios.post(config.SVARUT_SERVICE_URL, generatePayload(data))

  const location = result.headers.location
  const retryAfter = result.headers['retry-after'] || 10
  var status = result.status
  logger('info', ['post-data', data._id, 'location', location])
  logger('info', ['post-data', data._id, 'retry-after', retryAfter])

  var retryCount = 1
  var innerResult;
  while ((status !== 200 && status !== 500) && retryCount < 15) {
    if (status >= 400 && status <= 499) {
      logger('error', ['post-data', data._id, 'error from azf-svarut', status])
      throw innerResult
    }
    else if (retryCount > 1) {
      logger('info', ['post-data', data._id, 'waiting', retryAfter])
      await sleep(retryAfter)
    }
    
    innerResult = await axios.get(location)
    status = innerResult.status
    logger('info', ['post-data', data._id, 'retry', retryCount, status])
    retryCount++
  }

  if (innerResult && innerResult.data.customStatus && innerResult.data.customStatus === "Failed") {
    logger('warn', ['post-data', data._id, 'customStatus', innerResult.data.customStatus])
    throw innerResult
  }

  return innerResult
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-data', data._id, 'start'])

    try {
      const innerResult = await postAndWait(data)
      logger('info', ['post-data', data._id, 'response from azf-svarut', innerResult.data.customStatus])
      logger('info', ['post-data', data._id, 'finished'])
      data.response = innerResult.data
    } catch (error) {
      logger('error', ['post-data', data._id, error])
      data.retry = true
      data.errors.push(error)
    }

    resolve(data)
  })
}