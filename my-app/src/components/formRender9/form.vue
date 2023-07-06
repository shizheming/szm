<template>
  <Form v-bind="newSlots" ref="formRender">
    <slot />
  </Form>
</template>

<script setup lang="ts">
import {
  reactive,
  provide,
  ref,
  onMounted,
  nextTick,
  toRaw,
  watch,
  useSlots,
  watchEffect,
  useAttrs,
} from 'vue';
import { Form } from 'ant-design-vue';
import { cloneDeep, forEach, last, isArray } from 'lodash';
import { setLevelValue, getLevelValue } from './tool';
import { FormInstance } from 'ant-design-vue';
const attrs = useAttrs();

const propsObject = defineProps({
  isEdit: {
    type: Boolean,
    default: undefined,
  },
  finish: {
    type: Function,
    default: () => {},
  },
});

const slots = useSlots();
let newSlots: { [name: string]: any } = {};

forEach(slots, (value, key) => {
  newSlots[key] = (value as () => {})();
});
// 判断是不是编辑页
provide('isEdit', propsObject.isEdit);

// 收集表单里面的组件的outer函数
const outer = reactive<{ [narme: string]: (v: any) => {} }>({});
provide('outer', outer);

const formRender = ref();
/* 
const emitsFunction = defineEmits<{
  (event: 'finish', value: any): void;
}>();
const outerModel = reactive<{ [narme: string]: any }>({});
// 没有绑在组件上得值是带不进去，还想做出参得outer呢，看起来不行
const formFinishFunction: FormInstance['onFinish'] = (data) => {
  console.log(data, 123);
  // 处理outer所有的函数
  forEach(data, (value, key) => {
    if (!outer[key]) {
      outerModel[key] = value;
    }
  });
  // 处理嵌套层级outer数据
  forEach(outer, (value, key) => {
    setLevelValue(key, value(data), outerModel);
  });
  emitsFunction('finish', outerModel);
}; */

defineExpose({
  scrollToField(params: any) {
    return formRender.value.scrollToField(params);
  },
  // 这个有问题，样式能干掉，值干不掉
  resetFields() {
    return formRender.value.resetFields();
  },
  clearValidate(params: any) {
    return formRender.value.clearValidate(params);
  },
  validate(params: any) {
    return formRender.value.validate(params);
  },
  onlyValidate(params: any) {
    return formRender.value.validateFields(params);
  },
});
</script>
