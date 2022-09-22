const test = require('ava')
const sentAlready = require('../lib/is-sent-already')

test('OK when all 3 were sent this round', t => {
  const { output } = require('./data/svarutresponse/3-ok-this-round.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), false)
})

test('OK when all 3 were sent the previous round', t => {
  const { output } = require('./data/svarutresponse/3-ok.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), false)
})

test('OK when 2 were sent this round and the other the previous round', t => {
  const { output } = require('./data/svarutresponse/2-ok.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), false)
})

test('OK when 1 were sent this round and the other 2 the previous round', t => {
  const { output } = require('./data/svarutresponse/1-ok.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), false)
})

test('Fails when all 3 has failed to be sent by some other reason', t => {
  const { output } = require('./data/svarutresponse/3-failed.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), true)
})

test('Fails when 2 has failed to be sent by some other reason, and 1 were sent this round', t => {
  const { output } = require('./data/svarutresponse/2-failed.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), true)
})

test('Fails when 2 has failed to be sent by some other reason, and 1 were sent the previous round', t => {
  const { output } = require('./data/svarutresponse/2-failed-1-prev-ok.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), true)
})

test('Fails when 1 has failed to be sent by some other reason, and 2 were sent this round', t => {
  const { output } = require('./data/svarutresponse/1-failed.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), true)
})

test('Fails when 1 has failed to be sent by some other reason, and 2 were sent the previous round', t => {
  const { output } = require('./data/svarutresponse/1-failed-2-prev-ok.json')
  const result = output.map(sentAlready)
  t.is(result.includes(false), true)
})
