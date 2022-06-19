export const props = {
  leftCol: {
    type: Number,
    default: 7
  },
  rightCol: {
    type: Number,
    default: 14
  },
  submitData: {
    type: Object,
    default () {
      return {};
    }
  },
  column: {
    type: Number,
    default: 1
  },
  source: {
    type: Array,
    default () {
      return [];
    }
  },
  submitButton: {
    type: Boolean,
    default: true
  },
  submit: {
    type: Function,
    default () {
      return function () {};
    }
  },
};

export const component = {
  // input框
  input (data) {
    return <a-input allow-clear={true} {...data}/>;
  },
  // select选择器
  select (data) {
    return <a-select allowClear={true} {...data}/>;
  },
  // 单项选择器
  radio (data) {
    return <a-radio-group {...data}/>;
  },
  checkbox (data) {
    return <a-checkbox-group {...data} />;
  },
  // 文本框
  textarea (data) {
    return <a-textarea {...data}/>;
  },
};