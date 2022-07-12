import { ExtractPropTypes } from "vue";
export interface propsInterface {
  isDetail: {
    type: boolean;
    default: undefined;
  };
  inner: {
    type: Function;
    default: undefined;
  };
  trigger: {
    type: [];
    default: undefined;
  };
  outer: {
    type: Function;
    default: undefined;
  };
  [name: string]: any;
}

export default {
  isDetail: {
    type: Boolean,
    default: undefined,
  },
  inner: {
    type: Function,
    default: undefined,
  },
  trigger: {
    type: Array,
    default: undefined,
  },
  outer: {
    type: Function,
    default: undefined,
  },
  // togetherhas: {
  //   type: Array,
  //   default: undefined,
  // },
  // togethernohas: {
  //   type: Array,
  //   default: undefined,
  // },
  // clear: {
  //   type: Boolean,
  //   default: undefined,
  // },
};
