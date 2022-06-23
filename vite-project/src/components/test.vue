<template>
  <a-modal :visible="props.visible" title="title" @cancel="cancel">
    <template #footer>
      <a-button type="primary" @click="ok">确定</a-button>
    </template>
    <a-descriptions>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script setup>
const props = defineProps(["visible"]);
const emits = defineEmits(["update:visible"]);
const ok = () => {
  emits("update:visible", false);
};
const cancel = () => {
  emits("update:visible", false);
};
</script>
