'use strict'

module.exports = data => {
  return {
    tittel: data.tittel,
    dokumenter: data.documents,
    forsendelse: data.forsendelse,
    mottaker: data.recipients,
    printkonfigurasjon: data.printkonfigurasjon
  }
}
