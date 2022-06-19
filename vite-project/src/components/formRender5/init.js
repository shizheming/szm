import {keys as ObjKeys, identity, isSymbol, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction, isNumber} from 'lodash';
import {recursive} from 'hypnos-szm';
import state from './state';
import {createLevel, addFather, delFather} from './tool';
import xy from './proxy';
import group from './group';
// 下划线的属性名我认为是你这个属性有多种状态变化，
// 这个文件里面应该都是主逻辑
export default {
  ...state,
  // 把用户给的source里面的配置数据换成表单需要提交的数据格式
  sourceToFormData () {
    // 把用户绑定的key拿出来，处理成层级关系，同时给数据添加proxy
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
    this.obj[key] = Object.assign(data, this.obj[key]);
    this.formData = data;
    // 同时保存复制的数据
    this.cloneFormData = JSON.parse(JSON.stringify(data));

    // 添加方法给用户调用
    this.obj[`${key}Set`] = this.createProxy();
  },
  // 添加层级和proxy
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
    
    // 删除有点的key，没有用的，影响视觉
    forEach(formData, (value, key) => {
      let arr = key.split('.');
      
      if (arr.length > 1) {
        delete formData[key];
      }
    });
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
  // 出参把配数据的outer应用到要提交的数据上
  dataOutput() {
    let cloneFormData = cloneDeep(this.formData);

    this.source.forEach(({content: {key, outer}}) => {
      if (!isFunction(outer)) return;
      let rx = new RegExp(`^old_${key}$`);

      recursive(cloneFormData, (value, formDataKey, obj) => {
      // 这里的判断是这里的值是对象的是真的值还是配数据的时候点的显示形成的对象
        if (key === formDataKey) {
        // 在第一层，应为第一层我没写old的key
          obj[key] = outer.call(this.obj, value);
        } else if (rx.test(formDataKey)) {
        // 里面的层级
          obj[formDataKey] = outer.call(this.obj, value);
        }
      });
    });
    return cloneFormData;
  },
  ...xy,
  ...group
}; 
