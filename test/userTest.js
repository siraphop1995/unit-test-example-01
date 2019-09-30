process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();
const sinon = require('sinon');

let User = require('../app/controllers/user');

describe('LoginController', function() {
  beforeEach('Setting up the userList', function() {
    User.loadUserList(['abc123', 'xyz321']);
  });

  describe('isValidUserId', function() {
    it('should return true if valid user id', function() {
      var isValid = User.isValidUserId('abc123');
      //assert.equal(isValid, true);
      expect(isValid).to.be.true;
    });

    it('should return false if invalid user id', function() {
      var isValid = User.isValidUserId('abc1234');
      //assert.equal(isValid, false);
      isValid.should.equal(false);
    });
  });

  describe('isValidUserIdAsync', function() {
    it('should return true if valid user id', function(done) {
      User.isValidUserIdAsync('abc123', function(isValid) {
        //assert.equal(isValid, true);
        isValid.should.equal(true);
        done();
      });
    });
  });

  describe('isAuthorizedPromise', function() {
    it('should return true if valid user id', function() {
      return User.isAuthorizedPromise('abc123').then(data => {
        expect(data).to.equal(true);
      });
    });
  });
});

describe('Promise + Sinon', () => {
  it('should send Hey', done => {
    let req = {};
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      send: sinon.spy()
    };

    const t = User.getHey(req, res);
    // let's see what we get on res.send
    // `res.send` called once
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.callCount).to.equal(1);
    // expect to get argument `bla` on first call
    expect(res.send.firstCall.args[0]).to.equal('Hey');
    expect(res.send.getCall(0).args[0]).to.equal('Hey');
    expect(res.send.args[0][0]).to.equal('Hey');
    done();
  });

  it('should wait for promise', () => {
    response = {
      name1: 'value1',
      name2: 'value2'
    };
    return User.getPromise()
      .then(data => {
        expect(data).to.deep.equal(response);
      })
      .catch(err => {
        expect(err).to.deep.equal({
          error: true
        });
      });
  });
});

describe('Fake promise', () => {
  let response, reject, dbStub;

  before(() => {
    noop = () => {};
    response;
    reject;
    dbStub;
  });

  beforeEach(() => {
    response = {
      name1: 'value1',
      name2: 'value2'
    };
    reject = {
      error: true
    };
  });

  afterEach(() => {
    dbStub.restore();
  });

  it('Call Fake should return resolve', () => {
    dbStub = sinon.stub(User, 'getPromise').callsFake(() => {
      return Promise.resolve(response);
    });

    return User.getPromise().then(data => {
      expect(data).to.deep.equal(response);
    });
  });

  it('Call Fake should return reject', () => {
    dbStub = sinon.stub(User, 'getPromise').callsFake(() => {
      return Promise.reject(reject);
    });

    return User.getPromise()
      .then(data => {})
      .catch(err => {
        expect(err).to.deep.equal({
          error: true
        });
      });
  });


  it('Sinon resolves should return resolve', () => {
    dbStub = sinon.stub(User, 'getPromise').resolves(response)

    return User.getPromise().then(data => {
      expect(data).to.deep.equal(response);
    });
  });

  it('Sinon rejects should return reject', () => {
    dbStub = sinon.stub(User, 'getPromise').rejects(reject)

    return User.getPromise()
      .then(data => {})
      .catch(err => {
        expect(err).to.deep.equal({
          error: true
        });
      });
  });
});
