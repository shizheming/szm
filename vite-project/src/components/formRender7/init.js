import {isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, isNumber, isObject} from 'lodash';
import state from './state';
import {createLevel, setLevelValue} from './tool';
import additionAndSubtraction from './additionAndSubtraction';
import syncAsync from './syncAsync';

// 下划线的属性名我认为是你这个属性有多种状态变化，
export default {
  init () {
    this.initSource();
    // 把用户给的source里面的配置数据换成表单需要提交的数据格式
    // 把用户绑定的key拿出来，处理成层级关系，
    let data = this.initFormData();

    console.log(data, '建立好层级的formData');
    this.formData = data;
    // 初始化加减
    this.initAddSub();
    // 同时保存复制的数据，用在对比上
    this.cloneFormData = cloneDeep(data);
  },
  // 处理些默认值和数据结构
  initSource() {
    // 过滤没有的自定义组件
    this.source.forEach(current => {
      let {content, label, style} = current;
      
      // label有简写方式，字符串
      // lable统一格式
      if (isString(label)) {
        current.label = {
          label
        };
      }
      // 设置列数
      if (this.column > 1) {
        let column = {
          width: `${100 / this.column}%`,
          display: 'inline-block'
        };

        current.style = Object.assign(column, style);
      }
      let {
        type,
        placeholder
      } = content;

      // 填写placholder默认值
      if (type === 'input') {
        if (!placeholder) content.placeholder = '请填写';
      } else if (type === 'select') {
        if (!placeholder) content.placeholder = '请选择';
      }
    });
  },
  // 添加层级生成formData数据结构
  initFormData () {
    this.source.forEach(current => {
      // 初始显示
      if (current.isShow === undefined && !isFunction(current._isShow)) current.isShow = true;
    });
    // 加上多级的值
    let formData = createLevel(this.sourceKeys);

    this.source.forEach(current => {
      let {content: {type, key, keys}} = current;
      
      if (isArray(type)) {
        // 加上组得嵌套数据结构,当type是数组的时候
        // 这里也要分有没有原始层级概念？？？
        formData[key] = {};
        type.forEach(item => {
          if (formData[item]) {
            formData[key][item] = cloneDeep(formData[item]);
          } else {
            formData[key][item] = undefined;
          }
        });
      }
    });
    // 粗糙了，就写死2层嵌套组合，暂时不写递归
    [1, 2, 3, 4].forEach(() => {
      this.source.forEach(current => {
        let {content: {type, key, keys}} = current;
        
        if (isFunction(type) && isArray(keys)) {
          // 加上组得嵌套数据结构,当type是函数的时候,同时有keys的时候
          let splitKey = key.split('.');

          if (splitKey.length === 1) {
            // key是1层
            formData[key] = {[key]: undefined};
            keys.forEach(item => {
              let arrItem = item.split('.');

              if (arrItem.length === 1) {
                // keys是单层
                if (formData[item]) {
                  formData[key][item] = cloneDeep(formData[item]);
                } else {
                  formData[key][item] = undefined;
                }
              } else {
                // keys是多层
                if (formData[arrItem[0]]) {
                  formData[key][arrItem[0]] = cloneDeep(formData[arrItem[0]]);
                } else {
                  formData[key][arrItem[0]] = undefined;
                }
              }
            });
          } else {
            // key是多层
            let arrKey = key.split('.');
            let obj = {[last(arrKey)]: undefined};
            
            if (last(arrKey) == 0) obj = {};
            keys.forEach(item => {
              let arrItem = item.split('.');

              if (arrItem.length === 1) {
                // keys是单层
                if (formData[item]) {
                  obj[item] = cloneDeep(formData[item]);
                } else {
                  obj[item] = undefined;
                }
              } else {
                // keys是多层
                if (formData[arrItem[0]]) {
                  obj[arrItem[0]] = cloneDeep(formData[arrItem[0]]);
                } else {
                  obj[arrItem[0]] = undefined;
                }
              }
            });
            setLevelValue(key, obj, formData);
          }
        } 
      });
    });
    // 添加默认值
    this.source.forEach(current => {
      let {content: {initValue, key}} = current;
      let arr = key.split('.');

      if (initValue !== undefined) {
        if (arr.length === 1) {
          formData[key] = initValue;
        } else {
          setLevelValue(key, initValue, this.formData);
        }
      }
    });
    return formData;
  },
  // 初始化加减
  initAddSub() {
    this.source.forEach(current => {
      let {content: {key, keys}} = current;
      let arr = key.split('.');

      if (last(arr) == 0 && isArray(keys)) {
        let asObj = keys.map(item => {
          return this.findComponent(item);
        });
        
        // 说明是数组，需要添加加减
        this.additionSubtraction[key] = [
          cloneDeep(asObj)
        ];
      }
    });
  },
  ...state,
  ...syncAsync,
  ...additionAndSubtraction
}; 
