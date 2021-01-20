<script>
import { bing } from "./relationship";
export default {
  setup() {
    let input = function(a, b) {
      return a && <input disabled={b} />;
    };
    let fnObj = {
      a() {
        console.log("a");
      },
      b() {
        console.log("b");
        return "input";
      },
      c() {
        console.log("c");
        return 'e'
      },
      d(v) {
        console.log("d");
        return v;
      },
      e(v) {
        console.log("e");
        return ["f", v];
      },
      f(v) {
        console.log("f");
        return "g";
      },
      g() {
        console.log("g");
      },
      h() {
        console.log("h");
      },
      i() {
        console.log("i");
      },
      j() {
        console.log("j");
      },
    };

    return () => {
      return (
        <div>
          <div id="nav">
            <router-link to="/relationship">relationship</router-link> |
            <router-link to="/linkage">linkage</router-link>
          </div>
          <router-view />
        </div>
      );
    };
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
