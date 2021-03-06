const async = require('async');
const db = require('./basic');

function myAsyncParallel (callback) {
    async.parallel({
        first: db.userData.bind(null, 'first arg'),
        second: db.activityData.bind(null, 'second arg')
    }, callback);
}

module.exports = {
    myAsyncParallel,
};