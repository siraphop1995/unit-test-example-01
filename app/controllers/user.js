function LoginController() {
  var userList;
  function loadUserList(users) {
    userList = users;
  }

  function isValidUserId(user) {
    return userList.indexOf(user) >= 0;
  }

  function isValidUserIdAsync(user, callback) {
    setTimeout(function() {
      callback(userList.indexOf(user) >= 0);
    }, 1);
  }

  function isAuthorizedPromise(user) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(userList.indexOf(user) >= 0);
      }, 10);
    });
  }

  function testTimeout() {
    setTimeout(function() {
      console.log('Why');
      return 'Timeout';
    }, 2000);
    return 'Exit';
  }

  function getHey(req, res) {
    res.send('Hey');
  }

  function getPromise(req, res) {

    return new Promise((resolve, reject) => {
      if(!req) {
          return reject({
              error: true
          });
      }
      setTimeout(() => {
          resolve({
              name1: 'value1',
              name2: 'value2',
          });
      }, 500);
  });
  }

  return {
    isValidUserId,
    isValidUserIdAsync,
    loadUserList,
    isAuthorizedPromise,
    testTimeout,
    getHey,
    getPromise
  };
}

module.exports = LoginController();
