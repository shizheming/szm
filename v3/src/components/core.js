import { onMounted, reactive, watch, inject } from "vue";
import { forEach, isFunction } from "lodash";
export default function (props, w, componentType) {
  /* 接受form给的数据 */
  let isEdit = inject("isEdit");
  let detailData = inject("detailData");
  let isFinish = inject("isFinish");
  let outer = inject("outer");

  // 把change包一下，我要在里面更新数据
  let newProps = reactive({ ...props });
  newProps.onChange = (e) => {
    let nv;
    if (componentType === 'input') {
      nv = e.target.value;
    } else if (componentType === 'select') {
      nv = e
    }
    w.emit("update:value", nv);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  /* 进口处理 */
  // 判断是不是回显
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
              let r;
              if (isFunction(v)) {
                r = v();
              } else {
                r = v;
              }
              if (r instanceof Promise) {
                r.then((d) => {
                  newProps[k] = d;
                });
              } else {
                newProps[k] = r;
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
          let r;
          if (isFunction(v)) {
            r = v();
          } else {
            r = v;
          }
          if (r instanceof Promise) {
            r.then((d) => {
              newProps[k] = d;
            });
          } else {
            newProps[k] = r;
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

  /* 触发联动机制 */
  if (props.triggerAction) {
    watch(
      () => props.trigger,
      (newValue, oldValue) => {
        let obj = {};
        props.triggerAction(obj);
        forEach(obj, (v, k) => {
          let r;
          if (isFunction(v)) {
            r = v();
          } else {
            r = v;
          }
          if (r instanceof Promise) {
            r.then((d) => {
              newProps[k] = d;
            });
          } else {
            newProps[k] = r;
          }
        });
      }
    );
  }

  // outer函数
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
