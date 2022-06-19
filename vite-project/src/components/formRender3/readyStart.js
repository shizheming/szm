import {isArray, cloneDeep, isPlainObject, clone, isFunction, identity, partition} from 'lodash';
import {recursive} from 'hypnos-szm';
let readyStart = {};

// 添加validator回调用于缓存数据

readyStart.addValidator = function (directives) {
  const [decorator] = directives.filter(({name}) => {
    return name === 'decorator';
  });

  // 占时不考虑一个form-item有多个decorator的情况
  if (!decorator) return;
  const [name, obj] = decorator.value;
  const validatorObj = {
    validator: (rule, value, callback) => {
      this.cacheData[name] = value;
      callback();
    }
  };

  if (isPlainObject(obj)) {
    if (isArray(obj.rules)) {
      obj.rules.push(validatorObj);
    } else {
      obj.rules = [validatorObj];
    }
  } else {
    decorator.value[1] = {
      rules: [validatorObj]
    };
  }
  return directives;
};

// 寻找decoratorName
readyStart.findDecoratorName = function ({value: {directives = []}}) {
  // 这里默认多个组合的组件多个decorator，比如从最小值到最大值的组件，配数据的时候有两个decorator，我不知道是哪个，先不管这个
  let key = directives.filter(item => item.name === 'decorator');

  key = key.length != 0 ? isArray(key[0].value) ? key[0].value[0] : '' : '';
  return key;
};

// 寻找详情页状态下的key
readyStart.findDetailKey = function ({value: {key}}) {
  return key;
};

// 用户配的数据默认值设置
readyStart.defaultSource = function (source, type) {
  let cloneSource = cloneDeep(source);
  // 原始传进来的组的配置数据
  let group = cloneSource.filter(({group}) => group);
  // 非组配置数据
  let newSource = cloneSource.filter(({group}) => !group);

  // 处理下group
  if (Object.keys(group).length) {
    // 先打平拿到里面得组件名
    let originalGroup = group[0].group;
    let newGroup = [];

    recursive(group[0].group, null, function (value, key) {
      isArray(value) && newGroup.push(value);
    });
    group = {
      newGroup: [...new Set(newGroup.flat())],
      originalGroup
    };
  } else group = {isShow: false};
  if (type !== 'detail') {
    newSource.forEach(current => {
      let {label, value} = current;
      let {props, directives} = value;

      current.label = isPlainObject(label) ? label : {};
      current.value = isPlainObject(value) ? value : {};
      current.value.props = isPlainObject(props) ? props : {};
      current.value.directives = isArray(directives) ? readyStart.addValidator(directives) : [];
      // 设置id方便寻找
      current.id = this.findDecoratorName(current);
    });
  } else {
    newSource.forEach(current => {
      current.label = isPlainObject(current.label) ? current.label : {};
      current.value = isPlainObject(current.value) ? current.value : {};
    });
  }
  return {
    newSource,
    group
  };
};

// 回显数据
readyStart.defaultAllDetail = function (originalData, init, type) {
  /*
            select的options的获取方式
            1.静态数据直接在source里面的（不用处理）
            2.接口获取
            3.非接口获取
        */
  return type !== 'detail' ? this.noDetailData(originalData, init) : this.detailData(originalData, init);
};

// 处理init传进来的数据
readyStart.defaultInit = function (init) {
  let cloneInit = clone(init);

  cloneInit = cloneInit.map(current => {
    return {
      api: isFunction(current.api) ? current.api : '',
      data: current.data ? current.data : '',
      fieldNames: isPlainObject(current.fieldNames) ? current.fieldNames : null,
      format: isFunction(current.format) ? current.format : identity,
      optionName: current.optionName ? current.optionName : undefined
    };
  });
  return cloneInit;
};

