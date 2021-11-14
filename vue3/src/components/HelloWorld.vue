<template>
  <div class="hello">
    <h1 @click="$emit('update:msg', msg + 1)">nihao</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg']
}
</script>
