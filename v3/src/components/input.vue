<template>
  <a-input />
</template>
<script>
import { onMounted, reactive, watch } from "vue";
import { forEach, isFunction, cloneDeep } from "lodash";
export default {
  props: ["modelValue", "inner", "outer", "preValue", "trigger"],
  emits: ["update:modelValue", "update:preValue"],
  setup(props, w) {
    return {};
  },
};
</script>
