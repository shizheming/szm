import {isPlainObject, last, cloneDeep, forEach, isArray, isString, dropRight} from 'lodash';
import {getLevelValue, someJudge, recursion, toArray, toObject, guid} from './tool';
import moment from 'moment';
export default {
  addField(key, keys) {
    let firstName = dropRight(key.split('.')).join('.');
    let len = this.additionSubtraction[key].length;
    let asObj = keys.map((item, index) => {
      let obj = cloneDeep(this.findComponent(item));

      if (obj.timeID) return;
      // 用timeID做循环的key
      obj.timeID = guid();
      return obj;
    });
    
    this.additionSubtraction[key].push(asObj);
    let cloneFormDataObj = cloneDeep(getLevelValue(key, this.formData));

    // 重置数据
    recursion(cloneFormDataObj, (value, key, collection) => {
      collection[key] = undefined;
    });
    this.$set(getLevelValue(firstName, this.formData), len, cloneFormDataObj);
    // 同步cloneFormData
    this.$set(getLevelValue(firstName, this.cloneFormData), len, cloneFormDataObj);
  },
  removeField (key, idx) {
    let arrKey = dropRight(key.split('.'));
    let firstName = arrKey.join('.');
    
    // 删除本体和复制体上面的数据
    let newArr = toArray(cloneDeep(this.formData));
    let newArrClone = toArray(cloneDeep(this.cloneFormData));

    recursion(newArr, undefined, (value, key, collection) => {
      if (isPlainObject(value)) {
        collection[key] = toArray(value);
      }
    });
    recursion(newArrClone, undefined, (value, key, collection) => {
      if (isPlainObject(value)) {
        collection[key] = toArray(value);
      }
    });
    getLevelValue(firstName, newArr).splice(idx, 1);
    getLevelValue(firstName, newArrClone).splice(idx, 1);
    recursion(newArr, undefined, (value, key, collection) => {
      if (isArray(value)) {
        collection[key] = toObject(value);
      }
    });
    
    recursion(newArrClone, undefined, (value, key, collection) => {
      if (isArray(value)) {
        collection[key] = toObject(value);
      }
    });
    
    this.$set(this, 'formData', newArr);
    this.$set(this, 'cloneFormData', newArrClone);
    // 删除渲染加减的数组里面对应的数据
    this.$delete(this.additionSubtraction[key], idx);
  },
};