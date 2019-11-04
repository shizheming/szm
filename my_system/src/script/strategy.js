/* eslint-disable no-console */
import relationship from './relationship';
import _ from 'lodash';
import motion from './motion';

/* 
    策略
    在我看来js乃至人类语言本身有两条路，第一条不叉路，一个起点，一个终点，第二条分叉路，一个起点，分叉成n个终点，造成分叉的原因是判断语句，如果js没有判断一条路写到底会怎么样
    怎么把叉路合成一条路，把判断分装在里面

    目的就是把几根绳子凝成一根绳子

    逻辑没有分叉会很简单，一条路笔直走到底

    加入间断性和连续性来试试，我想把间断性和连续性写成能在任何方法都能随即插入使用的接口
*/

function strategy (r/* 关系表 */, m/* 间断性连续性参数 */) {
    var g = relationship(r);
    return function () {
        let result;
        g.some(current => {
            if (current[0].apply(null, [].slice.apply(arguments))) {
                result = current[1];
            }
        });
        if (_.isFunction(result)) {
            const args = [result];
            if (m) {
                args.push(m);
            }
            return motion.apply(null, args);
        }
    };
}

export default strategy;