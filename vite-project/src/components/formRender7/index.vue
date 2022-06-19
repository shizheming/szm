<script>
import methods from './methods';
import {props} from './props';
import init from './init';

export default {
  data () {
    return {
      // 表单要提交的值
      formData: {},
      // 复制的上一次表单的数据，用来和当前数据比对看看有没有变化，相当于watch
      cloneFormData: {},
      // 用户配置表里面所有的绑定的那个key值
      sourceKeys: this.source.map(({content: {key}}) => key),
      // 复制的上一次组的数据，用来和当前数据比对看看有没有变化，只用于组的显示的时候操作初始化异步函数
      cloneGroupSource: [],
      // 加减存的循环数据
      additionSubtraction: {},
      foot: undefined,
    };
  },
  props,
  created () {
    // 初始foot
    let {formSubmit, submitButton, leftCol} = this;
    let submitButtonStyle = {};

    if (this.column > 1) {
      submitButtonStyle = {
        width: `${100 / this.column}%`,
      };
    }
    this.foot = submitButton &&
          <div style={submitButtonStyle}>
            <a-form-model-item wrapper-col={{offset: leftCol}}>
              <a-button type='primary' icon="save" onClick={() => formSubmit()}>提交</a-button>
            </a-form-model-item>
          </div>;

    // 初始化用户的formData表单数据
    this.init();
    // 运行下同步异步
    this.runAsync();
  },
  methods: {
    ...init,
    ...methods
  },
  render () {
    let {formData, renderDom, foot} = this;

    return (
      <a-form-model
        ref='formComponent'
        class='hm-form'
        model={formData}
      >
        {renderDom()}
        {foot}
      </a-form-model>
    );
  }
};
</script>