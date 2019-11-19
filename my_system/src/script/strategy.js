/* eslint-disable no-console */
import relationship from './relationship';
import _ from 'lodash';
import __ from './_';
import motion from './motion';

/* 
    策略
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间变成条件头条件体一一对应的关系❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    
    在我看来js乃至人类语言本身有两条路，第一条不叉路，一个起点，一个终点，第二条分叉路，一个起点，分叉成n个终点，造成分叉的原因是判断语句，如果js没有判断一条路写到底会怎么样
    怎么把叉路合成一条路，把判断分装在里面

    目的就是把几根绳子凝成一根绳子

    逻辑没有分叉会很简单，一条路笔直走到底

    加入间断性和连续性来试试，我想把间断性和连续性写成能在任何方法都能随即插入使用的接口

    加入一对多,但是是或还是与呢,那就家伙是那个字符串解析
*/

function strategy (r/* 关系表 */, o/* with的this对象 */, m/* 间断性连续性参数 */) {
    // 把多对一变成一对多
    var newR = r.map(current => {
        return {
            m: current.y,
            y: current.m
        };
    });
    var g = relationship(newR).r;
    return function () {
        let y;
        let as = [].slice.apply(arguments);
        // 把rule加上去
        __.forEach(g, (value, key) => {
            r.forEach(current => {
                if (key === current.y.name && current.rule) {
                    value._rule = current.rule;
                }
            });
        });
        __.forEach(g, (value) => {
            if (value._rule) {
                o.as = as;
                let fn = new Function ('o',  `with(o){return ${value._rule.replace(/\(\)/g, '.apply(null,as)')}}`);
                if (fn(o)) {
                    y = value.m;
                }
            } else if (value.y.length === 1 && value.y[0].apply(null, as)) {
                y = value.m;
            }
        });
        
        if (_.isFunction(y)) {
            if (m) {
                const args = [];
                args.push(y, m);
                return motion.apply(null, args);
            } else {
                return y();
            }
        }
    };
}

export default strategy;