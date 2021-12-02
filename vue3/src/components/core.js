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
              if (isFunction(v) && v.toString().includes("_next")) {
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
            if (isFunction(v) && v.toString().includes("_next")) {
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
  if (props.triggeraction) {
    watch(
      () => props.trigger,
      (newValue, oldValue) => {
        let obj = {};
        props.triggeraction(
          obj,
          /* 全部是实体 */ formComponents,
          detailData.value
        );
        forEach(obj, (v, k) => {
          if (isFunction(v) && v.toString().includes("_next")) {
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

  /* 具名的触发机制 */
  forEach(attrs, (value, key) => {
    if (/^triggeraction-/.test(key)) {
      let [name] = tail(key.split("-"));
      let n = name[0].toUpperCase() + name.slice(1);
      watch(
        () => props[`trigger${n}`],
        (newValue, oldValue) => {
          if (attrs[`triggeraction-${name}`] === "inner") {
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
            let result = attrs[`triggeraction-${name}`](
              formComponents,
              detailData.value
            );
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

  /* 联动关系清除值或属性 */
  if (props.triggerclear) {
    watch(
      () => props.triggerclear[0],
      (newValue, oldValue) => {
        drop(props.triggerclear).forEach((value, key) => {
          if (value === "value" && newValue === undefined) {
            emitType(undefined);
          } else {
            newProps[value] = undefined;
          }
        });
      }
    );
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
        if (isFunction(v) && v.toString().includes("_next")) {
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
