<template>
  <s-form :api="api" :model="formState">
    <a-form-item label="input">
      <s-input v-model="formState.input" placeholder="input" />
    </a-form-item>
    <a-form-item label="select">
      <s-select
        v-model="formState.select"
        v-model:preValue="selectPreValue"
        :trigger="formState.input"
        :triggerFn="triggerSelect"
        placeholder="select222"
        :inner="selectInner"
        :outer="selectOuter"
        mode="tags"
        @change="selectChange"
      />
    </a-form-item>
  </s-form>
  <a-button type="primary" @click="onSubmit">Create</a-button>
</template>
<script>
import { reactive, toRaw, ref, watch } from "vue";
export default {
  setup() {
    const formState = reactive({});
    const selectPreValue = ref();
    watch(
      () => selectPreValue.value,
      () => {
        console.log(3939);
      }
    );

    return {
      formState,
      async api() {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ input: 111111, select: [1, 2] });
          }, 3000);
        });
      },
      triggerSelect(select) {
        // formState.select = [1,2]
        /* select.options = async () => {
          return [
            { label: "cccc", value: 112 },
            { label: "fffff", value: 234 },
          ];
        }; */
      },
      onSubmit() {
        console.log("submit!", toRaw(formState));
      },
      selectPreValue,
      selectInner(select, allData) {
        // 默认值
        formState.select = [1];
        select.options = async () => {
          return [
            { label: "aaaaaa", value: 1 },
            { label: "ddddddddd", value: 2 },
          ];
        };
        select.placeholder = 888888;
        select.detail = 111
      },
      selectOuter() {
        console.log(34343);
      },
      selectChange() {
        console.log(99990);
      },
    };
  },
};
</script>
