<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  setup(){
    return ()=>{
      return (
        <HelloWorld/>
      )
    }
  }
}
</script>
