import {attempt, isPlainObject, difference, last, cloneDeep, isInteger, values, fromPairs, forEach, isArray, isString, isFunction} from 'lodash';
import syncAsync from './syncAsync';
import {getLevelValue, forEachRules} from './tool';
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
      parent[key] = obj.target.value;
    } else {
      parent[key] = obj;
    }
  },
  runObjMethods (key, value) {
    if (this.obj[key] && isFunction(this.obj[key])) {
      this.obj[key](value);
    }
  },
  renderDom () {
    let {formData, onChange, source} = this;
    
    let returnSource = source.map((current) => {
      let {
        isShow,
        _isShow,
        style: lineStyle,
        content,
        label,
        isGroupShow
      } = current;
      
      // 这里先考虑组的显示隐藏，其他的遇到了在说，现在yy不出来
      // 如果是整个组有变化了，应该把不属于任何组的组件过滤掉，值变化组
      if (isGroupShow === false) return;
      if (!isFunction(current.content.type) && !allCompontent[current.content.type]) return;
      current.lastIsShow = current.nowIsShow;
      if (isFunction(_isShow)) {
        if (!_isShow.call(this.obj)) {
          // 是函数的_isShow也记录下结果在isShow上面
          current.isShow = false;
          current.nowIsShow = false;
          return;
        } else {
          current.nowIsShow = true;
        }
      } else {
        if (!isShow) {
          // 记录下显示的状态用在组件从隐藏到显示的时候要调用自己的异步函数
          current.nowIsShow = false;
          return;
        } else {
          current.nowIsShow = true;
        }
      }
      // 每次某一个组件是显示的时候，同时跑运行下自己的同步的状态
      this.runLineState(current);
      // 调用触发函数
      this.triggerShowRunAsync(current);
      // 组件从隐藏到显示，调用自己得异步函数
      this.componentShowAsync(current);
      // label有简写方式，字符串
      if (isString(label)) {
        label = {
          label
        };
      }
      // 把label不是props的属性拿出来
      let newLabel = {...label};

      if (newLabel.rules) {
        // 绑定下自定义验证函数里面的this指向
        newLabel.rules = forEachRules(newLabel.rules, this.obj);
      }
      let attrs = {
        style: newLabel.style
      };
      
      // 设置列数
      if (this.column > 1) {
        let column = {
          width: `${100 / this.column}%`,
          display: 'inline-block'
        };

        lineStyle = Object.assign(column, lineStyle);
      }
      delete label.style;
      // 把conten不是props的属性拿出来
      let newContent = {...content};
      let userChange = content.onChange;
      let {
        key,
        type,
        style = {}
      } = newContent;

      if (type === 'input') {
        if (!newContent.placeholder) newContent.placeholder = '请填写';
      } else if (type === 'select') {
        if (!newContent.placeholder) newContent.placeholder = '请选择';
      }
      // 回显调用change
      if (this.isEcho) {
        if (userChange) {
          let v = getLevelValue(key, this.formData);
          
          // 如果是undefined说明没有变化，不需要触发change事件
          if (v === undefined) return;
          let changeType;
          // 获取type类型，传的时候就知道是直接传值还是target.value了

          if (type === 'input' || type === 'textarea' || type === 'inputPs') changeType = true;
          userChange.call(this.obj, changeType ? v : {target: {value: v}});
        }
      }
      delete newContent.key;
      delete newContent.type;
      delete newContent.on;
      delete newContent.style;
      delete newContent.onChange;
      delete newContent.outer;
      delete newContent.inner;
      let componentProps = {
        style,
        props: {
          ...newContent,
          value: getLevelValue(key, formData),
        },
        on: {
          change: (e) => {
            // 给表单绑定的值赋值
            onChange(e, key);
            // 运行用户的change事件
            userChange && userChange.call(this.obj, e);
            this.$listeners.stateCallback && this.$emit('stateCallback');
          }
        }
      };

      return (
        <div style={lineStyle} key={key}>
          <a-form-model-item 
            labelCol={{span: this.leftCol}} 
            wrapperCol={{span: this.rightCol}}
            {...{
              props: newLabel,
              attrs
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
    });

    this.isEcho = false;
    return returnSource;
  },
  ...syncAsync
};