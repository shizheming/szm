<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { relationship } from "hypnos-szm";
export default {
  setup() {
    function a() {
      alert("a");
    }
    function b() {
      alert("b");
    }
    function c() {
      alert("c");
    }
    function d() {
      alert("d");
    }
    function e() {
      alert("e");
    }
    function f() {
      alert("f");
    }

    let s = relationship([
      {
        name: "a",
        relationship: {
          name: "b",
          relationship: "f",
        },
      },
      {
        name: "b",
        relationship: [
          {
            name: "f",
          },
          {
            name: "e",
          },
        ],
      },
      {
        name: "c",
        relationship: [
          {
            name: "f",
          },
          {
            name: "a",
            relationship: {
              name: "b",
              relationship: [
                {
                  name: "f",
                },
                {
                  name: "d",
                  relationship: [
                    {
                      name: "e",
                    },
                    {
                      name: "f",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ]);
    console.log(s, 10);
    return () => {
      return "relationship";
    };
  },
};
</script>
