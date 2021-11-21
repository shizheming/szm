<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" style="margin-bottom:10px;">
    <a-menu-item key="film">
      <router-link to="/film">电影</router-link>
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
    <a-menu-item key="mail">
      Navigation One
    </a-menu-item>
  </a-menu>
  <router-view/>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
  },

  setup() {
    const current = ref(['mail']);
    return {
      current,
    };
  },

});
</script>