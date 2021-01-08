<script>
import HelloWorld from './components/HelloWorld.vue'
// import { Button } from 'ant-design-vue';
// import { h } from 'vue'
export default {
  name: 'App',
  setup(){
    const ggg = 8989
    console.log(ggg,191919)
    return () => {
      return (
        <ul>
        <li>1111111111111</li>
        <li>1111111111111</li>
        <li>1111111111111</li>
        <li><HelloWorld/></li>
        </ul>
        
      )
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
