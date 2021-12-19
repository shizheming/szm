import {
  onMounted,
  reactive,
  watch,
  inject,
  onUnmounted,
  useAttrs,
  watchEffect,
  isRef,
  isReactive,
} from "vue";
import {
  forEach,
  tail,
  isArray,
  isFunction,
  drop,
  isString,
  get,
} from "lodash";

export default function (props, emit, componentType) {
  const attrs = useAttrs();
  /* 接受form给的数据 */
  let isEdit = inject("isEdit", undefined);
  let detailData = inject("detailData", undefined);
  let isFinish = inject("isFinish", undefined);

  let outer = inject("outer", undefined);
  let formData = inject("formData", undefined);
  let formComponents = inject("formComponents", undefined);
  let componentName = inject("componentName", undefined);
  /* 把change包一下，我要在里面更新数据，同时把formComponents传出去，打通表单内的所有数据 */
  let newProps = reactive({ ...props });
  forEach(attrs, (value, key) => {
    // 不需要监听trigger-xxxx，switch-xxx，和响应式数据
    if (
      !/^trigger-/.test(key) &&
      !/^switch-/.test(key) &&
      !isRef(value) &&
      !isReactive(value)
    ) {
      newProps[key] = value;
    }
  });
  // 监听原来的属性，不直接丢上去，因为不是一个值的入口，还有trigger-xxxx值的入口，我要自己接，然后处理好放上去
  watchEffect(() => {
    forEach(attrs, (value, key) => {
      // 不需要监听trigger-xxxx，switch-xxx，和响应式数据
      if (!/^trigger-/.test(key) && !/^switch-/.test(key)) {
        if (isRef(value) || isReactive(value)) {
          newProps[key] = value;
        }
      }
    });
  });
  newProps.onChange = (...e) => {
    let nv = e[0];
    if (componentType === "input" || componentType === "radioGroup") {
      nv = e[0].target.value;
      emit("update:value", nv);
    } else if (componentType === "radio" || componentType === "checkbox") {
      nv = e[0].target.checked;
      emit("update:checked", nv);
    } else if (componentType === "switch") {
      emit("update:checked", nv);
    } else {
      emit("update:value", nv);
    }
    if (attrs.onChange) {
      attrs.onChange(...e, formComponents, detailData?.value);
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
  let componentNameStr;
  if (isArray(componentName?.value)) {
    componentNameStr = componentName.value.join(".");
    formComponents[componentNameStr] = innerObj;
  } else if (isString(componentName?.value)) {
    componentNameStr = componentName.value;
    formComponents[componentName.value] = innerObj;
  }

  /* 进口处理，判断是不是回显*/
  if (isEdit) {
    // 这里主要是为了，不如有个input一开始是隐藏的，之后被显示，这个时候显示watch早就完成了，所以要自己触发回显
    if (isFinish?.value) {
      if (props.inner) {
        let obj = {};
        if (props.inner.toString().includes("_next")) {
          props.inner(obj, detailData?.value).then(() => {
            running(obj);
          });
        } else {
          props.inner(obj, detailData?.value);
          running(obj);
        }
      }
    }
    watch(
      () => isFinish?.value,
      (newValue, oldValue) => {
        if (props.inner) {
          let obj = {};
          if (props.inner.toString().includes("_next")) {
            props.inner(obj, detailData?.value).then(() => {
              running(obj);
            });
          } else {
            props.inner(obj, detailData?.value);
            running(obj);
          }
        } else {
          // 没有就直接往上面设值
          emitType(get(detailData?.value.data, componentNameStr));
        }
      }
    );
  } else {
    if (props.inner) {
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
    }
  }

  /* 初始化单个属性 */
  forEach(attrs, (value, key) => {
    if (/^inner-/.test(key)) {
      if (isFunction(value)) {
        let [name] = tail(key.split("-"));
        value().then((d) => {
          innerObj[`${name}Detail`] = d;
          newProps[name] = d;
        });
      }
    }
  });

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
              detailData?.value
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
            detailData?.value
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
    // 现在没有switch不是监听的，只是组件初始的时候，就定型了，中间改变没有效果，看看需不需要变成监听的？？？？？？？？？？？？
    // 还有就是switch现在只有trigger的开关，其他一把的属性需不需要开关，有待思考？？？？？？？？？？？？？？？？？？？？
    // 然后不能写函数，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
    if (/^trigger-/.test(key) && attrs[`switch-${key}`] !== false) {
      let [name] = tail(key.split("-"));
      if (isArray(value[0])) {
        // 监听多个
        value.forEach((current, index) => {
          watch(
            () => attrs[key][index][0],
            (newValue, oldValue) => {
              let result = attrs[key][index][1](
                formComponents,
                detailData?.value
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
              let result = attrs[key][1](formComponents, detailData?.value);
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
          // 全由全无没有加开关switch？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
          // 这个判断不对，不只有两个值，可以是n个值？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
          // 还有就是，现在没有单个属性的全有和全无？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
          newValue[0] !== undefined &&
          newValue[1] !== undefined &&
          newValue[0] !== "" &&
          newValue[1] !== ""
        ) {
          let obj = {};
          props.togetherhas[1](
            obj,
            /* 全部是实体 */ formComponents,
            detailData?.value
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
          props.togethernohas[1](
            obj,
            /* 全部是实体 */ formComponents,
            detailData?.value
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
            let result = attrs[key][1](formComponents, detailData?.value);
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

  /* 同时满足没有的条件具名属性监听 */
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
            let result = attrs[key][1](formComponents, detailData?.value);
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
  if (props.outer && outer) {
    outer[componentNameStr] = () => {
      return props.outer(props.value);
    };
  }

  function running(obj) {
    forEach(obj, (v, k) => {
      if (k === "detail") {
        // 之后加一个独立的innerData来单独处理数据？？？？？？？？？？？？？？？？？？？？？？
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
  return newProps;
}
