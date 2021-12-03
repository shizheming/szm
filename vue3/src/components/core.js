import { onMounted, reactive, watch, inject, onUnmounted } from "vue";
import { forEach, tail, isArray, isFunction, drop, isString } from "lodash";
import { setLevelValue, getLevelValue } from "./tool";

export default function (props, emit, attrs, componentType) {
  /* 接受form给的数据 */
  let isEdit = inject("isEdit");
  let detailData = inject("detailData");
  let isFinish = inject("isFinish");
  let outer = inject("outer");
  let formData = inject("formData");
  let formComponents = inject("formComponents");
  let componentName = inject("componentName");
  /* 把change包一下，我要在里面更新数据，同时把formComponents, detailData传出去，打通表单内的所有数据 */
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
      props.onChange(e, formComponents, detailData.value);
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
  /* 添加默认值 */
  if (props.initialValue !== undefined) {
    emitType(props.initialValue);
  }

  let innerObj = {};
  if (isArray(componentName.value)) {
    formComponents[componentName.value.join(".")] = innerObj;
  } else {
    formComponents[componentName.value] = innerObj;
  }
  /* 进口处理，判断是不是回显*/
  if (isEdit) {
    // 这里主要是为了，不如有个input一开始是隐藏的，之后被显示，这个时候显示watch早就完成了，所以要自己触发回显
    if (isFinish.value) {
      if (props.inner) {
        let obj = {};
        if (props.inner.toString().includes("_next")) {
          props.inner(obj, detailData.value).then(() => {
            running(obj);
          });
        } else {
          props.inner(obj, detailData.value);
          running(obj);
        }
      }
      addEcho();
    }
    watch(
      () => isFinish.value,
      (newValue, oldValue) => {
        if (props.inner) {
          let obj = {};
          if (props.inner.toString().includes("_next")) {
            props.inner(obj, detailData.value).then(() => {
              running(obj);
            });
          } else {
            props.inner(obj, detailData.value);
            running(obj);
          }
        }
        addEcho();
      }
    );
  } else {
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
                obj[`${k}Detail`] = d;
                Object.assign(innerObj, obj);
                newProps[k] = d;
              });
            } else if (
              Object.prototype.toString.call(v) === "[object Promise]"
            ) {
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
            props.trigger[index][1](
              obj,
              /* 全部是实体 */ formComponents,
              detailData.value
            );
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
          props.trigger[1](
            obj,
            /* 全部是实体 */ formComponents,
            detailData.value
          );
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
    if (/^trigger-/.test(key)) {
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
                let result = attrs[key][index][1](
                  formComponents,
                  detailData.value
                );
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
              let result = attrs[key][1](formComponents, detailData.value);
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
  if (props.triggerclear) {
    // 判断是不是二维数组，知道是不是要监听多个值
    if (isArray(props.triggerclear[0])) {
      props.triggerclear.forEach((current, index) => {
        watch(
          () => props.triggerclear[index][0],
          (newValue, oldValue) => {
            drop(current).forEach((value, key) => {
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

  function running(obj) {
    forEach(obj, (v, k) => {
      if (k === "detail") {
        emitType(v);
      } else {
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
      }
    });
  }

  function addEcho() {
    /* 记录回显的值，这个值记录好就不变的，感觉的就是记录不同时间不同状态的各种值 */
    if (isArray(componentName.value)) {
      emit(
        "update:echoValue",
        getLevelValue(componentName.value.join("."), detailData.value)
      );
    } else {
      emit(
        "update:echoValue",
        getLevelValue(componentName.value, detailData.value)
      );
    }
  }
  return newProps;
}
