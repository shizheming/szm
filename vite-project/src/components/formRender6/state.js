import {isPlainObject, last, cloneDeep, forEach, isArray, isString, isFunction} from 'lodash';
import {getLevelValue, someJudge, forEachRules, toArray, toObject} from './tool';
import allCompontent from './component.js';

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
      this.setFormValue(obj, last(arr), itemValue, key);
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
  runObjMethods (key, value) {
    if (this.obj[key] && isFunction(this.obj[key])) {
      this.obj[key](value);
    }
  },
  addField(groupKey) {
    let [key] = groupKey.split('.');
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
    
    // 重置数据
    forEach(cloneFormDataObj, (value, key) => {
      cloneFormDataObj[key] = undefined;
    });
    this.$set(this.formData[key], len, cloneFormDataObj);
    // 同步cloneFormData
    this.$set(this.cloneFormData[key], len, cloneFormDataObj);
  },
  removeField (groupKey, idx) {
    let [key] = groupKey.split('.');

    let obj = this.formData[key];
    let newArr = toArray(this.formData);
    let newArrClone = toArray(this.cloneFormData);

    newArr[key].splice(idx, 1);
    newArrClone[key].splice(idx, 1);
    let backToObj = toObject(newArr[key]);
    let backToObjClone = toObject(newArrClone[key]);
    
    this.$set(this.formData, key, backToObj);
    this.$set(this.cloneFormData, key, backToObjClone);
    this.$delete(this.additionSubtraction[groupKey], idx);
    // content里面key的数字也要变
    this.additionSubtraction[groupKey].forEach((current, index) => {
      if (index < idx) return;
      current.forEach(item => {
        let {content: {key}} = item;

        let matchKey = /\.(\d)\.?/.exec(key);
        // 如果匹配不到就说明不是加减的组件，可以忽略了

        if (matchKey === null) return;
        let [, len] = matchKey;

        if (len > idx) {
          if (/\.\d\./.test(item.content.key)) {
            item.content.key = item.content.key.replace(/\.\d\./, `.${len - 1}.`);
          }
          if (/\.\d$/.test(item.content.key)) {
            item.content.key = item.content.key.replace(/\.\d$/, `.${len - 1}`);
          }
        }
      });
    });
  },
  renderDom () {
    let {formData, onChange, newSource} = this;
    
    let returnSource = newSource.map((current) => {
      // 说明是组
      if (current.group && current.component) {
        let {content: groupConent, label: groupLabel, isLabel, xy, isShow} = current.group;
        let component = [];
        // 组到组件的一个属性继承
        let cloneGroupContent = {...groupConent};
        
        if (isShow === false) return;
        // 如果有数字就改变下数据结构，把他变成二维数组
        if (/\.\d\.?/.test(current.component[0].content.key)) {
          component = this.additionSubtraction[current.component[0].groupName];
        } else {
          component = current.component;
        }
        component = component.map(item => {
          if (isArray(item)) {
            return item.map(cur => {
              let currentData = this.currentData(cur, cloneGroupContent);

              if (currentData === undefined) return;
              let {type, label, newLabel, key, style, componentProps, userChange} = currentData;
              let {itemStyle, leftCol, rightCol} = this.customComponentCommonStyle(component, isLabel, newLabel, xy, groupConent);

              return this.renderCurrentDom(type, label, newLabel, key, itemStyle, componentProps, leftCol, rightCol);
            });
          }
          let currentData = this.currentData(item, cloneGroupContent);

          if (currentData === undefined) return;
          let {type, label, newLabel, key, style, componentProps, userChange} = currentData;
          let {itemStyle, leftCol, rightCol} = this.customComponentCommonStyle(component, isLabel, newLabel, xy, groupConent);

          return this.renderCurrentDom(type, label, newLabel, key, itemStyle, componentProps, leftCol, rightCol);
        });
        let groupKeyStr = groupConent.key.join();

        // 这是外面那层
        return (
          <a-form-model-item 
            style="margin-bottom:0"
            labelCol={{span: this.leftCol}} 
            wrapperCol={{span: this.rightCol}}
            {...{
              props: groupLabel,
              style: groupLabel.style
            }} 
          >
            {
              groupConent.type 
                ? groupConent.type.call(
                  this.obj,
                  component,
                  this.additionSubtraction[groupKeyStr],
                  () => {
                    this.addField(groupKeyStr);
                  },
                  (idx) => {
                    this.removeField(groupKeyStr, idx);
                  },
                )
                : component
            }
          </a-form-model-item>
        );
      }
      let currentData = this.currentData(current);
      
      if (currentData === undefined) return;
      let {type, label, newLabel, key, style, componentProps} = currentData;

      return this.renderCurrentDom(type, label, newLabel, key, style, componentProps, this.leftCol, this.rightCol);      
    });

    return returnSource;
  },
  currentData(current, cloneGroupContent) {
    // 加lastIsShow, nowIsShow要在老的current上加，因为下面每次都复制了一个新的current，之前的显示隐藏状态不会在这个上面的
    // 所以someJudge要那老的判断
    let oldCurrent = current;

    current = {...current};
    // 继承组动态方法
    if (cloneGroupContent) {
      current.content = {
        ...cloneGroupContent,
        ...current.content,
      };
    }
    let {
      style,
      content,
      label,
    } = current;

    let {key, type, onChange: userChange} = content;
    
    // 各种不符合的情况，当前组件不渲染

    if (!isFunction(content.type) && !allCompontent[content.type]) {
      console.error(`自定义组件里面，没有你所配置的${content.type}类型的组件`);
      return;
    }
    if (someJudge(oldCurrent, this.obj) === false) return;
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
      newLabel.rules = forEachRules(newLabel.rules, this.obj);
    }
    // type会和antd的组件的自带的type属性冲突，所以要删掉
    delete newContent.type;
    let componentProps = {
      style: content.style,
      props: {
        ...newContent,
        value: getLevelValue(key, this.formData),
      },
      on: {
        change: (e) => {
          // 给表单绑定的值赋值
          this.onChange(e, key);
          this.$refs[key].onFieldChange();
          // 运行用户的change事件
          userChange && userChange.call(this.obj, e);
          this.$listeners.stateCallback && this.$emit('stateCallback');
        }
      }
    };
    
    return {
      componentProps,
      style,
      key,
      newLabel,
      label,
      userChange,
      type
    };
  },
  customComponentCommonStyle(component, isLabel, newLabel, xy, groupConent) {
    let itemStyle = {};
    let leftCol = this.leftCol;
    let rightCol = this.rightCol;

    if (isLabel !== true) {
      newLabel.label = undefined;
    }
    // 有label字，是横的
    if (isLabel === true && xy !== 'y') {
      itemStyle = {
        width: 100 / component.length + '%',
        display: 'inline-block',
        verticalAlign: 'top'
      };
    }
    // 有label字，是竖的
    if (isLabel === true && xy === 'y') {

    }
    // 没有label字，是横的
    if (isLabel !== true && xy !== 'y') {
      rightCol = 24;
      itemStyle = {
        // key写成数组的形式，他就会是个二位数组，不管有没有加减，就是一整块了，布局会有点小出入
        width: 100 / component.length + '%',
        display: 'inline-block',
        verticalAlign: 'top'
      };
    }
    // 没有label字，是竖的
    if (isLabel !== true && xy === 'y') {
      rightCol = 24;
    }
    // 如果type是自定义的话不要约束样式了
    if (groupConent.type) {
      itemStyle = {
        ...itemStyle,
        width: 'auto'
      };
    }
    return {
      itemStyle,
      leftCol,
      rightCol
    };
  },
  renderCurrentDom(type, label, newLabel, key, style, componentProps, leftCol, rightCol) {
    return (
      <div style={style} key={key}>
        <a-form-model-item
          ref={key}
          labelCol={{span: leftCol}} 
          wrapperCol={{span: rightCol}}
          {...{
            props: newLabel,
            style: label.style
          }} 
          prop={key}
        >
          {
            !isFunction(type)
              ? allCompontent[type].call(this.obj, componentProps)
              : type.call(this.obj, componentProps)
          }
        </a-form-model-item>
        {this.$scopedSlots[key] && this.$scopedSlots[key]()}
      </div>
    );
  }
};