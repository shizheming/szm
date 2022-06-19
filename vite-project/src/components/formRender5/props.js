export default {
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
  groupSource: {
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
  obj: {
    type: Object,
    default () {
      return {};
    }
  },
};
