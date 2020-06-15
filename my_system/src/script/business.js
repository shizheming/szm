/*
    业务层面的js
*/
import _ from './_';
import moment from 'moment';
// 处理时间戳和分，回显的时候，当后端接口返回后在promise外面包了一层来处理之间事情
// 都是被逼的，要是后端都愿意转，我何必再要干这件事情呢
function warpAPI (api) {
    _.forEach(api, function (value, key, c) {
        api[key] = function (data = {}) {
            return value(data).then(data => {
                // 这里是处理后端吐出来的数据
                _.recursive(data, function (value, key, collection) {
                    // 处理时间戳
                    // 有的情况下
                    if (/^\d{10}$/.test(value)) collection['time_' + key] = moment(Number(value + '000')).format('YYYY-MM-DD HH:mm:ss');
                    // 是0没有的情况下
                    if (value === 0) collection['time_' + key] = '';
                    // 处理分转元
                    if (_.isNumber(value)) collection['money_' + key] = _.accMul(value, 0.01);
                });
                return data;
            });
        };
    });
    return api;
}