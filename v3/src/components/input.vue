<template>
  <div>
    <a-input
      v-bind="o"
      v-on="attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
import { onMounted, reactive, watch } from "vue";
import { forEach, isFunction, cloneDeep } from "lodash";
export default {
  props: ["modelValue", "inner", "outer", "preValue", "trigger"],
  emits: ["update:modelValue", "update:preValue"],
  setup(props, w) {
    if ("preValue" in props) {
      watch(
        () => props.modelValue,
        (count, prevCount) => {
          w.emit("update:preValue", prevCount);
        }
      );
    }
    let x = cloneDeep(w.attrs);
    delete x.onChange;
    let o = reactive({ ...x });
    if (props.inner) {
      onMounted(() => {
        let p = {};
        props.inner(p);
        forEach(p, (v, k) => {
          let r;
          if (isFunction(v)) {
            r = v();
          } else {
            r = v;
          }
          if (r instanceof Promise) {
            r.then((d) => {
              o[k] = d;
            });
          } else {
            o[k] = r;
          }
        });
      });
    }
    return {
      o,
      attrs: x,
    };
  },
};
</script>
