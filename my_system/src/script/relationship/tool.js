import {isArray, forEach} from 'lodash';
import {linkage} from './simpleLinkage';
import {simpleStrategy} from './simpleStrategy';
import {simpleState} from './simpleState';

// 如果数据中没有写be是什么就拿他父级的be，同时要判断下面有没有realtionship，如果没有就不要加了
// 我觉得以后最理想的状态就是不要写be，想怎么写就怎么写，不用记住这个be是什么，而是看结构就能知道，这块数据在干嘛

export function addBe (current, parent) {
  if (!current.be) current.be = parent.be;
};

// 把入参统一成数组输出
export function toArr (v) {
  return isArray(v) ? v : [v];
};

export const render = function (current, args) {
  // 函数返回的参数
  let result = args;

  if (current.be === 'linkage') {
    result = linkage(current, result);
  } else if (current.be === 'judge') {
    result = simpleStrategy(current, result);
  } else if (current.be === 'state') {
    result = simpleState(current, result);
  }
  return result;
};