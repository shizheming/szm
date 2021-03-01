// 联动
import {isPlainObject, isArray, isString, forEach, isFunction, isBoolean, last} from 'lodash';
import {toArr, addBe, render} from './tool';
import {relation} from './relationship';

export const linkage = function (data, args) {
  const methods = relation.getObj();
  const relationData = relation.getRelation();
  const {relationship, name} = data;
  // 运行name的函数，同时返回结果
  let result = methods[name](...args);

  const toArrResult = toArr(result);

  // 在总数据上记录name函数返回的结果
  relationData[name] = result;

  if (isString(relationship)) {
    relationData[relationship] = stringData(relationship, result);
  } else if (isPlainObject(relationship)) {
    result = objectData(relationship, data, toArrResult);
  } else if (isArray(relationship)) {
    result = arrayData(relationship, data, toArrResult);
  }
  // 内部传递用户函数返回的结果都以数组形式
  return toArr(result);
};

function stringData (name, args) {
  const methods = relation.getObj();

  // 说明已经到底了
  return methods[name](args);
}

function objectData (relationship, parent, args) {
  // 是对象说明是唯一得一条路往下联系
  addBe(relationship, parent);
  return render(relationship, args);
}

function arrayData (relationship, parent, args) {
  // 是数组说明是分岔路
  let result = args;

  relationship.forEach(item => {
    addBe(item, parent);
    result = render(item, result);
  });
  return result;
}