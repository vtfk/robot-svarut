module.exports = forsendelse => {
  if (forsendelse.message && forsendelse.message === 'Forsendelse med samme mottaker, tittel, avsender og filer er forsøkt sendt tidligere') return true
  else if (forsendelse.id && Object.keys(forsendelse).length === 1) return true
  return false
}
