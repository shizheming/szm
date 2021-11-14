<template>
  <div>
    <a-select
      v-bind="attrs"
      v-on="events"
      :value="modelValue"
      @change="$emit('update:modelValue', $event)"
    />
  </div>
</template>
<script>
import { onMounted, reactive, watch } from "vue";
import { forEach, isFunction, cloneDeep } from "lodash";
export default {
  props: ["modelValue", "inner", "outer", "preValue", "trigger", "triggerFn"],
  emits: ["update:modelValue", "update:preValue"],
  setup(props, w) {
    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 获取属性 */
    let attrs = reactive({ ...events });

    /* 进口处理 */
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
