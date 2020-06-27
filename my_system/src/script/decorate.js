/*
    装饰
    我理解的就是附在对象上，对象动，他也动
    装饰也不是一种状态的改变么
    不是，装饰是外在的，状态是内在的
*/
import motion from './motion';
function decorate (...fn) {
    // 这里是装饰不是代理，所以arg参数不会被装饰函数拦截后再传给本体，
    return function (...args) {
        return motion(...fn.flat()).apply(this, args);
    };
}
export default decorate;