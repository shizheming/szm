import {recursive} from 'hypnos-szm';
import {isString, isArray, concat} from 'lodash';
export default {
  findValue (name) {
    let [item] = this.source.filter(current => {
      let {content: {value}} = current;

      return value === name;
    });

    return item || {};
  },
  // 显示
  show (value) {
    this.findValue(value).isShow = true;
  },
  // 隐藏
  hide (value) {
    this.findValue(value).isShow = false;
  },
  // 切换显示隐藏
  toggleEye (value) {
    let isShow = this.findValue(value).isShow;

    this.findValue(value).isShow = !isShow;
  },
  // 能选能填
  able (value) {
    this.findValue(value).content.props.disabled = false;
  },
  // 不能选不能填
  disabled (value) {
    this.findValue(value).content.props.disabled = true;
  },
  // 切换能不能选，能不能填
  toggleAble (value) {
    let isDisabled = this.findValue(value).content.props.disabled;

    this.findValue(value).content.props.disabled = !isDisabled;
  },
  // 修改options内容
  setOptions (value, options) {
    this.findValue(value).content.props.options = options;
  },
  // 显示组
  groupShow (name) {
    let arr = [];

    recursive(this.group, null, (value, key, collection) => {
      if (key === name) {
        recursive(value, (v, k, c) => {
          arr.push(v);
        }, (v, k, c) => {
          arr.push(k);
        });
      }
    });
    arr.forEach(value => {
      this.show(value);
    });
  },
  // 隐藏组
  groupHide (name) {
    let arr = [];

    recursive(this.group, null, (value, key, collection) => {
      if (key === name) {
        recursive(value, (v, k, c) => {
          arr.push(v);
        }, (v, k, c) => {
          if (isArray(v)) {
            arr = arr.concat(v);
          } else {
            arr.push(k);
          }
        });
      }
    });
    arr.forEach(value => {
      this.hide(value);
    });
  },
  // 修改lab
  setLabName (value, labName) {
    this.findValue(value).label.props.label = labName;
  }
};