import {attempt, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction} from 'lodash';
import {dict} from './groupMethods';

export default {
  // 运行各种状态，任何值变化的时候都会调用runState里面的所有方法，状态的变化以值的变化为依据
  runOnlyState (fnName, value, warpKey) {
    // 这里对拥有私有属性状态的变化的是没有效果的，因为设定的就是私有属性等级最高
    // 把组件的显示隐藏独立开来
    if (fnName === 'isShow') {
      let obj = this.findComponent(warpKey);

      if (obj.isShow === value) return;
      obj.isShow = value;
      this.$forceUpdate();
      return;
    }
    // 设的key必须配置表里面首先存在，不然我根本不知道要往哪里设，比如你要设placeholder，你先得有个placeholder得属性在那里
    // 找到对应的组件的那块配的数据
    let componentObj = this.findComponent(warpKey);
    let {label, content} = componentObj;
      
    forEach(componentObj, (componentObjValue, key) => {
      if (!isString(label)) {
        forEach(label, (v, k, collection) => {
          if ((k === fnName) && (typeof v === typeof componentObjValue)) {
            if (v === componentObjValue) return;
            collection[k] = value;
            this.$forceUpdate();
          }
        });
      }
      forEach(content, (v, k, collection) => {
        if ((k === fnName) && (typeof v === typeof componentObjValue)) {
          if (v === componentObjValue) return;
          collection[k] = value;
          this.$forceUpdate();
        }
      });
    });
  },
  runBatchState(key, value) {
    forEach(value, (v, k) => {
      this.runOnlyState(k, v, key);
    });
  },
};