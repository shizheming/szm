import { onMounted, reactive, watch, inject } from "vue";
import { forEach, tail, isArray, isFunction } from "lodash";
export default function (props, attrs) {
  let newProps = reactive({ ...props });

  /* 进口处理*/
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
          if (isFunction(result) && result.toString().includes("_next")) {
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

  return newProps;
}
