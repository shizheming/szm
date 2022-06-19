<script>
import defaultComponent from './component.js';
import {isObject, last, cloneDeep, isInteger, values, fromPairs} from 'lodash';
import methods from './methods';
import {recursive} from 'hypnos-szm';
export default {
  data () {
    return {
      labelCol: {
        span: this.leftCol
      },
      wrapperCol: {
        span: this.rightCol
      },
      allCompontent: {}
    };
  },
  props: {
    leftCol: {
      type: Number,
      default: 6
    },
    rightCol: {
      type: Number,
      default: 16
    },
    form: {
      type: Object,
      default () {
        return {};
      }
    },
    rules: {
      type: Object,
      default () {
        return {};
      }
    },
    source: {
      type: Array,
      default () {
        return [];
      }
    },
    myComponent: {
      type: Object,
      default () {
        return {};
      }
    },
    group: {
      type: Object,
      default () {
        return {};
      }
    },
    submitButton: {
      type: Boolean,
      default: true
    },
    submitButtonWidth: {
      type: String,
      default: '100%'
    },
    submit: {
      type: Function,
      default () {
        return function () {};
      }
    }
  },
  watch: {
    source: {
      deep: true,
      handler: function (newV, oldV) {
        this.$forceUpdate();
      }
    }
  },
  created () {
    this.source.forEach((current, index) => {
      if (current.isShow === undefined) this.$set(current, 'isShow', true);
    });
    Object.assign(this.allCompontent, defaultComponent, this.myComponent);
  },
  mounted () {
  },
  methods: {
    ...methods,
    userInitFormData (data) {
      const keys = data.map(({content: {value}}) => value);
      const fd = fromPairs(keys.map(current => {
        return [current, undefined];
      }));

      function formKeys2 (keys, obj = {}) {
        keys.forEach(current => {
          let arr = current.split('=>');

          if (arr.length === 1) {
            obj[current] = undefined;
          } else if (arr.length === 2) {
            obj[arr[0]] = Object.assign(
              obj[arr[0]] ? obj[arr[0]] : {},
              {[arr[1]]: undefined}
            );
          } else {
            // 多级
            let newKeys = arr.splice(1).join('=>');

            obj[arr[0]] = obj[arr[0]] ? obj[arr[0]] : {};
            formKeys2([newKeys], obj[arr[0]]);
          }
        });
        return obj;
      }
      return Object.assign(fd, formKeys2(keys));
    },
    addEvent (source, listeners) {
      listeners = Object.entries(listeners).map(([name, fn]) => {
        let exp = /[:]/;
        let s = name.split(exp);

        return [...s, fn];
      });
      source.forEach((current) => {
        let {content: {value}} = current;

        listeners.forEach(([name, type, fn]) => {
          if (name === value) {
            current.content.on = {
              [type]: fn
            };
          }
        });
      });
    },
    onChange (obj, value) {
      if (obj.target) {
        this.form[value] = obj.target.value;
      } else {
        this.form[value] = obj;
      }
    },
    setDeepObjValue (obj, value) {
      let arr = value.split('=>');
      let itemValue = this.form;

      if (arr.length > 1) {
        arr.forEach((current, index) => {
          if (index < arr.length - 1) {
            itemValue = itemValue[current];
          }
        });

        if (obj.target) {
          itemValue[last(arr)] = obj.target.value;
        } else {
          itemValue[last(arr)] = obj;
        }
      }
    },
    formSubmit (callback = function () {}) {
      // 处理数据，把类数组的对象变成数组
      recursive(this.form, undefined, (value, key, collection) => {
        let arr = Object.keys(value);

        if (arr.every(current => isInteger(Number(current)))) {
          collection[key] = Object.values(value);
        }
      });
      console.log(this.form, '提交的数据');
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          callback();
          this.submit();
        }
      });
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    },
    renderDom () {
      let {form, onChange, source, allCompontent, setDeepObjValue} = this;

      this.addEvent(source, this.$listeners);
      return source.map(current => {
        let {
          isShow,
          content: {
            value,
            type,
            props,
            on = {},
            style = {}
          },
          label
        } = current;

        if (isShow === false || !allCompontent[type]) return;
        let arr = value.split('.');

        return (
          <a-form-model-item ref="name" style={{width: '100%', display: 'inline-block'}} {...label} prop={value}>
            {
              allCompontent[type].call(this, {
                style,
                props: {
                  ...props,
                  value: form[value]
                },
                on: {
                  ...on,
                  change: (e) => {
                    // 1.给表单绑定的值赋值
                    onChange(e, value);
                    // 2.给表单嵌套的对象赋值
                    setDeepObjValue(e, value);
                    // 运行自定义事件
                    let [key] = Object.keys(on);

                    if (key) {
                      on[key](e);
                    }
                  }
                }
              })
            }
          </a-form-model-item>
        );
      });
    }
  },
  render () {
    let {formSubmit, resetForm, form, rules, labelCol, wrapperCol, renderDom, submitButton, submitButtonWidth} = this;

    return (
      <a-form-model
        ref="ruleForm"
        class='hm-form'
        model={form}
        rules={rules}
        label-col={labelCol}
        wrapper-col={wrapperCol}
      >
        {
          renderDom()
        }
        {
          submitButton &&
        <a-form-model-item wrapper-col={{offset: labelCol.span}} style={{width: submitButtonWidth}}>
          <a-button type="primary" onClick={() => formSubmit()}>提交</a-button>
        </a-form-model-item>
        }
      </a-form-model>
    );
  }
};
</script>
<style lang="less">

</style>