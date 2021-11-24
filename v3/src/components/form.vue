<template>
  <a-form v-bind="p" ref="formRender">
    <slot></slot>
  </a-form>
</template>

<script setup>
import { reactive, provide, ref, onMounted, useAttrs } from "vue";
import { Form } from "ant-design-vue";
import { cloneDeep, forEach } from "lodash";

const p = defineProps({
  ...Form.props,
  api: {
    type: Function,
    default: undefined,
  },
  model: {
    type: Object,
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
const emit = defineEmits(["setForm"]);

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

/* 设置外面的fromRender */
const formRender = ref();
onMounted(() => {
  emit("setForm", formRender);
  // 包一下验证方法，为了outer函数
  let ve = formRender.value.validate;
  formRender.value.validate = () => {
    // 处理outer所有的函数
    if (p.outerModel) {
      forEach(outer, (value, key) => {
        p.outerModel[key] = value();
      });
    }
    return ve();
  };
});

/* 回显数据 */
if (p.isEdit && p.api) {
  p.api().then((data) => {
    detailData.value = data;
    isFinish.value = true;
  });
}
</script>
