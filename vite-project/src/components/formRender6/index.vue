<script>
import methods from './methods';
import props from './props';
import init from './init';
import {isFunction} from 'lodash';

export default {
  data () {
    return {
      // 表单要提交的值
      formData: {},
      // 存一下用户表单的key，回显用
      userFormDataKey: undefined,
      // 复制的上一次表单的数据，用来和当前数据比对看看有没有变化，相当于watch
      cloneFormData: {},
      // 用户配置表里面所有的绑定的那个key值
      sourceKeys: this.source.map(({content: {key}}) => key),
      // 复制的上一次组的数据，用来和当前数据比对看看有没有变化，只用于组的显示的时候操作初始化异步函数
      cloneGroupSource: [],
      // 有组概念的source，二维数组
      newSource: [],
      // 加减存的循环数据
      additionSubtraction: {},
      // 第一次
      isOnce: undefined
    };
  },
  props,
  created () {
    // 初始化用户的formData表单数据
    this.init();
    // 运行下组
    this.runGroup();
    // 运行下同步异步
    this.runAsync();
  },
  methods: {
    ...init,
    ...methods
  },
  render () {
    let {formSubmit, formData, renderDom, submitButton, leftCol} = this;
    let submitButtonStyle = {};

    if (this.column > 1) {
      submitButtonStyle = {
        width: `${100 / this.column}%`,
      };
    }

    // 这里运行组函数，不应该放在渲染每一个组件的函数中，因为组是把组件包进去
    this.runGroup();
    return (
      <a-form-model
        ref='formComponent'
        class='hm-form'
        model={formData}
      >
        {this.$scopedSlots.head && this.$scopedSlots.head()}
        {renderDom()}
        {this.$scopedSlots.foot && this.$scopedSlots.foot()}
        {
          submitButton &&
          <div style={submitButtonStyle}>
            <a-form-model-item wrapper-col={{offset: leftCol}} >
              <a-button type='primary' icon="save" onClick={() => formSubmit()}>提交</a-button>
            </a-form-model-item>
          </div>
        }
      </a-form-model>
    );
  }
};
</script>