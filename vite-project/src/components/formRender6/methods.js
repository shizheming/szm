import {recursive} from 'hypnos-szm';
import {isString, isArray, isInteger, isFunction, last, forEach, isPlainObject, values, cloneDeep} from 'lodash';
import {deleteHideComponentData, toArray, dataOutput, setLevelValue, getLevelValue} from './tool';
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
    console.log(this.formData, '组件内部的formData');
    this.$refs.formComponent.validate(valid => {
      if ((this.beforeValidate && this.beforeValidate()) || !valid) {
        return; 
      }
      let data;
  
      // 出参数据处理
      // 处理outer函数
      data = dataOutput(this.formData, this.source, this.obj);
      // 删除不显示的组件key和old的key
      // 这里还没改，要用this.newSource
      data = deleteHideComponentData(data, this.source);
      // 把类数组变成数组
      data = toArray(data);
      // callback是通过refs来调的
      callback(data);
      // submit是组件提供的属性
      this.submit(data);
    });
  },
  echo(data) {
    this.isOnce = true;
    // 先处理组合的不管是不是加减
    // 主要是要同步formData，additionSubtraction，需要这3个同步好了，才能渲染
    forEach(data, (value, key) => {
      if (isArray(value)) {
        if (key in this.formData) {
          let groupKey;

          this.newSource.forEach(current => {
            // 是组
            if (current.group && current.component) {
              let rex = new RegExp(`^${key}`);
              let str = current.group.content.key.join(',');
              
              if (rex.test(str)) {
                groupKey = str;
              }
            }
          });
          if (groupKey === undefined) return;
          data[key].forEach((current, index) => {
            if (index === data[key].length - 1) return;
            let cloneComponent = cloneDeep(this.additionSubtraction[groupKey][0]);
            let len = this.additionSubtraction[groupKey].length;
            
            cloneComponent.forEach(item => {
              if (/\.\d\./.test(item.content.key)) {
                item.content.key = item.content.key.replace(/\.\d\./, `.${len}.`);
              }
              if (/\.\d$/.test(item.content.key)) {
                item.content.key = item.content.key.replace(/\.\d$/, `.${len}`);
              }
            });
            this.additionSubtraction[groupKey].push(cloneComponent);
            let cloneFormDataObj = cloneDeep(this.formData[key][0]);
            
            if (cloneFormDataObj === undefined) cloneFormDataObj = '';
            // 重置数据
            forEach(cloneFormDataObj, (value, key) => {
              cloneFormDataObj[key] = undefined;
            });
            this.$set(this.formData[key], len, cloneFormDataObj);
            // 同步formData，additionSubtraction这3个
          });
        }
      }
    });

    let cloneFormData = JSON.parse(JSON.stringify(this.formData));

    this.newSource.forEach((current) => {
      // 组的获取数据的方式
      if (current.group && current.component) {
        let component = [];

        if (/\.\d\.?/.test(current.component[0].content.key)) {
          component = this.additionSubtraction[current.component[0].groupName];
        } else {
          component = current.component;
        }
        component.forEach((item, idx) => {
          if (isArray(item)) {
            item.forEach(cur => {
              this.setData(cur, data, cloneFormData);
            });
            return;
          }
          this.setData(item, data, cloneFormData);
        });
        return;
      }
      // 非组的数据获取方式
      this.setData(current, data, cloneFormData);
    });

    Object.assign(this.obj[this.userFormDataKey], cloneFormData);
    Object.assign(this.formData, cloneFormData);
    // 解决echo，tirgger同步写法时候，一开始不调用的问题
    this.$nextTick(() => {
      this.isOnce = false;
    });
  },
  // 获取change事件
  getChange(key) {
    return this.findComponent(key).content.onChange;
  },
  setData(current, data, cloneFormData) {
    let {content: {key, inner, onChange}, groupName, isShow} = current;

    // if (isShow === false) return;
    // 处理入参
    let keyArr = key.split('.');

    if (keyArr.length === 1) {
      // 一层
      cloneFormData[key] = isFunction(inner) ? inner.call(this.obj, data[key], data) : data[key];
      // 有onChange要调用
      if (onChange) {
        onChange.call(this.obj, cloneFormData[key]);
      }
    } else {
      // 多层
      setLevelValue(key, 
        isFunction(inner) ? inner.call(this.obj, getLevelValue(key, data), data) : getLevelValue(key, data), 
        cloneFormData);
      if (onChange) {
        onChange.call(this.obj, cloneFormData[key]);
      }
    }
  }
};