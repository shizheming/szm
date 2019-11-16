/*
    组合
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数之间的组合关系❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    
*/

import motion from './motion';
function compose () {
    return motion.apply(null, arguments);
}
export default compose;
