<template>
  <Form v-bind="p" ref="formRender">
    <slot></slot>
  </Form>
</template>

<script setup>
import { reactive, provide, ref, onMounted, nextTick, toRaw } from "vue";
import { Form } from "ant-design-vue";
import { cloneDeep, forEach } from "lodash";
import { setLevelValue, getLevelValue } from "./tool";
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
  style: {
    type: [String, Object],
    default: undefined,
  },
  class: {
    type: String,
    default: undefined,
  },
  id: {
    type: String,
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

let setDetail = [];
provide("setDetail", setDetail);

let outerModel = reactive({});
/* 设置外面的fromRender */
const formRender = ref();
defineExpose({
  outerModel,
  attrsValue: formComponents,
  detail: detailData,
  scrollToField(params) {
    return formRender.value.scrollToField(params);
  },
  resetFields(params) {
    return formRender.value.resetFields(params);
  },
  clearValidate(params) {
    return formRender.value.clearValidate(params);
  },
  validate(params) {
    return formRender.value.validate(params).then(() => {
      // 处理outer所有的函数
      forEach(cloneDeep(p.model), (value, key) => {
        if (!outer[key]) {
          outerModel[key] = value;
        }
      });
      // 处理嵌套层级数据
      forEach(outer, (value, key) => {
        setLevelValue(key, value(), outerModel);
      });
    });
  },
});

// 通过nextTick来设值，一个接着一个，而不是一下子设，主要是为了解决triggerclear这个问题，当然这个不是此功能本身的问题
function forSetDetail(detail) {
  for (let v of setDetail) {
    v(detail);
  }
}

/* 编辑页操作 */
if (p.isEdit && p.api) {
  p.api().then((data) => {
    detailData.value = data;
    isFinish.value = true;
    forSetDetail(data);
  });
}
</script>
