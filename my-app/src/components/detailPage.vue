<template>
  <a-descriptions>
    <a-descriptions-item label="label">label</a-descriptions-item>
    <a-descriptions-item label="label">label</a-descriptions-item>
    <a-descriptions-item label="label">label</a-descriptions-item>
    <a-descriptions-item label="label">label</a-descriptions-item>
  </a-descriptions>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>
