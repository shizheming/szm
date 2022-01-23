<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="demo">
      首页
    </a-menu-item>
    <a-menu-item key="film">
      <router-link to="/film">电影</router-link>
    </a-menu-item>
    <a-menu-item key="TVplay">
      <router-link to="/TVplay">电视剧</router-link>
    </a-menu-item>
    <a-menu-item key="animation">
      <router-link to="/animation">动画电影</router-link>
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
    const current = ref(['demo']);
    return {
      current,
    };
  },

});
</script>