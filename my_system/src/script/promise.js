class Promise2 {
    constructor (callback) {
        this.fullFn = () => {};

        const resolve = (result) => {
            this.fullFn(result);
        };

        callback(resolve);
    }

    then (callback) {
        console.log(99);
        return new Promise2(resolve => {
            this.fullFn = (result) => {
                const x = callback(result);

                console.log(4);
                if (x instanceof Promise2) {
                    console.log(51);
                    x.then(resolve);
                } else {
                    console.log(52);
                    resolve(x);
                }
            };
        });
    }
}

/* new Promise2((resolve, reject) => {
    console.log(0);
    setTimeout(() => {
        console.log(1);
        resolve(100);
    }, 1000);
}).then(result => {
    console.log(2);
    return new Promise2((resolve, reject) => {
        console.log(21);
        setTimeout(() => {
            console.log(22);
            resolve(result + 100);
        }, 3000);
    });
}).then(result => {
    console.log(3);
}); */

export const myPromise = function (callback) {
    let full = function () {};
    const resolve = function (value) {
        full(value);
    };

    callback(resolve);
    return {
        then (success) {
            return myPromise(function (resolve) {
                full = function (value) {
                    const r = success(value);

                    // eslint-disable-next-line no-prototype-builtins
                    if (typeof r === 'object' && r.hasOwnProperty('then')) {
                        console.log(typeof r, 999);
                        r.then(resolve);
                    } else {
                        resolve(r);
                    }
                };
            });
        }
    };
};