import {keys as ObjKeys, identity, isSymbol, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, isNumber, split} from 'lodash';
import {recursive} from 'hypnos-szm';

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

// 把类数组变成数组
export const toArray = function (data) {
  // 处理数据，把类数组的对象变成数组
  forEach(data, (value, key) => {
    if (isPlainObject(value)) {
      let keys = Object.keys(value);
      let newArr = keys.filter((v) => {
        return isInteger(Number(v));
      });

      if (newArr.length) {
        if (newArr.length === keys.length) {
          data[key] = [];
          forEach(value, (v) => {
            data[key].push(v);
          });
        }
      }
    }
  });
  return data;
  // 深度处理类数组变数组，现在暂时不打开，因为用的频率不高
  /* recursive(this.formData, undefined, (value, key, collection) => {
    let arr = Object.keys(value);

    if (arr.every(current => isInteger(Number(current)))) {
      collection[key] = Object.values(value);
    }
  }); */
};

// 判断是不是promise
export const isPromise = function (fn) {
  return Object.prototype.toString.call(fn) === '[object Promise]';
};

// 判断是不是async
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
      // 没有值就停掉，不然报错了
      if (v === undefined) return;
      b = v[current];
      v = b;
    });

    return b;
  }
};

// 多级设值
export const setLevelValue = function (key, value, formData) {
  let arr = key.split('.');
    
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
      delete cloneFormData[content.key];

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
  forEach(cloneFormData, (value, key) => {
    if (key.includes('.')) {
      delete cloneFormData[key];
    }
  });
  return cloneFormData;
};

// 出参把配数据的outer应用到要提交的数据上
export const dataOutput = function (formData, source, userObj) {
  let cloneFormData = cloneDeep(formData);

  source.forEach((current) => {
    let {content: {key, outer}, isShow, isGroupShow} = current;
    
    if (isGroupShow === false || isShow === false) return;
    if (!isFunction(outer)) return;
    let lastKey = last(key.split('.'));
    let rx = new RegExp(`^old_${key}$`);

    if (isFunction(outer)) {
      let arrKey = key.split('.');
        
      setLevelValue(key, outer.call(userObj, getLevelValue(key, cloneFormData), cloneFormData), cloneFormData);
    }
  });
  return cloneFormData;
};

// renderDom渲染条件判断
export const someJudge = function (current, userObj) {
  let {
    isShow,
    _isShow,
    isGroupShow,
    content,
    nowIsShow
  } = current;

  // 如果是整个组有变化了，应该把不属于任何组的组件过滤掉，值变化组
  // 组都不显示的直接pass
  if (isGroupShow === false) return false;
  
  // 这个使用在组上面
  current.lastIsShow = current.nowIsShow;
  if (isFunction(_isShow)) {
    if (!_isShow.call(userObj)) {
      // 是函数的_isShow也记录下结果在isShow上面
      current.isShow = false;
      current.lastIsShow = false;
      current.nowIsShow = false;
      return false;
    } else {
      current.nowIsShow = true;
      current.isShow = true;
    }
  } else {
    if (!isShow) {
      // 记录下显示的状态用在组件从隐藏到显示的时候要调用自己的异步函数
      current.nowIsShow = false;
      current.lastIsShow = false;
      current.isShow = false;
      return false;
    } else {
      current.nowIsShow = true;
      current.isShow = true;
    }
  }
};

// 数组变成对象
export const toObject = function(arr) {
  let result = {};

  arr.forEach((current, index) => {
    result[index] = current;
  });
  return result;
};