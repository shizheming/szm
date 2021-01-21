/*
  逻辑可视化-概览
  以最基本的关系表为基础，把一些逻辑概念整合进去
  现在有
    联动
    判条件断

    表单控件的状态
    1-显示
      1-1-可编辑
      1-2-不可编辑
    2-隐藏
*/
// 控件的状态几乎都是外部条件所决定的变化，很少有自己状态的变化，所以我先考虑前者

import { isPlainObject, isArray, isString } from "lodash";

// 联动
const simpleLinkage = function(relationshipTable, obj, args) {
  let lastResult;
  const { relationship } = relationshipTable;

  const result = arrFn(obj[relationshipTable.name](...args));

  if (isString(relationship)) {
    // 说明已经到底了
    lastResult = obj[relationship](...result);
  } else if (isPlainObject(relationship)) {
    // 是对象说明是唯一得一条路往下联系
    addBe(relationship, relationshipTable);
    lastResult = r(relationship, obj, result);
  } else if (isArray(relationship)) {
    let arrResult = result;
    // 是数组说明是分岔路
    relationship.forEach((item) => {
      addBe(item, relationshipTable);
      arrResult = r(item, obj, arrResult);
    });
    lastResult = arrResult;
  }
  console.log(lastResult,200)
  return arrFn(lastResult);
};

// 判断
const simpleStrategy = function(relationshipTable, obj, args) {
  let lastResult;
  const { relationship } = relationshipTable;

  let result = arrFn(obj[relationshipTable.name](...args));
  if (isPlainObject(relationship)) {
    // 是对象说明是唯一得一条路往下联系
    addBe(relationship, relationshipTable);
    lastResult = r(relationship, obj, result);
  } else if (isArray(relationship)) {
    let arrResult = result;
    const firstName = result.shift();
    // 是数组说明是分岔路
    const findObj = relationship.filter(({ name }) => name === firstName);
    findObj.forEach((item) => {
      addBe(item, relationshipTable);
      arrResult = r(item, obj, arrResult);
    });
    lastResult = arrResult;
  }
  console.log(lastResult,100)
  return arrFn(lastResult);
};

// 状态
const simpleState = function(relationshipTable, obj, args) {
  let lastResult;
  const { relationship } = relationshipTable;
  // 状态判断函数
  const result = arrFn(obj[relationshipTable.name](...args));
  const firstName = result.shift();
  const [state] = relationship.filter(({ state }) => state === firstName);
  // 渲染组件
  let dom = obj[relationshipTable.component](
    displayState(state.state, ...result)
  );
  lastResult = r(state.relationship ? state.relationship : {}, obj, [dom]);
  console.log(lastResult,300)
  return arrFn(lastResult);
};

// 合体
export const bing = function(table, obj, ...args) {
  let result = args;
  table.forEach((current) => {
    result = r(current, obj, result);
  });
  return result
};

function r(current, obj, args) {
  console.log(args,500,current)
  let result = args;


  if (current.be === "linkage") {
    result = simpleLinkage(current, obj, result);
  } else if (current.be === "judge") {
    result = simpleStrategy(current, obj, result);
  } else if (current.be === "state") {
    result = simpleState(current, obj, result);
  }
  console.log(result,400)
  return result;
}

// 没有写be就给他加上父级的be,同时要判断下面有没有realtionship，如果没有就不要加了
const addBe = function(current, parent) {
  if (!current.be&&current.relationship) current.be = parent.be;
};
const arrFn = function(v) {
  return isArray(v) ? v : [v];
};

// 显示哪种状态
const displayState = function(state) {
  return {
    show: "show",
    hide: "hide",
    able: "able",
    disabled: "disabled",
  }[state];
};
