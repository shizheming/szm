// 判断
import {isPlainObject, isArray, isString, forEach, isFunction, isBoolean, last} from 'lodash';
import {toArr, addBe, render} from './tool';
import {relation} from './relationship';

export const simpleStrategy = function (data, args) {
  const methods = relation.getObj();
  const relationData = relation.getRelation();
  const {relationship, name} = data;

  // 跳出自身，说明name引用了外面的，还有一个问题是我跳出去了，怎么在跳进来，万一引用外面的name的里面还有relationship呢，那不是出问题了
  // 说明这个name有几种可能一种是另外一个组件的关系表，不在当前表的范围里面，第二种是什么都不是，写错了
  // 先就这样粗糙的判断下
  if (!isFunction(methods[name])) {
    methods.recursion = name;
    return; 
  }
  let result = methods[name](...args);
  // 判断结果只有一个，为什么我要把他变成数组呢？因为除了结果外，有可能还要返回其他参数用，所以是个数组，而数组的第一个就是判断结果
  const toArrResult = toArr(result);
  
  relationData[name] = result;

  if (isPlainObject(relationship)) {
    result = objectData(relationship, data, toArrResult);
  } else if (isArray(relationship)) {
    result = result = arrayData(relationship, data, toArrResult);
  }
  return toArr(result);
};

function objectData (relationship, parent, args) {
  // 是对象说明是唯一得一条路往下联系
  addBe(relationship, parent);
  return render(relationship, args);
}

function arrayData (relationship, parent, args) {
  let result = args;
  const firstName = [...args].shift();
  // 是数组说明是分岔路
  const obj = relationship.filter(({name}) => name === firstName);

  obj.forEach((item) => {
    addBe(item, parent);
    result = render(item, result);
  });
  return result;
}