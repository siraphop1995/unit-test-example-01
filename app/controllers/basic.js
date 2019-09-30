function basic (result) {
    if (!result) {
        return Promise.reject('Failure');
    }

    return new Promise((resolve, reject) => {
        // Assume that this below data is retrieved from Database which takes 1.6 seconds.
        setTimeout(() => resolve(result), 100);
    });
}

function getResultData(name) {
    let payload;

    if (name) {
        payload = {
            prop1: `value1-${name}`,
            prop2: `value2-${name}`,
        };
    }

    return new Promise((resolve, reject) => {
        getData(payload).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        });
    });
}

function getData(payload) {
    return new Promise((resolve, reject) => {
        if(!payload) {
            return reject({
                error: true,
            });
        }

        setTimeout(() => {
            resolve({
                name1: 'value1',
                name2: 'value2',
            });
        }, 100);
    });
}




module.exports = {
    basic,
    getData,
    getResultData
};