'use strict'

const config = require('../../config')
const logger = require('../logger')

module.exports = data => {
    return new Promise((resolve, reject) => {
        if (config.OVERRIDE_RECIPIENTS && (config.OVERRIDE_RECIPIENTS === true || config.OVERRIDE_RECIPIENTS === 'true') && config.OVERRIDE_RECIPIENTS_ADDRESSES) {
            data.shipment.digitalDelivery = true
            data.recipients = config.OVERRIDE_RECIPIENTS_ADDRESSES.split(',').map(personalId => {
                return { ...config.OVERRIDE_RECIPIENTS_OBJECT, personalId }
            })
            logger('info', ['override-recipients', data._id, "recipients overridden", config.OVERRIDE_RECIPIENTS_ADDRESSES])
        }
        else {
            logger('info', ['override-recipients', data._id, "recipients untouched"])
        }
        resolve(data)
    })
}