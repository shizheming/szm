import { onMounted, reactive, watch, inject } from "vue";
import { forEach, tail, isArray, isFunction } from "lodash";
export default function (props, emit, attrs, componentType) {
  /* 接受form给的数据 */
  let isEdit = inject("isEdit");
  let detailData = inject("detailData");
  let isFinish = inject("isFinish");
  let outer = inject("outer");
  let formData = inject("formData");

  /* 把change包一下，我要在里面更新数据 */
  let newProps = reactive({ ...props });
  newProps.onChange = (e) => {
    let nv = e;
    if (componentType === "input" || componentType === "radioGroup") {
      nv = e.target.value;
      emit("update:value", nv);
    } else if (componentType === "radio" || componentType === "checkbox") {
      nv = e.target.checked;
      emit("update:checked", nv);
    } else if (componentType === "switch") {
      emit("update:checked", nv);
    } else {
      emit("update:value", nv);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  /* 添加默认值 */
  if (props.initialValue !== undefined) {
    if (componentType === "input" || componentType === "radioGroup") {
      emit("update:value", props.initialValue);
    } else if (componentType === "radio" || componentType === "checkbox") {
      emit("update:checked", props.initialValue);
    } else if (componentType === "switch") {
      emit("update:checked", props.initialValue);
    } else {
      emit("update:value", props.initialValue);
    }
  }

  /* 进口处理，判断是不是回显*/
  if (isEdit) {
    if (props.inner) {
      watch(
        () => isFinish.value,
        (newValue, oldValue) => {
          let obj = {};
          if (props.inner.toString().includes("_next")) {
            props.inner(obj, detailData.value).then(() => {
              forEach(obj, (v, k) => {
                if (k === "detail") {
                  emit("update:value", v);
                } else {
                  if (isFunction(v) && v.toString().includes("_next")) {
                    v().then((d) => {
                      newProps[k] = d;
                    });
                  } else {
                    newProps[k] = v;
                  }
                }
              });
            });
          } else {
            props.inner(obj, detailData.value);
            forEach(obj, (v, k) => {
              if (k === "detail") {
                emit("update:value", v);
              } else {
                if (isFunction(v) && v.toString().includes("_next")) {
                  v().then((d) => {
                    newProps[k] = d;
                  });
                } else {
                  newProps[k] = v;
                }
              }
            });
          }
        }
      );
    }
  } else {
    if (props.inner) {
      onMounted(() => {
        let obj = {};
        if (props.inner.toString().includes("_next")) {
          props.inner(obj).then(() => {
            forEach(obj, (v, k) => {
              if (isFunction(v) && v.toString().includes("_next")) {
                v().then((d) => {
                  newProps[k] = d;
                });
              } else {
                newProps[k] = v;
              }
            });
          });
        } else {
          props.inner(obj);
          forEach(obj, (v, k) => {
            if (isFunction(v) && v.toString().includes("_next")) {
              v().then((d) => {
                newProps[k] = d;
              });
            } else {
              newProps[k] = v;
            }
          });
        }
      });
    }
  }

  /* 记录上一次的值 */
  watch(
    () => props.value,
    (newValue, oldValue) => {
      emit("update:preValue", oldValue);
    }
  );

  /* 触发机制，默认的不具名的触发 */
  if (props.triggeraction) {
    watch(
      () => {
        return props.trigger;
      },
      (newValue, oldValue) => {
        let obj = {};
        props.triggeraction(obj);
        forEach(obj, (v, k) => {
          if (isFunction(v) && v.toString().includes("_next")) {
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
  forEach(attrs, (value, key) => {
    if (/^triggeraction-/.test(key)) {
      let [name] = tail(key.split("-"));
      let n = name[0].toUpperCase() + name.slice(1);
      watch(
        () => props[`trigger${n}`],
        (newValue, oldValue) => {
          let result = attrs[`triggeraction-${name}`](newValue, oldValue);
          if (Object.prototype.toString.call(result) === "[object Promise]") {
            result.then((d) => {
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
