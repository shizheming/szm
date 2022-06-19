import {isPlainObject, last, cloneDeep, isNumber, forEach, isArray, isString, isFunction, merge, dropRight, compact} from 'lodash';
import {getLevelValue, someJudge, forEachRules, toArray, toObject} from './tool';
import {component as allCompontent} from './props';

export default {
  // change事件赋值
  onChange (obj, key) {
    let arr = key.split('.');
    
    // 一级
    if (arr.length === 1) {
      this.setFormValue(obj, key, this.formData);
    } else if (arr.length > 1) {
      // 多级
      let itemValue = this.formData;

      arr.forEach((current, index) => {
        if (index < arr.length - 1) {
          itemValue = itemValue[current];
        }
      });
      this.setFormValue(obj, last(arr), itemValue);
    }
  },
  setFormValue (obj, key, parent) {
    if (obj && obj.target) {
      this.$set(parent, key, obj.target.value);
      // parent[key] = obj.target.value;
    } else {
      this.$set(parent, key, obj);
      // parent[key] = obj;
    }
  },
  renderDom () {
    let returnSource = this.source.map((current) => {
      let currentData = this.currentData(current);
      
      if (currentData === undefined) return;
      let {componentProps, newCurrent} = currentData;
      let prams = {
        newCurrent,
        componentProps,
      };
      
      return this.renderCurrentDom(prams);
    });

    return returnSource;
  },
  currentData(current) {
    // 加lastIsShow, nowIsShow要在老的current上加，因为下面每次都复制了一个新的current，之前的显示隐藏状态不会在这个上面的
    // 所以someJudge要那老的判断
    let oldCurrent = current;
    
    current = {...current};
    let {
      content,
      label,
    } = current;
    
    let {key, keys, type, onChange: userChange} = content;

    if (!isArray(type) && !isFunction(type) && !allCompontent[type]) {
      console.error(`自定义组件里面，没有你所配置的${type}类型的组件`);
      console.log(content, 10);
      return;
    }
    if (someJudge(oldCurrent, this) === false) return;
    // 每次某一个组件是显示的时候，同时跑运行下自己的同步的状态
    this.runLineState(current);
    // 调用触发函数
    this.triggerShowRunAsync(current);
    // 组件从隐藏到显示，调用自己得异步函数
    // 这里把老的lastIsShow, nowIsShow加到新的上面去
    current.lastIsShow = oldCurrent.lastIsShow;
    current.nowIsShow = oldCurrent.nowIsShow;
    this.componentShowAsync(current);
    let newContent = {...content};
    let newLabel = {...label};

    if (newLabel.rules) {
      // 绑定下自定义验证函数里面的this指向
      newLabel.rules = forEachRules(newLabel.rules, this);
    }
    // type会和antd的组件的自带的type属性冲突，所以要删掉
    delete newContent.type;
    let glv = getLevelValue(key, this.formData);
    let newKey = key;
    
    // 这里处理有keys的情况说明可以用拼接方式，然后原先的key要变成对象，同时里面加个一样的key名
    if (isArray(keys)) {
      let arrKey = key.split('.');
      let lastName = last(arrKey);
      
      glv = glv[lastName];
      newKey = `${key}.${lastName}`;
    }
    let componentProps = {
      style: content.style,
      props: {
        ...newContent,
        value: glv,
      },
      on: {
        change: (e) => {
          // 给表单绑定的值赋值
          this.onChange(e, newKey);
          this.$refs[key].onFieldChange();
          // 运行用户的change事件
          userChange && userChange.call(this, e);
          this.$listeners.stateCallback && this.$emit('stateCallback');
        }
      }
    };
    let newCurrent = cloneDeep(current);

    newCurrent.label = newLabel;
    return {
      componentProps,
      newCurrent
    };
  },
  renderCurrentDom(params) {
    let {keysShapeItem, componentProps, newCurrent, descendantsName} = params;
    let {label, content, style} = newCurrent;
    let {key, keys, type} = content;
    let dom;

    if (isString(type)) {
      dom = allCompontent[type].call(this, componentProps);
    } else if (isFunction(type)) {
      if (isArray(keys)) {
        let component = this.customGroup(key, keys, newCurrent, keysShapeItem, undefined, descendantsName);

        if (last(key.split('.')) != 0) {
          dom = type.call(this, componentProps, ...component);
        } else {
          if (!this.additionSubtraction[key]) {
            let asObj = keys.map(item => {
              return this.findComponent(item);
            });
            
            // 说明是数组，需要添加加减
            this.additionSubtraction[key] = [
              cloneDeep(asObj)
            ];
          }
          let arrComponent = this.additionSubtraction[key].map((item, index) => {
            return this.customGroup(key, keys, newCurrent, keysShapeItem, index, descendantsName);
          });

          // 加减
          dom = type.call(
            this, 
            arrComponent, 
            this.additionSubtraction[key], 
            () => {
              this.addField(key, keys);
            },
            (idx) => {
              this.removeField(key, idx);
            },
          );
        }
      } else {
        dom = type.call(this, componentProps);
      }
    }
    let modelItem = <div style={style} key={key}>
      <a-form-model-item
        ref={key}
        labelCol={{span: this.leftCol}} 
        wrapperCol={{span: this.rightCol}}
        {...{
          props: label,
          style: label.style
        }} 
        prop={key}
      >
        {dom}
      </a-form-model-item>
    </div>;

    return modelItem;
  },
  customGroup(key, keys, newCurrent, keysShapeItem, index, descendants) {
    // 自定义组
    return keys.map((item) => {
      let findComponent = cloneDeep(this.findComponent(item));
      // 默认wrapperCol为满格24
      // 默认label为空
      /* findComponent.label.label = '';
      findComponent.label.wrapperCol = {span: 24}; */
      // 不开放继承功能
      /* newCurrent = cloneDeep(newCurrent);
      // 这些属性不能用于覆盖
      delete newCurrent.label.label;
      delete newCurrent.content.type;
      delete newCurrent.content.key;
      delete newCurrent.content.keys;
      // 继承
      findComponent = merge(findComponent, newCurrent); */
      // keysShape权重最独立

      if (isString(keysShapeItem)) {
        delete findComponent.content.keysShape;
      }
      let descendantsName = [];

      // 继承独立的子孙
      if (isArray(descendants) && descendants.length) {
        let {content: {key}} = findComponent;
        
        // 说明和当前的key匹配上了
        descendants.forEach((cur, k, arr) => {
          if ((new RegExp(`${key}$`)).test(cur[0])) {
            findComponent = merge(findComponent, cur[1]);
            // 找到了就要清空，以免往下传
            arr[k] = undefined;
          }
        });
        descendants = compact(descendants);
      }
      let keysShapeObj = newCurrent.content.keysShape;

      if (isPlainObject(keysShapeObj)) {
        if (keysShapeObj[item]) {
          // 1.这里说明写的独立的组件形态和keys里面的名字一样
          findComponent = merge(findComponent, keysShapeObj[item]);
        } else {
          // 2.这里说明是写的独立的组件形态是keys里面名字内部的另一个组件，也就是当前keys里面的子孙级别组件
          let ksKey = Object.keys(keysShapeObj);

          ksKey.forEach(current => {
            if ((new RegExp(`^${item}`)).test(current)) {
              descendantsName.push([current, keysShapeObj[current]]);
              return true;
            }
          });
        }
      }
      // 当前层级没找到子孙，有可能还在下面，所以还要往下传
      if (isArray(descendants)) descendantsName = descendants;
      // 复制体要显示，当本体隐藏的时候
      findComponent.isShow = true;
      findComponent.content.key = `${key}.${item}`;
      if (isNumber(index)) {
        let firstName = dropRight(key.split('.')).join('.');

        findComponent.content.key = `${firstName + '.' + Number(index)}.${item}`;
      }
      let currentData = this.currentData(findComponent);
      
      if (currentData === undefined) return;
      let {componentProps, newCurrent: groupNewCurrent} = currentData;
      let newParams = {
        newCurrent: groupNewCurrent,
        componentProps,
        keysShapeItem: item,
        descendantsName
      };

      return this.renderCurrentDom(newParams);
    });
  }
};