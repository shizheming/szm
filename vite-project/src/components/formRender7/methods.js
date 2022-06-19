import {isString, isArray, dropRight, isFunction, last, forEach, merge, cloneDeep, isObject} from 'lodash';
import {deleteHideComponentData, toArray, dataOutput, toObject, getLevelValue, recursion} from './tool';
// 这些都是对外方法
export default {
  // 通过key找到那坨组件的数据对象
  findComponent (name) {
    let [item] = this.source.filter(current => {
      let {content: {key}} = current;

      return key === name;
    });

    return item || {};
  },
  // 表单提交
  formSubmit (callback = function () {}) {
    console.log(this.formData, '验证通过前的formData');
    this.$refs.formComponent.validate(valid => {
      if (valid) {
        let data;
    
        // 出参数据处理
        // 处理outer函数
        data = dataOutput(this.formData, this.source, this);
        // 删除不显示的组件key
        data = deleteHideComponentData(data, this.source);
        // // 把类数组变成数组
        // 这里要递归调toArray
        data = toArray(data);
        console.log(data, '验证通过后的的数据');
        // callback是通过refs来调的
        callback(data);
        // submit是组件提供的属性
        this.submit(data);
      }
    });
  },
  echo(data) {
    // 先把数组变成对象
    recursion(data, undefined, (value, key, collection) => {
      if (isArray(value)) {
        collection[key] = toObject(value);
      }
    });
    let cloneFormData = cloneDeep(this.formData);

    this.source.forEach((current) => {
      this.setArrData(current, cloneFormData, data);
    });

    merge(this.formData, cloneFormData);
  },
  // 获取change事件
  getChange(key) {
    return this.findComponent(key).content.onChange;
  },
  setArrData(current, cloneFormData, data, descendantsName) {
    let {content: {key, keys, inner, onChange}} = current;

    if (descendantsName) {
      key = `${descendantsName}.${key}`;
    }
    let arrKey = key.split('.');
    let firstKey = dropRight(arrKey).join('.');

    // 合并数据
    merge(getLevelValue(firstKey, cloneFormData), isFunction(inner) ? inner.call(this, data) : getLevelValue(firstKey, data));
    // 添加加减
    if (/\.0/.test(key)) {
      forEach(getLevelValue(firstKey, cloneFormData), (v, i) => {
        if (i > 0) {
          this.addField(key, keys);
        }
      });
    }
    if (isArray(keys)) {
      // 看看嵌套的有没有数组
      keys.forEach(cur => {
        this.setArrData(this.findComponent(cur), cloneFormData, data, key);
      });
    }
    // 有onChange要调用
    if (onChange) {
      onChange.call(this, cloneFormData[firstKey]);
    }
  }
};