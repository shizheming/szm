/* eslint-disable no-console */
/*
    运动
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的间断性和连续性（运动）函数本身调用的运动没有意义❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    概念：
    连着动
    占时不考虑间断性
*/
function motion (...fn) {
    return function (...args) {
        return fn.map(current => {
            return {
                name: current.name,
                back: current.apply(this, args)
            };
        });
    };
}
export default motion;