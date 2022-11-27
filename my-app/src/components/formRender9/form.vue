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
const p = defineProps({
  isDetail: {
    type: Boolean,
    default: undefined,
  },
  isEdit: {
    type: Boolean,
    default: undefined,
  },
});

const slots = useSlots();
let newSlots: { [name: string]: any } = {};
forEach(slots, (value, key) => {
  newSlots[key] = (value as () => {})();
});
// 判断是不是编辑页
provide('isEdit', p.isEdit);
// 判断是不是详情页
provide('isDetail', p.isDetail);

// 收集表单里面的组件的outer函数
const outer = reactive<{ [narme: string]: (v: any) => {} }>({});
provide('outer', outer);

const outerModel = reactive<{ [narme: string]: any }>({});
/* 设置外面的fromRender */
const formRender = ref();

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
    return formRender.value.validate(params).then((data: any) => {
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
      return outerModel;
    });
  },
  onlyValidate(params: any) {
    return formRender.value.validateFields(params);
  },
});
</script>
