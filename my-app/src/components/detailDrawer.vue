<template>
  <a-drawer :visible="props.visible" title="title" @close="close">
    <a-descriptions>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
      <a-descriptions-item label="label">label</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>
<script setup lang="ts">
const props = defineProps(['visible']);
const emits = defineEmits(['update:visible']);
const close = () => {
  emits('update:visible', false);
};
</script>
