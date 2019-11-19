/* 
    装饰
    我理解的就是附在对象上，对象动，他也动
    装饰也不是一种状态的改变么
    不是，装饰是外在的，状态是内在的
*/
import motion from './motion';
function decorate () {
    return motion(arguments[0], arguments[1]);
}


export default decorate;