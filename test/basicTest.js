const mocha = require('mocha');
const expect = require('chai').expect;
const sinon = require('sinon');
const basicFile = require('../app/controllers/basic');

describe('Basic Testing', () => {
   let noop = () => {};
  describe('Basic', () => {
    it('should have method `basic`', () => {
      expect(basicFile).to.be.an('object');
      expect(typeof basicFile.basic).to.equal('function');
    });

    // You can add more basic Test Cases.
  });

  describe('Error Case', () => {
    it('should return Error message for empty param', () => {
      return basicFile.basic().then(noop, errorMessage => {
        expect('Failure').to.equal(errorMessage);
      });
    });

    // You can add more Error Cases.
  });

  describe('Success Case', () => {
    it('should return param with Hello for valid param', () => {
      return basicFile.basic('Success').then(successMessage => {
        expect('Success').to.equal(successMessage);
      }, noop);
    });

    // You can add more Success Cases.
  });
});

describe('Service', () => {
  let noop, label, payload, response, dbStub;

  before(() => {
    noop = () => {};
    label = 'emp';
    payload;
    response;
    dbStub;
  });

  beforeEach(() => {
    payload = {
      prop1: `value1-${label}`,
      prop2: `value2-${label}`
    };

    response = {
      name1: 'value1',
      name2: 'value2'
    };

    reject = {
      error: true
    };

    dbStub = sinon.stub(basicFile, 'getData').callsFake(() => {
      return Promise.resolve(response);
    });
  });

  afterEach(() => {
    dbStub.restore();
  });

  it('should return error response', () => {
    return basicFile
      .getResultData()
      .catch(err => {
        expect(err).to.deep.equal({
          error: true
        });
      });
  });

  it('should return success response', () => {
    return basicFile.getResultData(label).then(data => {
      expect(data).to.deep.equal(response);
    });
  });
});
