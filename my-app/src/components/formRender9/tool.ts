import { forEach, last } from "lodash";
export function addTrigger(component) {
  let np = {};
  forEach(component.props, (value, key) => {
    np[`trigger${key[0].toUpperCase() + key.slice(1)}`] = {
      type: [Number, String, Array, Object, Boolean],
      default: undefined,
    };
  });
  return np;
}

// 多级设值
export const setLevelValue = function (key, value, formData) {
  let arr = key.split(".");

  // 一级
  if (arr.length === 1) {
    formData[key] = value;
  } else if (arr.length > 1) {
    // 多级
    let itemValue = formData;

    arr.forEach((current, index) => {
      if (index < arr.length - 1) {
        itemValue = itemValue[current];
      }
    });
    itemValue[last(arr)] = value;
  }
};

// 多级拿值
export const getLevelValue = function (key, form) {
  let arr = key.split(".");

  if (arr.length === 1) {
    return form[key];
  } else {
    let v = form;
    let b;

    arr.forEach((current) => {
      // 没有值就停掉，不然报错了
      if (v === undefined) return;
      b = v[current];
      v = b;
    });

    return b;
  }
};
