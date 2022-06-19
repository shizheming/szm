import {without, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, curry, isBoolean} from 'lodash';
import {recursive} from 'hypnos-szm';
import {recursion} from './tool';
export default {
  // 调用group
  runGroup() {
    this.groupSource.forEach((current) => {
      let {_isShow, content} = current;

      if (!isFunction(_isShow)) return;
      let result = _isShow.call(this.obj);

      current.isShow = !!result;
      // 显示或隐藏
      // 给组件打上组显示的标记
      content.key.forEach(key => {
        this.findComponent(key).isGroupShow = !!result;
      });
    });
    
    let groupChange = [];
    // 比对下组的显示隐藏有没有变化

    this.cloneGroupSource.forEach((current, index) => {
      // 这个说明这个组是从隐藏的状态变成显示的状态，所以要调用初始化这个显示组的异步函数
      if (current.isShow === false && this.groupSource[index].isShow === true) {
        groupChange.push(this.groupSource[index].content.key);
      }
    });
    // 保存上一步的组显示状态
    this.groupSource.forEach((current, index) => {
      if (this.cloneGroupSource[index]) {
        this.cloneGroupSource[index].isShow = current.isShow;
      } else {
        this.cloneGroupSource[index] = {
          isShow: current.isShow
        };
      }
    });
    if (groupChange.length === 0) return;
    // 组变了要重新触发下异步
    this.runAsync(true, groupChange.flat());
  },
};