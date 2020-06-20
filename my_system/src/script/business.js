/*
    业务层面的js
*/
import _ from 'lodash';
import moment from 'moment';
// 处理时间戳和分，回显的时候，当后端接口返回后在promise外面包了一层来处理之间事情
// 都是被逼的，要是后端都愿意转，我何必再要干这件事情呢
// 处理时间戳和分，回显的时候和提交的时候
function warpAPI (api) {
    _.forEach(api, function (value, key, c) {
        api[key] = function (data = {}) {
            // 这里是吐给后端的数据
            // 预处理
            if (data.format) {
                /*
                    {
                        format: {
                            time: ['a','b',{c:['leftTime','rightTime']}],
                            money: ['e','k']
                        }
                    }
                 */
                const {time = [], money = []} = data.format;

                time.forEach(current => {
                    if (!_.isObject(current)) data[current] = _.accMul(current.valueOf(), 0.001); else {
                        _.forEach(([left, right], key) => {
                            data[left] = _.accMul(data[key][0].valueOf(), 0.001);
                            data[right] = _.accMul(data[key][1].valueOf(), 0.001);
                        });
                    }
                });
                money.forEach(current => {
                    data[current] = _.accMul(current, 100);
                });
            }
            return value(data).then(data => {
                // 这里是处理后端吐出来的数据
                // 预处理
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