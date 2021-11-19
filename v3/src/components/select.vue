<template>
  <a-select v-bind="newAttrs">
    <slot />
  </a-select>
</template>
<script>
import { onMounted, reactive, watch, inject } from "vue";
import { forEach, isFunction, cloneDeep } from "lodash";
export default {
  props: ["modelValue", "inner", "outer", "preValue", "trigger", "triggerAction"],
  emits: ["update:modelValue", "update:preValue"],
  setup(props, w) {
    /* 接受form给的数据 */
    let isEdit = inject("isEdit");
    let formData = inject("formData");
    let detailData = inject("detailData");

    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 进口处理 */
    // 判断是不是回显
    let newAttrs = reactive({})
    if (isEdit) {
      if (props.inner) {
        watch(
          () => formData._isFinish,
          (newValue, oldValue) => {
            let obj = {};
            props.inner(obj, detailData.value);
            forEach(obj, (v, k) => {
              if (k === "detail") {
                w.emit("update:modelValue", v);
              } else {
                let r;
                if (isFunction(v)) {
                  r = v();
                } else {
                  r = v;
                }
                if (r instanceof Promise) {
                  r.then((d) => {
                    newAttrs[k] = d;
                  });
                } else {
                  newAttrs[k] = r;
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
                newAttrs[k] = d;
              });
            } else {
              newAttrs[k] = r;
            }
          });
        });
      }
    }

    /* 记录上一次的值 */
    if ("preValue" in props) {
      watch(
        () => props.modelValue,
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
                newAttrs[k] = d;
              });
            } else {
              newAttrs[k] = r;
            }
          });
        }
      );

      // outer函数
      if ("outer" in props) {

      }
    }
    return {
      newAttrs,
      events,
    };
  },
};
</script>
