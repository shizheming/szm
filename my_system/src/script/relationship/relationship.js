/*
  逻辑可视化-概览
  以最基本的关系表为基础，把一些逻辑概念整合进去

    联动
    判条件断

    表单控件的状态
    感觉状态可以有很多状态，下面四种只是最基本的，还是要像组件一样可以配

    内置状态
    显示
    隐藏
    可编辑
    不可编辑

    添加全局数据

    联动清除信息
    初始信息（回显数据）

    遵循命名规则
    这也是认识事物的过程
    叫什么名字
    静态
    是什么====是什么根据空间地点的往外部扩展往上面添加形式，是一种从质料到形式的这么一个叠加的过程
    例如====一推数据（data）用在表单上（form_data）这里表单就是地点，然后表单放哪里，放弹框里（modal_form_data）当然还有名字，现在只是一般的通用的命名，如果够用就不需要名字了，因为名字是唯一的id，等到通用的不够用了，再加名字
    空间（静态）----时间（动态）
    ----什么地点----什么时间----什么状态

*/

/* 
优化
1比如某个组件显示隐藏，result上生成的是在另外一个组件触发的收生成的，所以当这个组件自己触发事件的时候，会自己连带的触发一下result里面显示隐藏状态，其实是不正确的，自己怎么可能触发自己显示隐藏呢

2我要解决下不停的在许多地方判断数据的类型来选择不同的路，比如是字符串，是函数，是对象，是数组
*/

import {isPlainObject, isArray, isString, forEach, isFunction, isBoolean, last} from 'lodash';
import {render} from './tool';
window.log = console.log;
// 合体
// 不能写静态数据，必须每次都是独立的，新的
// let relationData;

export function relation (data, obj, ...args) {
  getRelation({});
  getObj(obj);
  data.forEach((current) => {
    render(current, args);
  });
  return relation.getRelation();
};

// 使obj对象成为全局的，不用往下层层的传递
export function getObj (obj) {
  relation.getObj = function () {
    return obj;
  };
}

// 创建一个全局的relationData返回数据
export function getRelation (obj) {
  relation.getRelation = function () {
    return obj;
  };
}