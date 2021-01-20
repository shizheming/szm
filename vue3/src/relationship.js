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
/* const input = [
  {
    name: "input1",
    condition: "aa",
    state: "show",
    fn: "a",
  },
  {
    condition: "bb",
    state: "hide",
    fn: "b",
  },
  {
    condition: "cc",
    state: "able",
    fn: "c",
  },
  {
    condition: "dd",
    state: "disabled",
    fn: "d",
  },
]; */

let ssss = [
  {
    be: "linkage",
    name: "a",
    relationship: [
      {
        be: "judge",
        name: "b",
        relationship: [
          {
            be: "state",
            component: "input",
            name: "inputState",
            relationship: [
              {
                state: "show",
                relationship: {
                  be: "judge",
                  name: "j",
                  relationship: [
                    {
                      name: "d",
                    },
                    {
                      name: "e",
                    },
                  ],
                },
              },
              {
                state: "hide",
                relationship: {
                  be: "linkage",
                  name: "f",
                  relationship: "d",
                },
              },
              {
                state: "able",
              },
              {
                state: "disabled",
              },
            ],
          },
          {
            name: "h",
          },
        ],
      },
      {
        name: "i",
      },
    ],
  },
];

// 如果没写就拿父级的be
let hhhhhh = [
  {
    be: "linkage",
    name: "a",
    relationship: [
      {
        be: "judge",
        name: "b",
        relationship: [
          {
            name: "c",
          },
          {
            name: "d",
          },
        ],
      },
      {
        be: "linkage",
        name: "e",
        relationship: {
          be: "judge",
          name: "f",
          relationship: [
            {
              name: "g",
            },
            {
              name: "h",
            },
          ],
        },
      },
      {
        be: "linkage",
        name: "i",
        relationship: "j",
      },
    ],
  },
];

let fnObj = {
  a() {
    console.log("a");
  },
  b() {
    console.log("b");
    return "inputState";
  },
  c() {
    console.log("c");
    return "e";
  },
  d(v) {
    console.log("d");
    return v;
  },
  e(v) {
    console.log("e");
    return ["f", v];
  },
  f(v) {
    console.log("f");
    return "g";
  },
  g() {
    console.log("g");
  },
  h() {
    console.log("h");
  },
  i() {
    console.log("i");
  },
  j() {
    console.log("j");
    return "e";
  },
  input(data) {
    console.log(data, 20);
    return <input />;
  },
  inputState() {
    console.log(1999);
    return "hide";
  },
};

import { isPlainObject, isArray, isString } from "lodash";

// 联动
const simpleLinkage = function(relationshipTable, obj, args) {
  const { relationship } = relationshipTable;

  const result = arrFn(obj[relationshipTable.name](args));

  if (isString(relationship)) {
    // 说明已经到底了
    obj[relationship]();
  } else if (isPlainObject(relationship)) {
    // 是对象说明是唯一得一条路往下联系
    addBe(relationship, relationshipTable);
    r(relationship, obj);
  } else if (isArray(relationship)) {
    // 是数组说明是分岔路
    relationship.forEach((item) => {
      addBe(item, relationshipTable);
      r(item, obj);
    });
  }
};

// 判断
const simpleStrategy = function(relationshipTable, obj, args) {
  const { relationship } = relationshipTable;

  args = arrFn(obj[relationshipTable.name](args));
  if (isPlainObject(relationship)) {
    // 是对象说明是唯一得一条路往下联系
    addBe(relationship, relationshipTable);
    r(relationship, obj);
  } else if (isArray(relationship)) {
    const firstName = args.shift();
    // 是数组说明是分岔路
    const findObj = relationship.filter(({ name }) => name === firstName);
    findObj.forEach((item) => {
      addBe(item, relationshipTable);
      r(item, obj);
    });
  }
};

// 状态
const simpleState = function(relationshipTable, obj, args) {
  const { relationship } = relationshipTable;
  // 状态判断函数
  const result = obj[relationshipTable.name]();
  const [state] = relationship.filter(({ state }) => state === result);
// 渲染组件
  obj[relationshipTable.component](displayState(state.state));
  r(state.relationship ? state.relationship : {}, obj);
};

// 合体
export const bing = function(table, obj) {
  table.forEach((current) => {
    r(current, obj);
  });
};

function r(current, obj) {
  let result;

  if (current.be === "linkage") {
    result = simpleLinkage(current, obj);
  } else if (current.be === "judge") {
    result = simpleStrategy(current, obj);
  } else if (current.be === "state") {
    result = simpleState(current, obj);
  }
}

// 没有写be就给他加上父级的be
const addBe = function(current, parent) {
  if (!current.be) current.be = parent.be;
};
const arrFn = function(v) {
  return isArray(v) ? v : [v];
};

// 显示哪种状态
const displayState = function (state) {
  return ({
    show:true,
    hide:false,
    able:true,
    disabled:false
  })[state]
}

bing(ssss, fnObj);
