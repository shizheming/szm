/* 
    装饰
    我理解的就是附在对象上，对象动，他也动
    装饰也不是一种状态的改变么
    状态的改变是什么，我觉得就是变化不同的属性和方法，对象这个时候拥有这些属性和方法，那个时候拥有那些属性和方法，想起了迪迦奥特曼红色蓝色形态
*/
import motion from './motion';
function decorate () {
    return motion(arguments[0], arguments[1]);
}


export default decorate;