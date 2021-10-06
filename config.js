'use strict'

require('dotenv').config()

module.exports = {
  CALLBACK_DIRECTORY_PATH: process.env.CALLBACK_DIRECTORY_PATH || 'test/directories/callback',
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/directories/done',
  ERRORS_DIRECTORY_PATH: process.env.ERRORS_DIRECTORY_PATH || 'test/directories/errors',
  QUEUE_DIRECTORY_PATH: process.env.QUEUE_DIRECTORY_PATH || 'test/directories/queue',
  RUNNING_DIRECTORY_PATH: process.env.RUNNING_DIRECTORY_PATH || 'test/directories/running',
  RETRY_DIRECTORY_PATH: process.env.RETRY_DIRECTORY_PATH || 'test/directories/retries',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SVARUT_SERVICE_URL: process.env.SVARUT_SERVICE_URL || 'https://service.svarut.no',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'status-robot',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345,
  OVERRIDE_RECIPIENTS: (process.env.OVERRIDE_RECIPIENTS && process.env.OVERRIDE_RECIPIENTS.toLowerCase() === 'true') || false,
  OVERRIDE_RECIPIENTS_ADDRESSES: (process.env.OVERRIDE_RECIPIENTS_ADDRESSES && process.env.OVERRIDE_RECIPIENTS_ADDRESSES.split(',')) || [],
  OVERRIDE_RECIPIENTS_OBJECT: {
    type: 'privatPerson',
    name: 'Chuck Norris',
    address1: 'Svend Foynsgt. 9',
    address2: '',
    address3: '',
    postalCode: '3126',
    postalCity: 'Tønsberg'
  }
}
