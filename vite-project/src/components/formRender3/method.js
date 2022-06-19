import {isArray, isString, forEach} from 'lodash';
import {recursive} from 'hypnos-szm';

// this.originalData是元数据
// 设完后记得更新视图

const method = {
  // 动态设置某个组件的数据
  // 也是最原始的方式=>直接手动修改你想修改的源数据
  setComponent (decorator, fn) {
    if (isArray(decorator)) {
      decorator.forEach(current => {
        this.behavior(current, fn);
      });
    } else if (isString(decorator)) this.behavior(decorator, fn);
  },
  // 内部方法
  behavior (decorator, fn) {
    if (this.originalData.some(current => {
      if (current.id === decorator) {
        fn(current);
        return true;
      } else {
        return false;
      }
    })) {
      this.originalData = [...this.originalData];
    }
  },
  // 显示组件
  show (decoratorName) {
    this.setComponent(decoratorName, (current) => {
      current.isShow = true;
    });
  },
  // 隐藏组件
  hide (decoratorName) {
    this.setComponent(decoratorName, (current) => {
      current.isShow = false;
    });
  },
  // 切换显示隐藏组件
  toggleEye (decoratorName) {
    this.setComponent(decoratorName, (current) => {
      current.isShow = current.isShow === false;
    });
  },
  // 显示组组件
  groupShow (groupName) {
    this.$nextTick(() => {
      // 显示是一层层显示
      // 隐藏却是这层下面得全部隐藏
      let {originalGroup} = this.group;
      let component = [];
      let newComponent = [];
            
      recursive(originalGroup, null, (value, key, collection) => {
        if (key === groupName) {
          // 找到那个value，为了显示，但我并不知道这个value是数组还是对象
          component = value;
          // 找到除这个key以外得其他key，为了隐藏
          let itsKey = Object.keys(collection).filter(current => current !== key);
          let itsValue = [];
          let newItsValue = [];
                    
          forEach(collection, function (value, key) {
            if (itsKey.includes(key)) {
              itsValue.push(value);
            }
          });
          recursive(itsValue.flat(), function (value, key) {
            newItsValue.push(value);
          }, function (value, key) {
            isArray(value) && newItsValue.push(value);
            newItsValue.push(key);
          });
                    
          // 需要隐藏得组件
          newItsValue = [...new Set(newItsValue.flat())];
          newItsValue.forEach(current => this.hide(current));
          newComponent.push(groupName);
        };
      });
      forEach(component, function (value, key) {
        newComponent.push(value);
        newComponent.push(key);
      });
      newComponent = [...new Set(newComponent.flat())];
      newComponent.forEach(current => this.show(current));
    });
  },
  // 隐藏组组件
  groupHide (groupName) {
    this.$nextTick(() => {
      // 显示是一层层显示
      // 隐藏却是这层下面得全部隐藏
      let {originalGroup} = this.group;
      let component = [];
      let newComponent = [];
            
      recursive(originalGroup, null, (value, key, collection) => {
        if (key === groupName) {
          // 找到那个value，为了隐藏，但我并不知道这个value是数组还是对象
          component = value;
          newComponent.push(groupName);
        };
      });
      // 这里是以下全部隐藏
      recursive(component, function (value, key, collection) {
        isArray(collection) && newComponent.push(collection);
      }, function (value, key) {
        isArray(value) && newComponent.push(value);
        newComponent.push(key);
      });
      newComponent = [...new Set(newComponent.flat())];
      newComponent.forEach(current => this.hide(current));
    });
  },
  // 切换显示隐藏组组件
  toggleEyeGroup (groupName) {
    /* let {key} = this.group;

        key[groupName] = key[groupName] === false; */
  },
  // 能选能填
  able (decoratorName) {
    this.setComponent(decoratorName, ({value}) => {
      value.props.disabled = false;
    });
  },
  // 不能选不能填
  disabled (decoratorName) {
    this.setComponent(decoratorName, ({value}) => {
      value.props.disabled = true;
    });
  },
  // 切换能不能选，能不能填
  toggleAble (decoratorName) {
    this.setComponent(decoratorName, ({value}) => {
      value.props.disabled = !value.props.disabled;
    });
  },
  // 必填
  required (decoratorName) {
    this.setComponent(decoratorName, ({value: {directives}}) => {
      let [decorator] = directives.filter(({name}) => name === 'decorator');
      let [, options] = decorator.value;
      let [mes] = options.rules.filter(({required}) => required !== undefined);

      mes.required = true;
    });
  },
  // 不必填
  noRequired (decoratorName) {
    this.setComponent(decoratorName, ({value: {directives}}) => {
      let [decorator] = directives.filter(({name}) => name === 'decorator');
      let [, options] = decorator.value;
      let [mes] = options.rules.filter(({required}) => required !== undefined);

      mes.required = false;
    });
  },
  // 切换必填非必填
  toggleRequired (decoratorName) {
    this.setComponent(decoratorName, ({value: {directives}}) => {
      let [decorator] = directives.filter(({name}) => name === 'decorator');
      let [, options] = decorator.value;
      let [mes] = options.rules.filter(({required}) => required !== undefined);

      mes.required = mes.required === false;
    });
  },
  // 重置数据=>比如说弹窗中改变了数据，显示了某个，关闭弹窗后要还原，不然再点开会是改变后的数据的样子
  resetFields () {
    let {originalData, group} = this.staticData;

    this.originalData = [...originalData];
    this.group = group;
  },
  // 修改options内容
  setOptions (decoratorName, options) {
    this.setComponent(decoratorName, current => {
      let {value: {props}} = current;

      if (!props) {
        current.value.props = {options};
      }
      props.options = options;
    });
  },
  // 修改原生样式
  setStyle (decoratorName, style) {
    this.setComponent(decoratorName, current => {
      let {value} = current;

      value.style = style;
    });
  },
  // 修改lab
  setLab (decoratorName, name) {
    this.setComponent(decoratorName, current => {
      let {label, value} = current;

      label.props.label = name;
      value.props.placeholder = name;
    });
  }
};

forEach(method, function (current, key) {
  method[key] = function (...args) {
    current.bind(this)(...args);
    if (this.$refs.formSubmit && this.$refs.formSubmit.formData.isShow) {
      this.$nextTick(() => {
        this.$refs.formSubmit.f.setFieldsValue(this.$refs.formSubmit.formData);
      });
    }
  };
});

export default method;