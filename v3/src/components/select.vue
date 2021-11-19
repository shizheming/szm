<template>
  <Select v-bind="newProps" :value="value">
    <slot />
  </Select>
</template>
<script>
import { onMounted, reactive, watch, inject } from "vue";
import { forEach, isFunction } from "lodash";
import { Select } from "ant-design-vue";
export default {
  props: {
    value: {
      type: [Number, String],
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
      type: [Number, String],
      default: undefined,
    },
    trigger: {
      type: [Number, String],
      default: undefined,
    },
    triggerAction: {
      type: Function,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    ...Select.props,
  },
  emits: ["update:value", "update:preValue"],
  components: { Select },
  setup(props, w) {
    /* 接受form给的数据 */
    let isEdit = inject("isEdit");
    let detailData = inject("detailData");
    let isFinish = inject("isFinish");
    let outer = inject("outer");

    // 把change包一下，我要在里面更新数据
    let newProps = reactive({ ...props });
    newProps.onChange = (e) => {
      w.emit("update:value", e);
      props.onChange(e);
    };

    /* 进口处理 */
    // 判断是不是回显
    if (isEdit) {
      if (props.inner) {
        watch(
          () => isFinish.value,
          (newValue, oldValue) => {
            let obj = {};
            props.inner(obj, detailData.value);
            forEach(obj, (v, k) => {
              if (k === "detail") {
                w.emit("update:value", v);
              } else {
                let r;
                if (isFunction(v)) {
                  r = v();
                } else {
                  r = v;
                }
                if (r instanceof Promise) {
                  r.then((d) => {
                    newProps[k] = d;
                  });
                } else {
                  newProps[k] = r;
                }
              }
            });
          }
        );
      }
    } else {
      if (props.inner) {
        onMounted(() => {
          let obj = {};
          props.inner(obj);
          forEach(obj, (v, k) => {
            let r;
            if (isFunction(v)) {
              r = v();
            } else {
              r = v;
            }
            if (r instanceof Promise) {
              r.then((d) => {
                newProps[k] = d;
              });
            } else {
              newProps[k] = r;
            }
          });
        });
      }
    }

    /* 记录上一次的值 */
    if ("preValue" in props) {
      watch(
        () => props.value,
        (newValue, oldValue) => {
          w.emit("update:preValue", oldValue);
        }
      );
    }

    /* 触发联动机制 */
    if ("trigger" in props && "triggerAction" in props) {
      watch(
        () => props.trigger,
        (newValue, oldValue) => {
          let obj = {};
          props.triggerAction(obj);
          forEach(obj, (v, k) => {
            let r;
            if (isFunction(v)) {
              r = v();
            } else {
              r = v;
            }
            if (r instanceof Promise) {
              r.then((d) => {
                newProps[k] = d;
              });
            } else {
              newProps[k] = r;
            }
          });
        }
      );

      // outer函数
      if ("outer" in props) {
        outer[props.name] = () => {
          return props.outer(props.value);
        };
      } else {
        outer[props.name] = () => {
          return props.value;
        };
      }
    }
    return {
      newProps,
    };
  },
};
</script>
