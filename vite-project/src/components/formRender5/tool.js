import {keys as ObjKeys, identity, isSymbol, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, isNumber} from 'lodash';
import {recursive} from 'hypnos-szm';
import state from './state';

// 找真正绑定提交的key
export const findKey = function (key, sourceKeys, typeName) {
  let newKey = key.split('_');
  
  newKey = difference(newKey, [typeName]).join('_');
  let originalKey;
  
  if (!newKey) return;
  sourceKeys.some(current => {
    let rx = new RegExp(`${newKey}\\b`);

    if (rx.test(current)) {
      originalKey = current;
      return true;
    }
  });
  return originalKey;
};

// 把xxx.xxx.xxx变成{xxx:{xxx:xxx:undefined}}的函数
export const createLevel = function (sourceKeys, obj = {}, father) {
  sourceKeys.forEach(current => {
    let arr = current.split('.');

    // 1层
    if (arr.length === 1) {
      obj[current] = undefined;
    } else if (arr.length === 2) {
      // 2层
      obj[arr[0]] = Object.assign(
        obj[arr[0]] ? obj[arr[0]] : {},
        {[arr[1]]: undefined}
      );
      // 把当前的key的上层加上，主要看的清楚当前key是从哪个层级下来的
      if (father) {
        obj[arr[0]][`old_${father}.${current}`] = current;
      } else {
        obj[arr[0]][`old_${current}`] = current;
      }
    } else {
      // 多级
      let newKeys = arr.splice(1).join('.');

      obj[arr[0]] = obj[arr[0]] ? obj[arr[0]] : {};
      createLevel([newKeys], obj[arr[0]], father ? `${father}.${arr[0]}` : arr[0]);
    }
  });
  return obj;
};

// 找到要设置值的是哪个对象
export const getFootObj = function (originalKey, formData) {
  let arr = originalKey.split('.');
  let obj = formData;

  arr.pop();
  arr.forEach(current => {
    obj = obj[current];
  });
  return obj;
};

// 没有用包里得，因为我要知道层级关系，问题在于如果是私有属性的话要过滤，所以加了个father属性来判断是不是私有属性
export function recursion (collection, baseCallback, objectCallback, allCallback) {
  forEach(collection, function (currentValue, key, collection) {
    isFunction(allCallback) && allCallback(currentValue, key, collection);
    if (isArray(currentValue)) {
      isFunction(objectCallback) && objectCallback(currentValue, key, collection);
      recursion(
        currentValue,
        baseCallback,
        objectCallback,
        allCallback
      );
    } else if (isPlainObject(currentValue)) {
      isFunction(objectCallback) && objectCallback(currentValue, key, collection);

      recursion(
        currentValue,
        baseCallback,
        objectCallback,
        allCallback
      );
    } else {
      // 基础值的时候一个断点回调
      isFunction(baseCallback) && baseCallback(currentValue, key, collection);
    }
  });
};

// 添加父亲字段
export const addFather = function (collection) {
  forEach(collection, function (currentValue, key) {
    if (isArray(currentValue)) {
      addFather(currentValue);
    } else if (isPlainObject(currentValue)) {
      // 对象值的时候一个断点回调
      currentValue.father = key;
      addFather(currentValue);
    }
  });
};

// 删除father字段
export const delFather = function (collection) {
  forEach(collection, function (currentValue, key) {
    if (isArray(currentValue)) {
      addFather(currentValue);
    } else if (isPlainObject(currentValue)) {
      // 对象值的时候一个断点回调
      delete currentValue.father;
      addFather(currentValue);
    }
  });
};

// 转换成函数
export const toFun = function (value) {
  return isFunction(value) ? value : function () {
    return value;
  };
};

export const isPromise = function (fn) {
  return Object.prototype.toString.call(fn) === '[object Promise]';
};

export const isAsync = function (fn) {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};

// 在rules里面删除father，antd验证表现异常，同时绑定this指向
export const forEachRules = function (obj, that) {
  if (isPlainObject(obj)) {
    let newObj = {...obj};

    if (newObj.validator) {
      newObj.validator = newObj.validator.bind(that);
    }
    delete newObj.father;
    return newObj;
  } else if (isArray(obj)) {
    return obj.map(current => {
      let newCurrent = {...current};

      if (newCurrent.validator) {
        newCurrent.validator = newCurrent.validator.bind(that);
      }
      delete newCurrent.father;
      return newCurrent;
    });
  }
};

// 多级邦值
export const getLevelValue = function (key, form) {
  let arr = key.split('.');

  if (arr.length === 1) {
    return form[key];
  } else {
    let v = form;
    let b;

    arr.forEach(current => {
      b = v[current];
      v = b;
    });

    return b;
  }
};

// 删除old和不显示组件的key
export const deleteHideComponentData = function (formData, source) {
  let cloneFormData = cloneDeep(formData);

  source.forEach((current) => {
    let {
      isShow,
      _isShow,
      content,
      isGroupShow
    } = current;
    
    // 删除不显示的组，删除不显示的组件
    if (isGroupShow === false || isShow === false) {
      recursive(cloneFormData, (value, formDataKey, obj) => {
        if (content.key === formDataKey) {
          // 在第一层，应为第一层我没写old的key
          delete obj[formDataKey];
        } else if (`old_${content.key}` in obj) {
          let fkrx = new RegExp(`${formDataKey}$`);
          
          // 里面的层级
          if (fkrx.test(content.key)) {
            delete obj[formDataKey];
          }
        }
      });
      return;
    };
  });
  // 删除所有的old
  recursive(cloneFormData, (value, formDataKey, obj) => {
    if (/^old_/.test(formDataKey)) {
      delete obj[formDataKey];
    }
  });
  return cloneFormData;
};
