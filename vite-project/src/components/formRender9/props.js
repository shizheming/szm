export default {
  value: {
    type: [Number, String, Array, Object, Boolean],
    default: undefined,
  },
  checked: {
    type: Boolean,
    default: undefined,
  },
  isDetail: {
    type: Boolean,
    default: undefined,
  },
  inner: {
    type: Function,
    default: undefined,
  },
  outer: {
    type: Function,
    default: undefined,
  },
  trigger: {
    type: Array,
    default: undefined,
  },
  togetherhas: {
    type: Array,
    default: undefined,
  },
  togethernohas: {
    type: Array,
    default: undefined,
  },
  clear: {
    type: Boolean,
    default: undefined,
  },
};
