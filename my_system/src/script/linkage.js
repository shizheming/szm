/*
    联动
    由运动提炼出来
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的联动，单一的没有联动的概念❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
*/
import motion from './motion';
function linkage () {
    return motion.apply(null, arguments);
}
export default linkage;