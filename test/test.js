/* eslint-env node */

import assert from 'assert'
import sinon from 'sinon'
import log from '../lib/menna'

describe('menna', () => {
  const LOGGING_LEVELS = ['debug', 'info', 'warn', 'error']

  before(() => LOGGING_LEVELS.forEach(level => sinon.stub(log, level).returns(undefined)))

  function testLoggingLevel(level) {
    it(`in ${level} level`, () => {
      const message = `${level} message`
      log[level](message)
      assert(log[level].called)
      assert.equal(log[level].callCount, 1)
      assert.equal(log[level].getCall(0).args[0], message)
    })
  }

  describe('should log', () => LOGGING_LEVELS.forEach(testLoggingLevel))

  after(() => LOGGING_LEVELS.forEach(level => log[level].restore()))
})
