// 主动与被动的关系
// trigger和change的关系
// 以后做完一个文件要回顾下知识点，意识到的点，和减少变量
// 每个组件自己的状态能自己记录后，怎么自动记录2个组件的某一个的状态，现在都是我们手动去操作的，以后如何变成自动的？
// fromRender6写一个只监听一次的的方法
// 动作-次数-对象，inner-options，trigger-once-options

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
  nextTick,
} from "vue";
import {
  forEach,
  tail,
  isArray,
  isFunction,
  drop,
  isString,
  isPlainObject,
  get,
  isObject,
} from "lodash";
import { display } from "./display";

export default function (props, emit, componentType, newSlots) {
  /********************** 接受form给的数据 **********************/
  const isEdit = inject("isEdit", undefined);
  const isDetail = inject("isDetail", undefined);
  const detailData = inject("detailData", undefined);
  const isFinish = inject("isFinish", undefined);
  const setDetail = inject("setDetail", undefined);
  const outer = inject("outer", undefined);
  const formData = inject("formData", undefined);
  const formComponents = inject("formComponents", {});
  const componentName = inject("componentName", undefined);

  /********************** 创建自己的数据，把所有的传进来的数据都变成自己的数据，接好 **********************/
  const attrs = useAttrs();
  const newProps = reactive({ ...props });
  const innerObj = reactive({});
  let componentNameStr;
  let emitType;

  if (isArray(componentName?.value)) {
    componentNameStr = componentName.value.join(".");
    formComponents[componentNameStr] = innerObj;
  } else if (isString(componentName?.value)) {
    componentNameStr = componentName.value;
    formComponents[componentName.value] = innerObj;
  }

  // 添加一些默认属性
  if (componentType === "input" || componentType === "inputNumber") {
    newProps.placeholder = "请输入";
  } else if (
    componentType === "select" ||
    componentType === "cascader" ||
    componentType === "treeSelect"
  ) {
    newProps.placeholder = "请选择";
  }

  // 统一emit事件
  if (componentType === "switch") {
    emitType = function (value) {
      emit("update:checked", value);
    };
  } else {
    emitType = function (value) {
      emit("update:value", value);
    };
  }

  // 继承下除change以外的事件
  forEach(attrs, (value, key) => {
    if (/on.*/.test(key) && key !== "onChange") {
      newProps[key] = value;
    }
  });

  //把change包一下，我要在里面更新数据，同时把formComponents传出去，打通表单内的所有数据
  newProps.onChange = function changeFun(...e) {
    let nv = e[0];
    if (componentType === "input" || componentType === "radioGroup") {
      nv = e[0].target.value;
    }
    emitType(nv);
    if (componentType === "select" || componentType === "cascader") {
      // 记录一下select和cascader当前选择的值
      if (componentNameStr) {
        formComponents[componentNameStr].current = e[1];
      }
    }
    if (attrs.onChange) {
      attrs.onChange(...e, formComponents, detailData?.value);
      // 记录上一次的值
      if (isPlainObject(props.record)) {
        if (componentType === "input") {
          props.record.prevValue = e[0].target.value;
        } else {
          props.record.prevValue = e[0];
        }
      }
    }
  };

  /********************** 监听各种值，自定义的，原来antd的 **********************/
  // 这里监听了attr属性
  // 除了自定义的属性，原始的antd的属性都要监听
  watchEffect(() => {
    forEach(attrs, (value, key) => {
      // 不需要监听trigger-xxxx，switch-xxx，和响应式数据，还有on事件
      if (
        !/^trigger-/.test(key) &&
        !/^switch-/.test(key) &&
        !/^on.*/.test(key)
      ) {
        newProps[key] = value;
      }
    });
    // 更新值，当用户主动设置，而不是通过change来触发的情况下
    newProps.value = props.value;
    newProps.checked = props.checked;
  });

  /********************** 初始化options **********************/
  if (
    componentType === "select" ||
    componentType === "cascader" ||
    componentType === "radioGroup" ||
    componentType === "checkboxGroup"
  ) {
    // 有初始options
    if (isFunction(attrs["inner-options"])) {
      attrs["inner-options"]().then((d) => {
        innerObj.optionsDetail = d;
        newProps.options = d;
      });
    }
  } else if (componentType === "treeSelect") {
    attrs["inner-tree-data"]().then((d) => {
      innerObj.treeDataDetail = d;
      newProps.treeData = d;
    });
  }

  /********************** 编辑页和详情页回显 **********************/
  if (isDetail || props.isDetail) {
    // 详情页样式修改
    newProps.disabled = true;
    newProps.bordered = false;
    newProps.showArrow = false;
    newProps.class = "formDetail";
    newProps.style = "margin:0";
    display(
      componentType,
      componentNameStr,
      setDetail,
      detailData,
      innerObj,
      props,
      emitType,
      newSlots,
      newProps
    );
  } else if (isEdit) {
    display(
      componentType,
      componentNameStr,
      setDetail,
      detailData,
      innerObj,
      props,
      emitType,
      newSlots,
      newProps
    );
  }

  /* 默认值 */
  // 绑定值有的情况下，不去设值默认值
  if (props.initialValue !== undefined && props.value === undefined) {
    emitType(props.initialValue);
  }

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
          isObject(props.trigger[index][0])
            ? props.trigger[index][0]
            : () => props.trigger[index][0],
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
                innerObj[`${k}Detail`] = v;
              }
            });
          }
        );
      });
    } else {
      // 监听单个
      watch(
        isObject(props.trigger[0]) ? props.trigger[0] : () => props.trigger[0],
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
              innerObj[`${k}Detail`] = v;
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
      let surplusArr = tail(key.split("-"));
      let name;
      let isOnce;
      if (surplusArr.length === 2) {
        name = surplusArr[1];
        if (surplusArr[0] === "once") {
          // 提取次数
          isOnce = true;
        }
      } else {
        name = surplusArr[0];
      }

      if (isArray(value[0])) {
        // 监听多个
        value.forEach((current, index) => {
          watch(
            isObject(attrs[key][index][0])
              ? attrs[key][index][0]
              : () => attrs[key][index][0],
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
                innerObj[`${name}Detail`] = result;
              }
            }
          );
        });
      } else {
        // 监听单个
        innerObj[key] = watch(
          isObject(attrs[key][0]) ? attrs[key][0] : () => attrs[key][0],
          (newValue, oldValue) => {
            let result = attrs[key][1](formComponents, detailData?.value);
            if (Object.prototype.toString.call(result) === "[object Promise]") {
              result.then((d) => {
                innerObj[`${name}Detail`] = d;
                newProps[name] = d;
                if (isOnce) {
                  innerObj[key]();
                }
              });
            } else {
              newProps[name] = result;
              innerObj[`${name}Detail`] = result;
              if (isOnce) {
                innerObj[key]();
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
          isObject(props.triggerclear[index][0])
            ? props.triggerclear[index][0]
            : () => props.triggerclear[index][0],
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
              innerObj[`${k}Detail`] = v;
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
              innerObj[`${k}Detail`] = v;
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
              innerObj[`${name}Detail`] = result;
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
              innerObj[`${name}Detail`] = result;
              newProps[name] = result;
            }
          }
        }
      );
    }
  });

  /* outer函数 */
  if (props.outer && outer) {
    if (componentNameStr) {
      outer[componentNameStr] = () => {
        return props.outer(formData);
      };
    }
  }

  return newProps;
}
