'use strict'

const format = require('./repackJson')

module.exports = data => {
  const pre = {
    title: data.title,
    documents: data.documents.map(document => Object.assign({ data: document.file.data, fileName: document.file.title, mimeType: 'application/pdf' })),
    shipment: data.shipment,
    recipients: data.recipients,
    printConfiguration: data.printConfiguration
  }

  return format(pre)
}
