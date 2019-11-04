import relationship from './relationship';

/* 
    策略
    在我看来js乃至人类语言本身有两条路，第一条不叉路，一个起点，一个终点，第二条分叉路，一个起点，分叉成n个终点，造成分叉的原因是判断语句，如果js没有判断一条路写到底会怎么样
    怎么把叉路合成一条路，把判断分装在里面

    目的就是把几根绳子凝成一根绳子

    逻辑没有分叉会很简单，一条路笔直走到底
*/

function strategy (r) {
    var g = relationship(r);
    console.log(g, 1);
}
export default strategy;