'use strict'

const { logger } = require('@vtfk/logger')
const config = require('../../config')

module.exports = data => {
  return new Promise((resolve, reject) => {
    if (config.OVERRIDE_RECIPIENTS && config.OVERRIDE_RECIPIENTS_ADDRESSES.length > 0) {
      data.shipment.digitalDelivery = true
      data.recipients = config.OVERRIDE_RECIPIENTS_ADDRESSES.map(personalId => ({ ...config.OVERRIDE_RECIPIENTS_OBJECT, personalId }))
      logger('info', ['override-recipients', data._id, 'recipients overridden', config.OVERRIDE_RECIPIENTS_ADDRESSES.join(', ')])
    } else {
      logger('info', ['override-recipients', data._id, 'recipients untouched'])
    }
    resolve(data)
  })
}
