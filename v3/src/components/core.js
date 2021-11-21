import { onMounted, reactive, watch, inject } from "vue";
import { forEach, tail } from "lodash";
export default function (props, w, componentType) {
  /* 接受form给的数据 */
  let isEdit = inject("isEdit");
  let detailData = inject("detailData");
  let isFinish = inject("isFinish");
  let outer = inject("outer");

  /* 把change包一下，我要在里面更新数据 */
  let newProps = reactive({ ...props });
  newProps.onChange = (e) => {
    let nv = e;
    if (componentType === "input" || componentType === "radioGroup") {
      nv = e.target.value;
      w.emit("update:value", nv);
    } else if (componentType === "radio" || componentType === "checkbox") {
      nv = e.target.checked;
      w.emit("update:checked", nv);
    } else if (componentType === "switch") {
      w.emit("update:checked", nv);
    } else {
      w.emit("update:value", nv);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  /* 进口处理，判断是不是回显*/
  if (isEdit) {
    if (props.inner) {
      watch(
        () => isFinish.value,
        (newValue, oldValue) => {
          let obj = {};
          props.inner(obj, detailData.value);
          forEach(obj, (v, k) => {
            if (k === "detail") {
              w.emit("update:value", v);
            } else {
              if (v.toString().includes("_next")) {
                v().then((d) => {
                  newProps[k] = d;
                });
              } else {
                newProps[k] = v;
              }
            }
          });
        }
      );
    }
  } else {
    if (props.inner) {
      onMounted(() => {
        let obj = {};
        props.inner(obj);
        forEach(obj, (v, k) => {
          if (v.toString().includes("_next")) {
            v().then((d) => {
              newProps[k] = d;
            });
          } else {
            newProps[k] = v;
          }
        });
      });
    }
  }

  /* 记录上一次的值 */
  watch(
    () => props.value,
    (newValue, oldValue) => {
      w.emit("update:preValue", oldValue);
    }
  );

  /* 触发机制，默认的不具名的触发 */
  if (props.triggeraction) {
    watch(
      () => props.trigger,
      (newValue, oldValue) => {
        let obj = {};
        props.triggeraction(obj);
        forEach(obj, (v, k) => {
          if (v.toString().includes("_next")) {
            v().then((d) => {
              newProps[k] = d;
            });
          } else {
            newProps[k] = v;
          }
        });
      }
    );
  }

  /* 具名的触发机制 */
  forEach(w.attrs, (value, key) => {
    if (/^triggeraction-/.test(key)) {
      let [name] = tail(key.split("-"));
      let n = name[0].toUpperCase() + name.slice(1);
      console.log(name, 77);
      watch(
        () => props[`trigger${n}`],
        (newValue, oldValue) => {
          console.log(123);
          let result = w.attrs[`triggeraction-${name}`](newValue);
          if (result.toString().includes("_next")) {
            result().then((d) => {
              newProps[name] = d;
            });
          } else {
            newProps[name] = result;
          }
        }
      );
    }
  });

  /* outer函数 */
  if (props.outer) {
    outer[props.name] = () => {
      return props.outer(props.value);
    };
  } else {
    outer[props.name] = () => {
      return props.value;
    };
  }
  return newProps;
}
