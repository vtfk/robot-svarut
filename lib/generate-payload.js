'use strict'

module.exports = data => {
  return {
    tittel: data.tittel,
    dokumenter: data.documents.map(document => Object.assign({filsti: document.file.data, filnavn: document.file.title, mimetype: 'application/pdf'})),
    forsendelse: data.forsendelse,
    mottaker: data.recipients,
    printkonfigurasjon: data.printkonfigurasjon
  }
}
