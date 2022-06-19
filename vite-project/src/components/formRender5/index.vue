<script>
/* 
总结：词汇
面向对象-面向组件
对象-属性
存在-非存在（显示-隐藏）
动静
一多-数量-关系（单个没有关系，多个才有关系）
时空（位置-前后-顺序）
运动
还有些组件状态的变化，虽然自己也会变，但和自己没有太大关系了，这是不是有点矛盾
比如分销的订单审核会与普通订单的审核字段显示有变化，差不多这意思
方案就是data-name取个名字，然后就是听从政府安排，政府的方法在入口调用，不同的入口，反正这些逻辑不在自己组件里面，
主次

  -触发-主动-被动-如何触发-行为-动作
  关系-联动-组合-

  变得原因都是数据驱动的，数据是第一动力，什么数据，就是组件数据，哪个？绑定的那个key
  变了后全部运动一下
  有些是全部运动，有些是条件运动，条件运动如何可能
组

  注意点：
    1.主动设的时候要先有个那个key才能找到，比如说设置options，那么配置表里面必须先有个options的可以才行，不然不知道往什么地方丢
    3.配置对象.形式都是对象没有数组
    4.一个组件里面的私有属性都是唯一的，如果不是唯一的就会出问题，我现在没有处理这个，如何label里面有个_options，contnet里面也有个_options，就会出问题，我现在默认都是在自己的组件里面私有属性明都是唯一的
    5.主动调显示隐藏方法在_isShow函数组件上无效，他的权限高，其他属性也是一样
  问题：
    3.组的数据格式变了，那么groupMethods文件里面的方法也要全部重写
    4.如果是组件里面的一个option的显示隐藏怎么办？好像没有实现，说好的什么都能写呢。。。。。。
    7.组件的位置，slot的位置
  组件渲染方式：所有动态写法的自定义函数，同步函数没写触发条件的，每次数据变化都会调用，异步函数没写触发条件，初始化会调用，组变化了也会调用，有触发条件的异步同步函数都会在触发条件成立的情况下调用

  现在每个item就是一个组件，组件本身是个相对小的整体，那么比他大的整体是什么，是表单，整体和局部的关系，整体如何控制局部，局部反应整体
  比如果表单有个方法能控制所有item的所有状态，一起变
*/
import methods from './methods';
import props from './props';
import init from './init';
import {isFunction} from 'lodash';

export default {
  data () {
    return {
      // 表单要提交的值
      formData: {},
      // 存一下用户表单的key，回显用
      userFormDataKey: undefined,
      // 复制的上一次表单的数据，用来和当前数据比对看看有没有变化，相当于watch
      cloneFormData: {},
      // 用户配置表里面所有的绑定的那个key值
      sourceKeys: this.source.map(({content: {key}}) => key),
      // 复制的上一次组的数据，用来和当前数据比对看看有没有变化，只用于组的显示的时候操作初始化异步函数
      cloneGroupSource: [],
      // 判断是不是在调用回显
      isEcho: false
    };
  },
  props,
  created () {
    // 初始化用户的formData表单数据
    this.sourceToFormData();
    // 初始化组对象
    this.groupSource.forEach(current => {
      // 初始显示
      // 默认给他加上true
      if (current.isShow === undefined && !isFunction(current._isShow)) current.isShow = true;
    });
    // 这种要更group联系在一起，如果group有的话
    this.runGroup();
    this.runAsync();
  },
  methods: {
    ...init,
    ...methods
  },
  render () {
    let {formSubmit, formData, renderDom, submitButton, leftCol} = this;
    let submitButtonStyle = {};

    if (this.column > 1) {
      submitButtonStyle = {
        width: `${100 / this.column}%`,
      };
    }

    // 这里运行组函数，不应该放在渲染每一个组件的函数中，因为组是把组件包进去
    this.runGroup();
    return (
      <a-form-model
        ref='formComponent'
        class='hm-form'
        model={formData}
      >
        {this.$scopedSlots.head && this.$scopedSlots.head()}
        {renderDom()}
        {this.$scopedSlots.foot && this.$scopedSlots.foot()}
        {
          submitButton &&
          <div style={submitButtonStyle}>
            <a-form-model-item wrapper-col={{offset: leftCol}} >
              <a-button type='primary' onClick={() => formSubmit()}>提交</a-button>
            </a-form-model-item>
          </div>
        }
      </a-form-model>
    );
  }
};
</script>