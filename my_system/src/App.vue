<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <relationship/>
    <discontinuity/>
  </div>
</template>

<script>
import relationship from './components/relationship.vue'
import discontinuity from './components/discontinuity.vue'

export default {
    name: 'app',
    components: {
        relationship,
        discontinuity
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
