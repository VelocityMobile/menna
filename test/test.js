import assert from 'assert';
import sinon from 'sinon';
import log from '../lib/menna';

describe('menna', () => {

  const loggingLevels = ['debug', 'info', 'warn', 'error'];

  before(() => {
    for (let level of loggingLevels) {
      sinon.stub(log, level).returns(void 0);
    }
  });    

  describe('should log', () => {

    for (let level of loggingLevels) {
      it(`in ${level} level`, () => {
        testLoggingLevel(level);
      });
    }

  });

  function testLoggingLevel(level) {
    let message = `${level} message`; 
    log[level](message);
    assert(log[level].called);
    assert.equal(log[level].callCount, 1);
    assert.equal(log[level].getCall(0).args[0], message);
  }

  after(() => {
    for (let level of loggingLevels) {
      log[level].restore();
    }
  });

});