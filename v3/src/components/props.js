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
    type: [Number, String, Array, Object],
    default: undefined,
  },
  trigger: {
    type: [Number, String, Array, Object],
    default: undefined,
  },
  triggerAction: {
    type: Function,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
    default: undefined,
  },
};
