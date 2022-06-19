import {assign, identity, isSymbol, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, isNumber} from 'lodash';
import state from './state';
import {createLevel, addFather, delFather, forEachRules, recursion} from './tool';
import syncAsync from './syncAsync';
import xy from './proxy';
import group from './group';
// 下划线的属性名我认为是你这个属性有多种状态变化，
// 这个文件里面应该都是主逻辑
export default {
  init () {
    this.initGroup();
    this.initSource();
    // 把用户给的source里面的配置数据换成表单需要提交的数据格式
    // 把用户绑定的key拿出来，处理成层级关系，
    let data = this.initFormData();

    console.log(data, '建立好层级的formData');
    // 找到外面用户formData的key，最终是要把转换好的提交的数据格式给扔出去，自动给仍上去
    let key;
    
    forEach(this.obj, (v, k) => {
      if (v === this.submitData) {
        key = k;
      }
    });
    // 存一下用户表单的key，回显用
    this.userFormDataKey = key;
    // 把转换好的数据格式分别挂在formRender组件的formData上和用户的formData上
    // 继承下用户的formData里面的数据，有可能用户要自己用
    // 这个地方不能直接覆盖，因为有可能好几层呢，这个只是一层的
    forEach(data, (value, k) => {
      if (isPlainObject(value)) {
        data[k] = Object.assign(value, this.obj[key][k]);
      } else {
        if (this.obj[key][k] != undefined) {
          data[k] = this.obj[key][k];
        }
      }
    });
    this.obj[key] = data;
    this.formData = data;
    // 同时保存复制的数据
    this.cloneFormData = JSON.parse(JSON.stringify(data));
    // 添加方法给用户调用-主动设值
    this.obj[`${key}Set`] = this.createProxy();

    // 分组变成二维数组
    let newSource = [...this.source];
    let group = {};

    newSource.forEach((current, index) => {
      if (current.groupName) {
        if (group[current.groupName]) {
          group[current.groupName].push(current);
          newSource[index] = current.groupName;
        } else {
          group[current.groupName] = [current];
          newSource[index] = current.groupName;
        }
      }
    });
    let groupKeys = Object.keys(group);
    
    // 去重
    newSource = [...new Set(newSource)];
    // 把组的数组插到相应的位置
    newSource.forEach((current, index) => {
      if (groupKeys.includes(current)) {
        let [groupObj] = this.groupSource.filter(({content: {key}}) => {
          return key.join(',') === current;
        });

        newSource[index] = {
          group: groupObj,
          component: group[current],
          // 主要是记录加减的source数据，虚拟的
          fictitiousData: []
        };
      }
    });
    this.newSource = newSource;
    console.log(newSource, '组');
  },
  // 处理写默认值和数据结构
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

      return true;
    });
  },
  // 添加层级生成formData数据结构
  initFormData () {
    this.source.forEach(current => {
      // 初始显示
      // 默认给他加上true
      current.father = 'root';
      addFather(current);
      if (current.isShow === undefined && !isFunction(current._isShow)) current.isShow = true;
    });
    let sourceKeys = this.sourceKeys;
    // 把key默认赋值undefined，这里好像没有区分联级，貌似也不需要
    const keyToUndefined = fromPairs(sourceKeys.map(current => {
      return [current, undefined];
    }));
    
    // 加上多级的值
    let formData = Object.assign(keyToUndefined, createLevel(sourceKeys));

    this.source.forEach(current => {
      delFather(current);
    });
    return formData;
  },
  // 创建proxy,提供方法给外部，用户要自己调
  createProxy () {
    let formDataFn = {};
  
    this.sourceKeys.forEach(current => {
      formDataFn[current] = {};
    });
    
    forEach(formDataFn, (current, key) => {
      formDataFn[key] = new Proxy(current, {
        set: (target, k, value) => {
          // 处理状态变化的函数
          this.runOnlyState(k, value, key);
          return Reflect.set(target, k, value);
        }
      });
    });

    return new Proxy(formDataFn, {
      set: (target, key, value) => {
        // 处理状态变化的函数
        this.runBatchState(key, value);
        return Reflect.set(target, key, value);
      }
    });
  },
  initGroup() {
    // 初始化组对象
    this.groupSource.forEach(current => {
      current.groupName = current.content.key.join(',');
      // 存加减循环的数据
      this.additionSubtraction[current.groupName] = [
        current.content.key.map(item => {
          return this.findComponent(item);
        })
      ];
      // 初始显示
      // 默认给他加上true
      if (current.isShow === undefined && !isFunction(current._isShow)) current.isShow = true;
      // 给组件打上组的标记
      let {content, label} = current;

      if (isString(label)) {
        current.label = {
          label
        };
      }
      content.key.forEach((v) => {
        let component = this.source[this.sourceKeys.indexOf(v)];

        if (component) component.groupName = current.groupName;
      });
    });
  },
  ...state,
  ...syncAsync,
  ...group,
  ...xy,
}; 
