import {attempt, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction} from 'lodash';
import {recursion, getLevelValue} from './tool';

export default {
  // 调用异步
  runAsync(isNoOnce, part) {
    // 局部更新异步
    if (part) {
      part.forEach(value => {
        let obj = this.findComponent(value);

        this.runAsyncState(obj);
        this.triggerShowRunAsync(obj);
      });
      return;
    }
    this.source.map((current) => {
      let {
        isShow,
        _isShow,
        content,
        isGroupShow
      } = current;

      // 把不显示的过滤调，包括group
      // 如果是整个组有变化了，应该把不属于任何组的组件过滤掉，值变化组
      if (isGroupShow === false) return;
      // 排除第一次created时候的
      if (isNoOnce) {
        if (isGroupShow === undefined) return;
      }
      // 调用显示隐藏
      if (isFunction(_isShow)) {
        if (!_isShow.call(this.obj)) return;
      } else {
        if (!isShow) return;
      }
      // 调用异步
      this.runAsyncState(current);
    });
  },
  // 当前组件异步调用
  runAsyncState(current) {
    recursion(current, null, null, (value, key, obj) => {
      if (key[0] === '_') {
        // 有触发条件跳过，同时触发条件里面有true
        let triggerValue = obj[`${key}Trigger`];
        
        if (triggerValue) {
          if (!(isArray(triggerValue) && triggerValue.includes(true))) {
            return;
          }
        };
        /* if (triggerValue && ) {
          return;
        }; */
        if (isFunction(value)) {
        // 是函数
          let result = value.call(this.obj);

          if (isFunction(result)) {
            // babel造的孽
            if (/return step/.test(result.toString()) || /return new .*?default/.test(result.toString())) {
              // async函数
              result.call(this.obj).then(data => {
                obj[key.slice(1)] = data;
                // 这个必须要写
                this.$forceUpdate();
              });
            }
          }
        }
      }
    });
  },
  // 触发条件或是异步调用同步调用
  triggerShowRunAsync(current) {
    let key = current.content.key;
    let currentValue = getLevelValue(key, this.formData);
    let prevValue = getLevelValue(key, this.cloneFormData);
    
    // 当前设置的值和上一次的值一样，说明没变化，就不用调用异步函数
    // 排除第一次，都是undefined的情况
    // 这里为什么要排除第一次？？？？？？？
    // if (this.isOnce !== true) {
    if (currentValue === prevValue) return;
    // }
    // 这里保存上一次的值
    this.setProxyCloneFormData(key, currentValue);
    this.source.forEach(current => {
      let {isGroupShow, isShow, content} = current;
      let currentKey = content.key;

      // 这里也要过滤隐藏的，应为我是循环this.source的，原数据有隐藏的，也有显示的
      if (isGroupShow === false || isShow === false) return;
      recursion(current, null, null, (value, k, obj) => {
        if (k[0] === '_') {
          let triggerValue = obj[`${k}Trigger`];
          
          // 有触发函数才运行
          if (!triggerValue) return;
          // 是函数，同时有触发条件，同时排除自己
          if (isFunction(value) && triggerValue && key !== currentKey) {
            let result = value.call(this.obj);
            let originalKey = k.slice(1);

            // 异步函数
            if (isFunction(result)) {
              // 异步的触发事件运行
              if (isString(triggerValue) || isArray(triggerValue) || isPlainObject(triggerValue)) {
                let arr = triggerValue;

                if (isString(triggerValue)) arr = [triggerValue];
                if (isPlainObject(triggerValue)) arr = [triggerValue];
                // 当前变化的key和触发值的key一样就运行触发函数
                arr.forEach((item, k) => {
                  if (isString(item)) {
                    if (key === item) {
                      result.call(this.obj).then(data => {
                        obj[originalKey] = data;
                        this.$forceUpdate();
                      });
                    }
                  } else if (isPlainObject(item)) {
                    // 有数据变化触发，又有触发的自定义条件
                    forEach(item, (v, k) => {
                      if ((key === k) && v.call(this.obj)) {
                        result.call(this.obj).then(data => {
                          obj[originalKey] = data;
                          this.$forceUpdate();
                        });
                      }
                    });
                  } else if (isFunction(item)) {
                    if ((key === item.name) && item.call(this.obj)) {
                      result.call(this.obj).then(data => {
                        obj[originalKey] = data;
                        this.$forceUpdate();
                      });
                    } else if (!item.name && item.call(this.obj)) {
                      // 说明是匿名函数，说明要全局调
                      result.call(this.obj).then(data => {
                        obj[originalKey] = data;
                        this.$forceUpdate();
                      });
                    }
                  }
                });
              } else if (isFunction(triggerValue)) {
                if (triggerValue.call(this.obj)) {
                  result.call(this.obj).then(data => {
                    obj[originalKey] = data;
                    this.$forceUpdate();
                  });
                }
              }
            } else {
              // 同步的触发事件运行
              if (isString(triggerValue) || isArray(triggerValue) || isPlainObject(triggerValue)) {
                let arr = triggerValue;

                if (isString(triggerValue)) arr = [triggerValue];
                if (isPlainObject(triggerValue)) arr = [triggerValue];
                // 当前变化的key和触发值的key一样就运行触发函数
                arr.forEach(item => {
                  if (isString(item)) {
                    if (key === item) {
                      obj[originalKey] = result;
                    }
                  } else if (isPlainObject(item)) {
                    forEach(item, (v, k) => {
                      if (key === k && v.call(this.obj)) {
                        obj[originalKey] = result;
                      }
                    });
                  } else if (isFunction(item)) {
                    if ((key === item.name) && item.call(this.obj)) {
                      obj[originalKey] = result;
                    } else if (!item.name && item.call(this.obj)) {
                      obj[originalKey] = result;
                    }
                  }
                });
              } else if (isFunction(triggerValue)) {
                if (triggerValue.call(this.obj)) {
                  obj[originalKey] = result;
                }
              }
            }
          }
        }
      });
    });
  },
  // proxy设置cloneFormData的值
  setProxyCloneFormData(key, value) {
    let arr = key.split('.');

    // 一级
    if (arr.length === 1) {
      this.setFormValue(value, key, this.cloneFormData);
    } else if (arr.length > 1) {
      // 多级
      let itemValue = this.cloneFormData;

      arr.forEach((current, index) => {
        if (index < arr.length - 1) {
          itemValue = itemValue[current];
        }
      });
      this.setFormValue(value, last(arr), itemValue);
    }
  },
  // 组件显示触发自己得异步，同步已经触发了，加上异步就好了
  componentShowAsync (current) {
    let {lastIsShow, nowIsShow} = current;

    if ((lastIsShow === false) && (nowIsShow === true)) {
      this.runAsyncState(current);
    }
  },
  // 调用同步的状态
  runLineState (current) {
    recursion(current, null, null, (value, key, obj) => {
      if (key[0] === '_') {
        // 有触发条件跳过，
        if (obj[`${key}Trigger`]) return;
        let [, attrKey] = key.split(/\b_/);

        if (isPlainObject(value)) {
          // 是对象
          let attrKeyValue = value[obj[attrKey]];
          
          if (isFunction(attrKeyValue)) {
            // 排除异步函数，异步单独在外面处理
            let result = attrKeyValue.call(this.obj);
  
            if (!isFunction(result)) obj[attrKey] = result;
          } else {
            value[obj[attrKey]] && (obj[attrKey] = value[obj[attrKey]]);
          }
        } else if (isFunction(value)) {
          // 是函数
          // 排除异步函数，异步单独在外面处理
          let result = value.call(this.obj);
          
          if (!isFunction(result)) {
            obj[attrKey] = result;
          } else if (isFunction(result)) {
            // babel造的孽,前面时开发环境,后面时测试环境
            if (!/return step/.test(result.toString()) && !/return new .*?default/.test(result.toString())) {
              // 返回的是普通函数
              obj[attrKey] = result;
            }
          }
        }
      }
    });
  },
};