<template>
  <Form v-bind="p" ref="formRender">
    <slot></slot>
  </Form>
</template>

<script setup>
import { reactive, provide, ref, onMounted, defineExpose } from "vue";
import { Form } from "ant-design-vue";
import { cloneDeep, forEach } from "lodash";
const p = defineProps({
  ...Form.props,
  api: {
    type: Function,
    default: undefined,
  },
  isEdit: {
    type: Boolean,
    default: undefined,
  },
  outerModel: {
    type: Object,
    default: undefined,
  },
});

// 判断是不是编辑页
provide("isEdit", p.isEdit);
// 接口回来的数据
let detailData = ref();
provide("detailData", detailData);
// 在不同的组件里面需要判断接口是否已经请求好了
let isFinish = ref();
provide("isFinish", isFinish);
// 收集表单里面的组件的outer函数
let outer = reactive({});
provide("outer", outer);
// 传递formData
provide("formData", p.model);
// 把每个组件所有属性值存下来，给不同的组件用，每个组件都能全局看到所有组件的属性值
let formComponents = reactive({});
provide("formComponents", formComponents);

/* 设置外面的fromRender */
const formRender = ref();
defineExpose({
  detail: detailData,
  validate() {
    // 处理outer所有的函数
    if (p.outerModel) {
      forEach(outer, (value, key) => {
        p.outerModel[key] = value();
      });
    }
    return formRender.value.validate();
  },
});
/* 回显数据 */
if (p.isEdit && p.api) {
  p.api().then((data) => {
    detailData.value = data;
    isFinish.value = true;
  });
}
</script>
