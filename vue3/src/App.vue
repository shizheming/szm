<script>
import { bing } from "./relationship";
export default {
  setup() {
    let ssss = [
      {
        be: "linkage",
        name: "a",
        relationship: [
          {
            be: "judge",
            name: "b",
            relationship: [
              {
                be: "state",
                component: "input",
                name: "inputState",
                relationship: [
                  {
                    state: "show",
                    relationship: {
                      be: "judge",
                      name: "j",
                      relationship: [
                        {
                          name: "d",
                        },
                        {
                          be: "linkage",
                          name: "e",
                          relationship: "c",
                        },
                      ],
                    },
                  },
                  {
                    state: "hide",
                    relationship: {
                      be: "linkage",
                      name: "f",
                      relationship: "d",
                    },
                  },
                  {
                    state: "able",
                  },
                  {
                    state: "disabled",
                  },
                ],
              },
              {
                name: "h",
              },
            ],
          },
          {
            name: "i",
          },
        ],
      },
    ];

    let fnObj = {
      a() {
        console.log("a");
        return "a";
      },
      b() {
        console.log("b");
        return ["inputState", 20, 39];
      },
      c() {
        console.log("c");
        return "e";
      },
      d(v) {
        console.log("d");
        return v;
      },
      e(v) {
        console.log("e", v);
        return v;
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
      i(v) {
        console.log("i", v);
        return v;
      },
      j(v) {
        console.log("j", v);
        return ["e", v];
      },
      input(data) {
        console.log(data, 20);
        let dom = select({
          type: data,
        });
        console.log(dom, 12);
        return dom;
      },
      inputState() {
        console.log("inputState");
        return ["hide", "show", "disabled", "able"][displayName];
      },
    };
    let displayName = 1;

    function select(data = {}) {
      // console.log(hh,222111111111111111111111111)
      let disabled = true;
      const { type } = data;
      let xxxxxxxxx = function() {
        console.log(123);
        return (
          <a-select
            style={{ width: "40%" }}
            placeholder="54545"
            disabled={disabled}
            options={[
              {
                label: 111,
                value: 1,
              },
              {
                label: 222,
                value: 99,
              },
            ]}
            {...data}
          />
        );
      };
      if (type === "show") {
        console.log("show", "render");
        return xxxxxxxxx();
      } else if (type === "disabled") {
        console.log("disabled", "render");
        disabled = true;
        return xxxxxxxxx();
      } else if (type === "able") {
        console.log("able", "render");
        disabled = false;
        return xxxxxxxxx();
      }
    }
    bing(ssss, fnObj, 2, 3);
    console.log(bing.data, "data2");
    return () => {
      return (
        <div>
          {bing.data.input}
          <div>123123</div>
        </div>
      );
    };
  },
};
</script>
<style lang="less"></style>
