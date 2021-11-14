// 状态
import {isPlainObject, isArray, isString, forEach, isFunction, isBoolean, last} from 'lodash';
import {toArr, addBe, render} from './tool';
import {relation} from './relationship';

export const simpleState = function (data, args) {
  const methods = relation.getObj();
  const relationData = relation.getRelation();
  const {name, relationship} = data;

  let result = methods[name](...args);
  // 用户关系表返回的格式是个对象key组件value状态，这样的样子
  // 
  /* 
    多对多的情况现在也仅限于displayCurrentShow这个状态，stateName如果是多个的话，其他的都应用到当前显示的那个组件上面
    {
      componentName:xxxx,
      stateName:[xxxxx,xxxxxx]
    }
  */
  //  用户name函数返回的状态结果
  /* 
    返回一对多的状态关系
    {
      componentName:{
        stateName1:value,
        stateName2:value
      }
    }
*/
  const toArrResult = toArr(result);

  log(data, 301);
  relationData[name] = result;
  relationData[name].be = 'state';
  /* if (type === 'isShow') {
    let stateList = displayStateType('isShow');
    // 单个显示隐藏
    let dom = [];

    if (relationData[components]) {
      let result = relationData[components].result.filter(current => {
        return !current.includes(last(dom[0]));
      });

      relationData[components] = {
        ...relationData[components],
        result: result.concat(dom)
      };
    } else { 
      relationData[components] = {
        be: 'state',
        result: dom
      };
    }
    relationship && lastResult.push(render(relationship, [dom]));
  } else if (type === 'isEdit') {

  } else if (type === 'isRequired') {
    let stateList = displayStateType('isRequired');
    let dom = [];

    // originalResult结果可能是一个布尔值也有可能是一个对象，那么就同时components这个key来拿值
    dom.push([components, 
      isString(originalResult)
        ? displayState(originalResult)
        : isArray(originalResult[components])
          ? originalResult[components].filter(current => stateList.includes(current))[0]
          : originalResult[components],
      type]);
    if (relationData[components]) {
      let result = relationData[components].result.filter(current => {
        return !current.includes(last(dom[0]));
      });

      relationData[components] = {
        ...relationData[components],
        result: result.concat(dom)
      };
    } else {
      relationData[components] = {
        be: 'state',
        result: dom
      };
    }

    relationship && lastResult.push(render(relationship, [dom]));
  } else if (type === 'displayCurrentShow') {
    let dom = [];
    let [stateLeft, stateRight] = stateType(type);

    components.split('-').forEach(current => {
      if (isPlainObject(originalResult)) {
        if (current === originalResult[current]) {
          dom.push([current, stateLeft, type]);
        } else {
          dom.push([current, stateRight, type]);
        }
      } else if (isString(originalResult)) {

      }
    });
    relationData[name] = {
      be: 'state',
      result: dom
    };
  } else if (type === 'displayCurrentEdit') {

  } else if (type === 'multiple') {
    let dom = [];
    // multiple的嵌套状态
    let innerState = [];

    components.forEach(({relationship, component, state}) => {
      // 单个
      if (isString(state)) {
        simpleState({
          name,
          type: state,
          components: component
        }, args);
      } else if (isArray(state)) {
        // 判断数组里面有没有isShow,isEdit,isRequired这些基础状态，如果有的话就说明有自定义函数依附在基础状态上运行
          
        // state数组里面没有基础状态
        // 直接运行自定义组件，或者是个key，要在obj对象上找
        let re = isPlainObject(originalResult) ? originalResult[component] : originalResult;

        state.forEach(current => {
          if (isStateTrue(current)) {
            let baseState = state.filter(current => isStateTrue(current));
            let noBaseState = state.filter(current => !isStateTrue(current));
            // 把基础状态都排除出去

            baseState.forEach(current => {
              simpleState({
                name,
                type: current,
                components: component
              }, args);
            });
            // 不是基础的状态就吐出去
            noBaseState.forEach(item => {
              if (isPlainObject(re)) {
                if (isFunction(item) && item.name === re[item]) {
                  relationData[component] = {
                    be: 'state',
                    result: [[component, re[item], type]]
                  };
                } else if (isString(item) && item === re[item]) {
                  if (relationData[component]) {
                    relationData[component] = {
                      be: 'state',
                      result: relationData[component].result.concat([[component, re[item], type]])
                    };
                  } else {
                    relationData[component] = {
                      be: 'state',
                      result: [[component, re[item], type]]
                    };
                  }
                }
              } else if (isString(re)) {
                if (isFunction(item) && item.name === re) {
                  relationData[component] = {
                    be: 'state',
                    result: [[component, re, type]]
                  };
                } else if (isString(item) && item === re) {
                  relationData[component] = {
                    be: 'state',
                    result: [[component, re, type]]
                  };
                }
              }
            });
          } else {
            if (isFunction(current) && current.name === re) {
              relationData[component] = {
                be: 'state',
                result: [[component, re, type]]
              };
            } else if (isString(current) && current === re) {
              relationData[component] = {
                be: 'state',
                result: [[component, re, type]]
              };
            }
          }
        });
        // 这个是添加multiple的result，而上面那些是components里面每个自己的result
        innerState.push(component);
        relationship && lastResult.push(render(relationship, []));
      }
    });
    if (relationData[name]) {
      relationData[name].result.push([[...new Set(innerState)], 'multiple']);
    } else {
      relationData[name] = {
        be: 'state',
        result: [[[...new Set(innerState)], 'multiple']]
      };
    }
  }
  return toArr(lastResult); */
};

// 显示哪种状态
const displayState = function (state) {
  return {
    show: 'show',
    hide: 'hide',
    able: 'able',
    disabled: 'disabled',
    required: 'required',
    notRequired: 'notRequired'
  }[state];
};

// 显示那种类型的状态
const displayStateType = function (type) {
  return {
    isShow: ['show', 'hide'],
    isEdit: ['able', 'disabled'],
    isRequired: ['required', 'notRequired']
  }[type];
};

// 判断状态
const isStateTrue = function (current) {
  return current === 'isShow' || current === 'isEdit' || current === 'isRequired' || current === 'displayCurrentShow';
};

const stateType = function (type) {
  return {
    isShow: ['show', 'hide'],
    isEdit: ['able', 'disabled'],
    isRequired: ['required', 'notRequired'],
    displayCurrentShow: ['show', 'hide'],
    displayCurrentEdit: ['able', 'disabled'],
    multiple: 'multiple'
  }[type];
};

// component和state属性单个的时候是字符串，多个的时候是数组，我需要统一成多，也就是数组，这样不用写逻辑的时候每个地方都去判断

function isShowState () {

}