// 回显详情页数据
readyStart.detailData = function (originalData, init) {
  // 把数据分为请求和不请求的
  let partitionObj = partition(this.defaultInit(init), (v) => {
    return v.api;
  });

  let p = partitionObj[0].map(current => current.api(current.data));
  // 通过api来拿值

  return Promise.all(p).then(dataAll => {
    partitionObj[0].forEach((current, index) => {
      let d = current.format(dataAll[index].data, dataAll);
      let s = this.setDetail(originalData, d);

      this.setData(originalData, s);
    });
  });
};

// 回显search或form的数据内容，比如options的接口获取
readyStart.noDetailData = function (originalData, init) {
  // 把数据分为请求和不请求的
  let partitionObj = partition(this.defaultInit(init), (v) => {
    return v.api;
  });

  let p = partitionObj[0].map(current => current.api(current.data));
  // 通过api来拿值

  return Promise.all(p).then(dataAll => {
    partitionObj[0].forEach((current, index) => {
      let ajaxDate = current.format(dataAll[index].data);
      let {fieldNames} = current;

      fieldNames = !isPlainObject(fieldNames) ? [['label', 'label'], ['value', 'value']] : Object.entries(fieldNames);

      let okData = this.setNoDetail(originalData, ajaxDate, current.optionName, fieldNames);

      this.setData(originalData, okData);
    });
  });
};

// 详情页回显数据
readyStart.setDetail = function (data, ajaxDate) {
  let result = [];

  data.forEach(current => {
    let v = ajaxDate[current.value.key];

    // 处理key的层级
    let dot = current.value.key ? current.value.key.split('.') : [];
    let vv = dot.reduce((a, b) => {
      return a[b];
    }, ajaxDate);

    current.value.value = isFunction(current.value.customRender) ? current.value.customRender.bind(this)(v, vv, ajaxDate) : vv;
    result.push(current);
  });
  return result;
};

// 设置search或form的回显数据选项，比如options
// 这里只是显示options并不是编辑页的回显
readyStart.setNoDetail = function (data, ajaxDate, name = 'options', fieldNames) {
  return data.map(current => {
    let key = this.findDecoratorName(current);

    // 有配置options的名字
    // 没配置options的名字，默认options
    if (ajaxDate[key]) {
      current.value.props = {
        ...current.value.props,
        [name]: this.mapFieldNames(ajaxDate[key], fieldNames)
      };
    }
    return current;
  });
};

// init中处理fieldNames映射ajax返回的数据
readyStart.mapFieldNames = function (data, fieldNames) {
  // 判断ajax回来的数据是不是数组，一般作用于组件数据下拉数据
  return isArray(data)
    ? data.map(item => {
      let newItem = {};

      fieldNames.forEach(([k, v]) => {
        newItem[k] = item[v];
      });
      return newItem;
    })
    : {};
};

// 添加自定义事件
readyStart.addEvent = function (originalData, listeners, type) {
  listeners = Object.entries(listeners).map(current => {
    let exp = /[:]/;
    let s = current[0].split(exp);

    return [...s, current[1]];
  }).filter(current => {
    // 过滤事件名格式不对的
    return current.length === 3;
  });
  let findId = type === 'detail' ? this.findDetailKey : this.findDecoratorName;

  originalData.forEach(current => {
    let key = findId(current);
    // 寻找事件
    let l = listeners.filter(current => {
      return current[0] === key;
    });

    if (l.length !== 0) {
      this.setEvent(current.value, l[0], type);
    }
  });
};

readyStart.setEvent = function (item, [decoratorName, eventName, fn]) {
  let o = item.on || {};

  item.on = {
    ...o,
    [eventName]: fn
  };
};

// 绑定this指向vue
readyStart.bindThis = function (that) {
  readyStart.setData = readyStart.setData.bind(that);
  readyStart.setDetail = readyStart.setDetail.bind(that);
  readyStart.addValidator = readyStart.addValidator.bind(that);
  // 这里绑定为什么热更新的时候会掉导致报错
  // readyStart.addPredicate = readyStart.addPredicate.bind(that);
};

// 设置vue里data值
readyStart.setData = function (a, b) {
  this.$nextTick(() => {
    this.$set(a, b);
  });
};

export default readyStart;