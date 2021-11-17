<template>
  <div>
    <a-select
      v-bind="attrs"
      v-on="events"
      :value="modelValue"
      @update:value="modelValue = $event"
    >
      <!-- @change="$emit('update:modelValue', $event)" -->
      <slot />
    </a-select>
  </div>
</template>
<script>
import { onMounted, reactive, watch, inject } from "vue";
import { forEach, isFunction, cloneDeep } from "lodash";
export default {
  props: ["modelValue", "inner", "outer", "preValue", "trigger", "triggerFn"],
  emits: ["update:modelValue", "update:preValue"],
  setup(props, w) {
    /* 接受form给的数据 */
    let isEdit = inject("isEdit");
    let formData = inject("formData");

    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 获取属性 */
    let attrs = reactive({ ...events });

    /* 进口处理 */
    // 判断是不是回显
    if (isEdit) {
      if (props.inner) {
        watch(
          () => formData._isFinish,
          (newValue, oldValue) => {
            let obj = {};
            props.inner(obj, formData._detailData);
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
                    attrs[k] = d;
                  });
                } else {
                  attrs[k] = r;
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
                attrs[k] = d;
              });
            } else {
              attrs[k] = r;
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
    if ("trigger" in props && "triggerFn" in props) {
      watch(
        () => props.trigger,
        (newValue, oldValue) => {
          let obj = {};
          props.triggerFn(obj);
          forEach(obj, (v, k) => {
            let r;
            if (isFunction(v)) {
              r = v();
            } else {
              r = v;
            }
            if (r instanceof Promise) {
              r.then((d) => {
                attrs[k] = d;
              });
            } else {
              attrs[k] = r;
            }
          });
        }
      );
    }
    return {
      attrs,
      events,
    };
  },
};
</script>
