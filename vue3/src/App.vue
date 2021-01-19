<script>
import { bing } from "./relationship";
export default {
  setup() {
    let hhhhhh = [
      {
        be: "linkage",
        name: "a",
        relationship: [
          {
            be: "judge",
            name: "b",
            relationship: [
              {
                name: "c",
              },
              {
                name: "d",
              },
            ],
          },
          {
            be: "linkage",
            name: "e",
            relationship: {
              be: "judge",
              name: "ff",
              relationship: [
                {
                  name: "g",
                },
                {
                  name: "h",
                },
              ],
            },
          },
          {
            be: "linkage",
            name: "i",
            relationship: "j",
          },
        ],
      },
    ];

    let fnObj = {
      a() {
        console.log("a");
      },
      b() {
        console.log("b");
        return "d";
      },
      c() {
        console.log("c");
      },
      d(v) {
        console.log("d");
        return v;
      },
      e(v) {
        console.log("e");
        return ["ff", v];
      },
      ff(v) {
        console.log("ff", v);
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
