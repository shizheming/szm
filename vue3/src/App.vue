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
                          name: "e",
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
      },
      b() {
        console.log("b");
        return "inputState";
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
        console.log("e",v);
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
        console.log("i",v);
        return v
      },
      j(v) {
        console.log("j",v);
        return ["e", v];
      },
      input(data) {
        console.log(data, 20);
        return select({
          type: data,
        });
      },
      inputState() {
        console.log(1999);
        return ["hide", "show", "disabled", "able"][displayName];
      },
    };
    let displayName = 2;
    
    function select(data = {}) {
      // console.log(hh,222111111111111111111111111)
      let disabled = true;
      const { type } = data;
      let xxxxxxxxx = function() {
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
        console.log("show");
        return xxxxxxxxx();
      } else if (type === "disabled") {
        console.log("disabled");
        disabled = true;
        return xxxxxxxxx();
      } else if (type === "able") {
        console.log("able");
        disabled = false;
        return xxxxxxxxx();
      }
    }
    return () => {
      return <div>{bing(ssss, fnObj,2,3)}</div>;
    };
  },
};
</script>
<style lang="less"></style>
