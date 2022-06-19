import {recursive} from 'hypnos-szm';
import {isString, isArray, isInteger, isFunction, last} from 'lodash';
import {deleteHideComponentData} from './tool';
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
  // 处理数据，把类数组的对象变成数组
    recursive(this.formData, undefined, (value, key, collection) => {
      let arr = Object.keys(value);

      if (arr.every(current => isInteger(Number(current)))) {
        collection[key] = Object.values(value);
      }
    });
    // 出参数据处理
    // 处理outer函数
    let data = this.dataOutput();
    
    // 删除不显示的组件key和old的key
    data = deleteHideComponentData(data, this.source);
    console.log(this.formData, '原始的数据');
    console.log(data, '提交的数据');
    this.$refs.formComponent.validate(valid => {
      if (valid) {
        // callback是通过refs来调的
        callback(data);
        // submit是组件提供的属性
        this.submit(data);
      }
    });
  },
  echo(data) {
    this.isEcho = true;
    let cloneFormData = JSON.parse(JSON.stringify(this.formData));

    this.source.forEach(({content: {key, inner}}) => {
      // 处理入参
      let keyArr = key.split('.');

      if (keyArr.length === 1) {
        // 一层
        if (key in data) {
          cloneFormData[key] = isFunction(inner) ? inner.call(this.obj, data[key], data) : data[key];
        }
      } else {
        // 多层
        let itemValue = cloneFormData;
        let detailData = data;

        keyArr.forEach((current, index) => {
          if (index < keyArr.length - 1) {
            itemValue = itemValue[current];
            detailData = detailData[current];
          }
        });
        // 设置值
        let lastKey = last(keyArr);
          
        itemValue[lastKey] = isFunction(inner) ? inner.call(this.obj, detailData[lastKey], data) : detailData[lastKey];
      }
    });
    Object.assign(this.obj[this.userFormDataKey], cloneFormData);
  },
  // 获取change事件
  getChange(key) {
    return this.findComponent(key).content.onChange;
  },
};