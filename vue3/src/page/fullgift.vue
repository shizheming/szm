<template>
  <s-form
    :model="formData"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 7 }"
    ref="formSection"
  >
    <s-form-item
      label="活动名称"
      :rules="{
        required: true,
        validator: nameRule,
      }"
      name="name"
    >
      <s-input v-model:value="formData.name" placeholder="10个字以内" />
    </s-form-item>
    <s-form-item :wrapper-col="{ offset: 7 }">
      <s-button :loading="loading" @click="next">下一步</s-button>
    </s-form-item>
  </s-form>
</template>
<script setup>
import axios from "../api";
import { ref, toRefs, reactive, onMounted } from "vue";
const formSection = ref();
const formData = reactive({});
let loading = ref();

function nameRule(rule, value) {
  if (!value) {
    return Promise.reject("请输入名称");
  } else if (value.length > 10) {
    return Promise.reject("名称不能大于10个字符");
  } else {
    return Promise.resolve();
  }
}

// 下一步
function next() {
  formSection.value
    .validate()
    .then(() => {
      console.log("values", formData);
      console.log("最后的值", formSection.value.outerModel);
    })
    .catch((error) => {
      console.log("error", formData);
    });
}
</script>
