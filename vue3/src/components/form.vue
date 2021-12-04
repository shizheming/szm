<template>
  <Form v-bind="p" ref="formRender">
    <slot></slot>
  </Form>
</template>

<script setup>
import { reactive, provide, ref, onMounted, defineExpose } from "vue";
import { Form } from "ant-design-vue";
import { cloneDeep, forEach } from "lodash";
import { setLevelValue, getLevelValue } from "./tool";
const p = defineProps({
  ...Form.props,
});

// 收集表单里面的组件的outer函数
let outer = reactive({});
provide("outer", outer);
// 传递formData
provide("formData", p.model);
// 把每个组件所有属性值存下来，给不同的组件用，每个组件都能全局看到所有组件的属性值
let formComponents = reactive({});
provide("formComponents", formComponents);

let outerModel = reactive({});
/* 设置外面的fromRender */
const formRender = ref();
defineExpose({
  outerModel,
  attrsValue: formComponents,
  validate() {
    // 处理outer所有的函数
    forEach(p.model, (value, key) => {
      if (!outer[key]) {
        outerModel[key] = value;
      }
    });
    // 处理嵌套层级数据
    forEach(outer, (value, key) => {
      setLevelValue(key, value(), outerModel);
    });
    return formRender.value.validate();
  },
});
</script>
