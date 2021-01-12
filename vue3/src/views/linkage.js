/* eslint-disable no-console */
/*
    运动
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的间断性和连续性（运动）函数本身调用的运动没有意义❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    概念：
    连着动
    占时不考虑间断性
    参数是一个接着一个传递下去的，联动嘛
*/
import { onceState, relationship } from "hypnos-szm";
export const linkage = function(first, ...fn) {
  fn.push(() => {});
  const arrFn = onceState({
    a(c) {
      return c;
    },
    b(c) {
      return [c];
    },
  });

  return function(...args) {
    return fn.reduce(
      (a, b) => {
        const r = arrFn(a.back);

        return {
          name: a.f.name,
          back: a.f.apply(this, r),
          f: b,
        };
      },
      {
        name: undefined,
        back: args,
        f: first,
      }
    );
  };
};

export const linkageRelationship = function(relationshipTable, obj) {
  let table = relationship(relationshipTable);
  console.log(table, 29);
  let allFn = [];
  /* table.forEach((current) => {
    current.forEach((item) => {
      let arrStr = [];
      item.forEach((v) => {
        let s = v.split(".");
        if (s.length == 1) {
          arrStr.push(obj[v]);
        } else {
          let fn = findObjFn(obj[s[0]], v);
          arrStr.push(fn);
        }
      });
      console.log(arrStr,100)
      allFn.push(linkage(...arrStr));
    });
  }); */
  return allFn;
};

function findObjFn(o, str) {
  let father;
  let s = str.split(".");
  s.shift();
  s.forEach((current) => {
    father = o;
    o = o[current];
  });
  return o.bind(father);
}
