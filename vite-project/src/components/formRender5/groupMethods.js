import {cloneDeep, isFunction} from 'lodash';
/* 
group:{
  show
  required
  disabled
}
 */
export default {
  // 可编辑组
  groupAble (name) {
    this.groups[name].forEach(value => {
      this.able(value);
    });
  },
  // 不可编辑组
  groupDisabled (name) {
    this.groups[name].forEach(value => {
      this.disabled(value);
    });
  },
  // 显示组
  groupShow (name) {
    this.groups[name].forEach(value => {
      // 组显示之前有个问题就是，我一下子设显示是不对的，因为里面有些需要2次判断，就像平鲁的话，if里面还有判断一样
      let {_isShow} = this.findComponent(value);

      if (isFunction(_isShow)) {
        if (!_isShow.call(this.obj)) return;
      }
      this.show(value);
    });
  },
  // 隐藏组
  groupHide (name) {
    this.groups[name].forEach(value => {
      this.hide(value);
    });
  },
  // 必填组
  groupRequired (name) {
    this.groups[name].forEach(value => {
      this.required(value);
    });
  },
  // 非必填组
  groupNoRequired (name) {
    this.groups[name].forEach(value => {
      this.noRequired(value);
    });
  }
};