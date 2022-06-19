import {without, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, curry, isBoolean} from 'lodash';
import {recursive} from 'hypnos-szm';
import {recursion} from './tool';
export default {
  // 调用group
  runGroup() {
    this.groupSource.forEach((current) => {
      let currentKey = Object.keys(current);
      let component = currentKey.filter(item => {
        return /^is.*Key$/.test(item);
      });
      let result = [];

      component.forEach(item => {
        let [itemKey] = item.split('Key');

        result.push(current[`_${itemKey}`]);
      });

      // 先处理显示隐藏
      result.forEach(item => {
        if (item.name !== '_isShow') return;
        let fnResult = item.call(this.obj);
        
        if (isBoolean(fnResult)) {
          if (fnResult) {
            // 给组件打上组显示的标记
            this.source.forEach(sourceItem => {
              let {content: {key: k}} = sourceItem;
              
              if (current.isShowKey.includes(k)) sourceItem.isGroupShow = true;
            });
          } else {
            // 给组件打上组显示的标记
            this.source.forEach(sourceItem => {
              let {content: {key: k}} = sourceItem;
  
              if (current.isShowKey.includes(k)) {
                sourceItem.isGroupShow = false;
              }
            });
          }
        } else if (isArray(fnResult)) {
          this.source.forEach(sourceItem => {
            let {content: {key: k}} = sourceItem;

            if (current.isShowKey.includes(k)) {
              if (fnResult.includes(k)) {
                sourceItem.isGroupShow = true;
              } else {
                sourceItem.isGroupShow = false;
              }
            }
          });
        }
      });
      // 在处理其他的
      result.forEach(item => {
        if (item.name === '_isShow') return;
        let fnResult = item.call(this.obj);
        
        if (isBoolean(fnResult)) {
          if (fnResult) {
            this.source.forEach(sourceItem => {
              let {content: {key: k}} = sourceItem;
              
              if (current.isShowKey.includes(k)) sourceItem.isGroupShow = true;
            });
          } else {
            this.source.forEach(sourceItem => {
              let {content: {key: k}} = sourceItem;
  
              if (current.isShowKey.includes(k)) {
                sourceItem.isGroupShow = false;
              }
            });
          }
        } else if (isArray(fnResult)) {
          this.source.forEach(sourceItem => {
            let {content: {key: k}} = sourceItem;
            let [, name] = item.name.split('_');
            let [, reallyName] = item.name.split('_is');

            reallyName = reallyName.toLocaleLowerCase();
            if (current[`${name}Key`].includes(k)) {
              recursive(sourceItem, (value, key, obj) => {
                if (key === reallyName) {
                  if (fnResult.includes(k)) {
                    if (sourceItem.isGroupShow) {
                      obj[key] = true;
                    }
                  } else {
                    if (sourceItem.isGroupShow) {
                      obj[key] = false;
                    }
                  }
                }
              });
            }
          });
        }
      });
    });
    
    let groupChange = [];
    // 比对下组的显示隐藏有没有变化

    this.cloneGroupSource.forEach((current, index) => {
      // 这个说明这个组是从隐藏的状态变成显示的状态，所以要调用初始化这个显示组的异步函数
      if (current.isShow === false && this.groupSource[index].isShow === true) {
        groupChange.push(this.groupSource[index].key);
      }
    });
    // 保存上一步的组显示状态
    /* this.groupSource.forEach((current, index) => {
      if (this.cloneGroupSource[index]) {
        this.cloneGroupSource[index].isShow = current.isShow;
      } else {
        this.cloneGroupSource[index] = {
          isShow: current.isShow
        };
      }
    }); */
    if (groupChange.length === 0) return;
    // 组变了要重新触发下异步
    this.runAsync(true);
  },
};