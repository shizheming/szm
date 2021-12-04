import { onMounted, reactive, watch, inject, onUnmounted } from "vue";
import { forEach, tail, isArray, isFunction, drop, isString } from "lodash";
export default function (props, attrs, componentType) {
  /* 接受form给的数据 */
  let formComponents = inject("formComponents");

  /* 把change包一下，我要在里面更新数据，同时把formComponents传出去，打通表单内的所有数据 */
  let newProps = reactive({ ...props });
  if (componentType === "button") {
    newProps.onClick = (e) => {
      if (props.onClick) {
        props.onClick(e, formComponents);
      }
    };
  }

  let innerObj = {};
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
  return newProps;
}
