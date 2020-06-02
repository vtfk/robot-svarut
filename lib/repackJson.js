const formatDocument = document => {
    return {
      data: document.data,
      filnavn: document.fileName,
      mimeType: document.mimetype || 'application/pdf'
    }
}
  
const formatRecipient = recipient => {
    const reformat = {
      postAdresse: {
        navn: recipient.name || undefined,
        adresse1: recipient.address1 || undefined,
        adresse2: recipient.address2 || undefined,
        adresse3: recipient.address3 || undefined,
        postNummer: recipient.postalCode || undefined,
        postSted: recipient.postalCity || undefined,
        land: recipient.country || undefined
      },
      digitalAdresse: {}
    }
    if (recipient.type === 'privatPerson') {
      reformat.digitalAdresse.fodselsNummer = recipient.personalId || undefined
    } else {
      reformat.digitalAdresse.organisasjonsNummer = recipient.organizationId || undefined
    }
    return reformat
}
  
module.exports = data => {
  return {
    tittel: data.title || 'test dokument',
    mottaker: data.recipients.map(formatRecipient),
    avgivendeSystem: data.shipment.emittingSystem || undefined,
    konteringsKode: data.shipment.postingCode || undefined,
    krevNiva4Innlogging: data.shipment.level4login || false,
    kryptert: data.shipment.encrypted || false,
    kunDigitalLevering: data.shipment.digitalDelivery || false,
    dokumenter: data.documents.map(formatDocument),
    utskriftsKonfigurasjon: {
      utskriftMedFarger: data.printConfiguration.colorPrint || false,
      tosidig: data.printConfiguration.duplex || true
    }
  }
}
