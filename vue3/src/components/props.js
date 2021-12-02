export default {
  value: {
    type: [Number, String, Array, Object, Boolean],
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
  preValue: {
    type: [Number, String, Array, Object, Boolean],
    default: undefined,
  },
  echoValue: {
    type: [Number, String, Array, Object, Boolean],
    default: undefined,
  },
  trigger: {
    type: [Number, String, Array, Object],
    default: undefined,
  },
  triggeraction: {
    type: Function,
    default: undefined,
  },
  triggerclear: {
    type: Array,
    default: undefined,
  },
  initialValue: {
    type: [Number, String, Array, Object, Boolean],
    default: undefined,
  },
  clear: {
    type: Boolean,
    default: undefined,
  },
  checked: {
    type: Boolean,
    default: undefined,
  },
};
