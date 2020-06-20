const _ = {};

// 包含
_.includes = function (collection, value) {
    if (_.isObject(collection)) collection = _.values(collection);
    return collection.includes(value);
};

export default _;