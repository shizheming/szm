<template>
  <a-modal
    :visible="props.visible"
    title="title"
    :confirmLoading="confirmLoading"
    @ok="ok"
    @cancel="cancel"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible", "success"]);
const confirmLoading = ref();

const ok = async () => {
  confirmLoading.value = true;
  try {
    await new Promise((resolve) => resolve());
    confirmLoading.value = false;
    emits("success");
    emits("update:visible", false);
  } catch (e) {
    confirmLoading.value = false;
  }
};

const cancel = () => {
  emits("update:visible", false);
};
</script>
