import { onMounted, reactive, watch, inject, onUnmounted, useAttrs } from "vue";
import { forEach, tail, isArray, isFunction, drop, isString } from "lodash";
import { setLevelValue, getLevelValue } from "./tool";

export default function (props, emit, componentType) {
  const attrs = useAttrs();
  /* 接受form给的数据 */
  let outer = inject("outer");
  let formData = inject("formData");
  let formComponents = inject("formComponents");
  let componentName = inject("componentName");
  /* 把change包一下，我要在里面更新数据，同时把formComponents传出去，打通表单内的所有数据 */
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
      props.onChange(e, formComponents);
    }
  };

  let emitType;
  if (componentType === "input" || componentType === "radioGroup") {
    emitType = function (value) {
      emit("update:value", value);
    };
  } else if (componentType === "radio" || componentType === "checkbox") {
    emitType = function (value) {
      emit("update:checked", value);
    };
  } else if (componentType === "switch") {
    emitType = function (value) {
      emit("update:checked", value);
    };
  } else {
    emitType = function (value) {
      emit("update:value", value);
    };
  }

  let innerObj = {};
  if (isArray(componentName.value)) {
    formComponents[componentName.value.join(".")] = innerObj;
  } else {
    formComponents[componentName.value] = innerObj;
  }

  if (props.inner) {
    onMounted(() => {
      let obj = {};
      if (props.inner.toString().includes("_next")) {
        props.inner(obj).then(() => {
          forEach(obj, (v, k) => {
            if (isFunction(v)) {
              v().then((d) => {
                obj[`${k}Detail`] = d;
                Object.assign(innerObj, obj);
                newProps[k] = d;
              });
            } else {
              obj[`${k}Detail`] = v;
              Object.assign(innerObj, obj);
              newProps[k] = v;
            }
          });
        });
      } else {
        props.inner(obj);
        forEach(obj, (v, k) => {
          if (isFunction(v)) {
            v().then((d) => {
              console.log(d,190)
              obj[`${k}Detail`] = d;
              Object.assign(innerObj, obj);
              newProps[k] = d;
              console.log(newProps,1666)
            });
          } else if (Object.prototype.toString.call(v) === "[object Promise]") {
            v.then((d) => {
              obj[`${k}Detail`] = d;
              Object.assign(innerObj, obj);
              newProps[k] = d;
            });
          } else {
            obj[`${k}Detail`] = v;
            Object.assign(innerObj, obj);
            newProps[k] = v;
          }
        });
      }
    });
  }

  /* 记录上一次的值 */
  watch(
    () => props.value,
    (newValue, oldValue) => {
      emit("update:preValue", oldValue);
    }
  );

  /* 组件没有了删除对应的值 */
  if (props.clear === true) {
    onUnmounted(() => {
      emitType(undefined);
    });
  }

  /* 触发机制，默认的不具名的触发 */
  if (isArray(props.trigger)) {
    if (isArray(props.trigger[0])) {
      // 监听多个
      props.trigger.forEach((current, index) => {
        watch(
          () => props.trigger[index][0],
          (newValue, oldValue) => {
            let obj = {};
            props.trigger[index][1](obj, /* 全部是实体 */ formComponents);
            forEach(obj, (v, k) => {
              if (isFunction(v)) {
                v().then((d) => {
                  obj[`${k}Detail`] = d;
                  Object.assign(innerObj, obj);
                  newProps[k] = d;
                });
              } else {
                newProps[k] = v;
              }
            });
          }
        );
      });
    } else {
      // 监听单个
      watch(
        () => props.trigger[0],
        (newValue, oldValue) => {
          let obj = {};
          props.trigger[1](obj, /* 全部是实体 */ formComponents);
          forEach(obj, (v, k) => {
            if (isFunction(v)) {
              v().then((d) => {
                obj[`${k}Detail`] = d;
                Object.assign(innerObj, obj);
                newProps[k] = d;
              });
            } else {
              newProps[k] = v;
            }
          });
        }
      );
    }
  }

  /* 具名的触发机制 */
  forEach(attrs, (value, key) => {
    if (/^trigger-/.test(key) && attrs[`switch-${key}`] !== false) {
      let [name] = tail(key.split("-"));
      if (isArray(value[0])) {
        // 监听多个
        value.forEach((current, index) => {
          watch(
            () => attrs[key][index][0],
            (newValue, oldValue) => {
              if (attrs[key][index][1] === "inner") {
                if (
                  isFunction(innerObj[name]) &&
                  innerObj[name].toString().includes("_next")
                ) {
                  innerObj[name]().then((d) => {
                    innerObj[`${name}Detail`] = d;
                    newProps[name] = d;
                  });
                } else if (
                  Object.prototype.toString.call(innerObj[name]) ===
                  "[object Promise]"
                ) {
                  innerObj[name].then((d) => {
                    innerObj[`${name}Detail`] = d;
                    newProps[name] = d;
                  });
                } else {
                  newProps[name] = innerObj[name];
                }
              } else {
                let result = attrs[key][index][1](formComponents);
                if (
                  Object.prototype.toString.call(result) === "[object Promise]"
                ) {
                  result.then((d) => {
                    innerObj[`${name}Detail`] = d;
                    newProps[name] = d;
                  });
                } else {
                  newProps[name] = result;
                }
              }
            }
          );
        });
      } else {
        // 监听单个
        watch(
          () => attrs[key][0],
          (newValue, oldValue) => {
            if (attrs[key][1] === "inner") {
              if (
                isFunction(innerObj[name]) &&
                innerObj[name].toString().includes("_next")
              ) {
                innerObj[name]().then((d) => {
                  innerObj[`${name}Detail`] = d;
                  newProps[name] = d;
                });
              } else if (
                Object.prototype.toString.call(innerObj[name]) ===
                "[object Promise]"
              ) {
                innerObj[name].then((d) => {
                  innerObj[`${name}Detail`] = d;
                  newProps[name] = d;
                });
              } else {
                newProps[name] = innerObj[name];
              }
            } else {
              let result = attrs[key][1](formComponents);
              if (
                Object.prototype.toString.call(result) === "[object Promise]"
              ) {
                result.then((d) => {
                  innerObj[`${name}Detail`] = d;
                  newProps[name] = d;
                });
              } else {
                newProps[name] = result;
              }
            }
          }
        );
      }
    }
  });

  /* 联动关系清除值或属性 */
  // switch是开关
  if (props.triggerclear && attrs["switch-triggerclear"] !== false) {
    // 判断是不是二维数组，知道是不是要监听多个值
    if (isArray(props.triggerclear[0])) {
      props.triggerclear.forEach((current, index) => {
        watch(
          () => props.triggerclear[index][0],
          (newValue, oldValue) => {
            drop(current).forEach((value, key) => {
              if (isString(value)) {
                // 等于undefined清，也就是说，上面的值没有了，我也没有了
                if (value === "value" && newValue === undefined) {
                  emitType(undefined);
                } else if (value === "values") {
                  // 这里说明上面的值只要变了，我就清自己
                  emitType(undefined);
                } else {
                  newProps[value] = undefined;
                }
              } else if (isFunction(value)) {
                // 等于undefined清，也就是说，上面的值没有了，我也没有了
                if (value.name === "value" && newValue === undefined) {
                  if (value()) emitType(undefined);
                } else if (value.name === "values") {
                  // 这里说明上面的值只要变了，我就清自己
                  if (value()) emitType(undefined);
                }
              }
            });
          }
        );
      });
    } else {
      watch(
        () => props.triggerclear[0],
        (newValue, oldValue) => {
          drop(props.triggerclear).forEach((value, key) => {
            // 等于undefined清，也就是说，上面的值没有了，我也没有了
            if (value === "value" && newValue === undefined) {
              emitType(undefined);
            } else if (value === "values") {
              // 这里说明上面的值只要变了，我就清自己
              emitType(undefined);
            } else {
              newProps[value] = undefined;
            }
          });
        }
      );
    }
  }

  /* 同时满足有的条件监听 */
  if (props.togetherhas) {
    watch(
      props.togetherhas[0].map((cur, index) => {
        return () => props.togetherhas[0][index];
      }),
      (newValue, oldValue) => {
        if (
          newValue[0] !== undefined &&
          newValue[1] !== undefined &&
          newValue[0] !== "" &&
          newValue[1] !== ""
        ) {
          let obj = {};
          props.togetherhas[1](obj, /* 全部是实体 */ formComponents);
          forEach(obj, (v, k) => {
            if (isFunction(v)) {
              v().then((d) => {
                obj[`${k}Detail`] = d;
                Object.assign(innerObj, obj);
                newProps[k] = d;
              });
            } else {
              newProps[k] = v;
            }
          });
        }
      }
    );
  }

  /* 同时满足无的条件监听 */
  if (props.togethernohas) {
    watch(
      props.togethernohas[0].map((cur, index) => {
        return () => props.togethernohas[0][index];
      }),
      (newValue, oldValue) => {
        if (
          (newValue[0] === undefined && newValue[1] === undefined) ||
          (newValue[0] === "" && newValue[1] === "")
        ) {
          let obj = {};
          props.togethernohas[1](obj, /* 全部是实体 */ formComponents);
          forEach(obj, (v, k) => {
            if (isFunction(v)) {
              v().then((d) => {
                obj[`${k}Detail`] = d;
                Object.assign(innerObj, obj);
                newProps[k] = d;
              });
            } else {
              newProps[k] = v;
            }
          });
        }
      }
    );
  }

  /* 同时满足有的条件具名属性监听 */
  forEach(attrs, (value, key) => {
    if (/^togetherhas-/.test(key)) {
      let [name] = tail(key.split("-"));
      watch(
        value.map((cur, index) => {
          return () => attrs[key][0][index];
        }),
        (newValue, oldValue) => {
          if (
            newValue[0] !== undefined &&
            newValue[1] !== undefined &&
            newValue[0] !== "" &&
            newValue[1] !== ""
          ) {
            let result = attrs[key][1](formComponents);
            if (Object.prototype.toString.call(result) === "[object Promise]") {
              result.then((d) => {
                innerObj[`${name}Detail`] = d;
                newProps[name] = d;
              });
            } else {
              newProps[name] = result;
            }
          }
        }
      );
    }
  });

  /* 同时满足有的条件具名属性监听 */
  forEach(attrs, (value, key) => {
    if (/^togethernohas-/.test(key)) {
      let [name] = tail(key.split("-"));
      watch(
        value.map((cur, index) => {
          return () => attrs[key][0][index];
        }),
        (newValue, oldValue) => {
          if (
            (newValue[0] === undefined && newValue[1] === undefined) ||
            (newValue[0] === "" && newValue[1] === "")
          ) {
            let result = attrs[key][1](formComponents);
            if (Object.prototype.toString.call(result) === "[object Promise]") {
              result.then((d) => {
                innerObj[`${name}Detail`] = d;
                newProps[name] = d;
              });
            } else {
              newProps[name] = result;
            }
          }
        }
      );
    }
  });

  /* outer函数 */
  if (props.outer) {
    if (isString(componentName.value)) {
      outer[componentName.value] = () => {
        return props.outer(props.value);
      };
    } else if (isArray(componentName.value)) {
      outer[componentName.value.join(".")] = () => {
        return props.outer(props.value);
      };
    }
  }

  return newProps;
}
