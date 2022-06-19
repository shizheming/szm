<script>
/* eslint-disable vue/require-valid-default-prop */
/*
    1。数据原生配置
    2。添加事件
    3。动态组件谓词函数
    4。component自定义配置组件
    5。myComponent页面级自定义组件
    6。search，form，detail三种状态
    7。添加componentData数据用于index.vue合component.js组件数据交互
*/
import _ from '@/widgets/tool';
import customComponent from './component.js';
import formSearch from './search.vue';
import formSubmit from './form.vue';
import formDetail from './detail.vue';
import {Form} from 'ant-design-vue';

export default {
  data () {
    return {
      form: '',
      s: [],
      // 这个给component.js里面的组件用的变量
      componentData: {},
      // 所有的组件不管是内部的还是外部的
      allComponent: customComponent
    };
  },
  components: {
    formSearch,
    formSubmit,
    formDetail
  },
  props: {
    type: {
      type: String,
      default: 'search'
    },
    source: {
      type: Array,
      default () {
        return [];
      }
    },
    initFetch: {
      type: Boolean,
      default () {
        return false;
      }
    },
    column: {
      type: Number,
      default () {
        return 3;
      }
    },
    p: {
      type: Object,
      default () {
        return {};
      }
    },
    init: {
      type: Array,
      default () {
        return [];
      }
    },
    // 这个适用于页面级别的自定义组件，通用的话可以写在component.js里面
    // 页面级别的自定义组件需要是对象属性的概念，不能直接当函数用，也不能绑在methods上面，this指向会错误，具体为什么要用对象包，不得而知（提示：箭头函数）
    myComponent: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    source () {
      this.defaultSource();
      this.initData();
      this.componentConfig();
    },
    init () {
      this.defaultSource();
      this.initData();
      this.componentConfig();
    }
  },
  created () {
    this.allComponent = {
      ...customComponent,
      ...this.myComponent
    };
    this.defaultSource();
    this.initData();
    this.componentConfig();
  },
  methods: {
    defaultSource () {
      this.s = _.cloneDeep(this.source);
      this.type !== 'detail' ? this.s.forEach((current, index, arr) => {
        current.label = _.isObject(current.label) ? current.label : {};
        current.value = _.isObject(current.value) ? current.value : {};
        current.value.props = _.isObject(current.value.props) ? current.value.props : {};
        current.value.directives = _.isArray(current.value.directives) ? current.value.directives : [];
        // 设置id方便寻找
        current.value.directives.forEach(item => {
          item.name === 'decorator' && (current.id = _.isArray(item.value) && item.value[0]);
        });
      }) : this.s.forEach((current, index, arr) => {
        current.label = _.isObject(current.label) ? current.label : {};
        current.value = _.isObject(current.value) ? current.value : {};
      });
    },
    defaultInit () {
      let cloneInit = _.clone(this.init);

      cloneInit = cloneInit.map(current => {
        return {
          api: _.isFunction(current.api) ? current.api : '',
          data: current.data ? current.data : '',
          fieldNames: _.isObject(current.fieldNames) ? current.fieldNames : null,
          format: _.isFunction(current.format) ? current.format : _.identity,
          optionName: current.optionName ? current.optionName : undefined
        };
      });
      return cloneInit;
    },
    // 回显数据
    initData () {
      /*
                select的options的获取方式
                1.静态数据直接在source里面的（不用处理）
                2.接口获取
                3.非接口获取
            */
      this.type !== 'detail' ? this.noDetailData() : this.detailData();
    },
    noDetailData () {
      // 把数据分为请求和不请求的
      let partition = _.partition(this.defaultInit(), (v) => {
        return v.api;
      });

      let p = partition[0].map(current => current.api(current.data));
      // 通过api来拿值

      Promise.all(p).then(dataAll => {
        partition[0].forEach((current, index) => {
          let d = current.format(_.maybe(dataAll[index].data).join());

          let b = _.curryRight(this.setOptions)(value => {
            return _.isArray(value) ? value.map(item => {
              return current.fieldNames
                ? {
                  label: _.isFunction(current.fieldNames.label) ? current.fieldNames.label(item) : item[current.fieldNames.label],
                  // value不传值就把整个对象扔上去
                  value: current.fieldNames.value === undefined ? JSON.stringify(item) : item[current.fieldNames.value]
                }
                : item;
            }) : {};
          })(this.s, d);

          b = this.setItsOptions(b, d, current.optionName);

          this.$nextTick(() => {
            this.$set(this.s, b);
          });
        });
      });
    },
    // 设置其他的接口需要回显的数据选项
    setItsOptions (data, ajaxDate, name) {
      data.forEach(current => {
        let key = current.value.directives.filter(item => item.name === 'decorator');

        key = key.length != 0 ? _.isArray(key[0].value) ? key[0].value[0] : '' : '';
        if (ajaxDate[key] && name) {
          current.value.props = {
            ...current.value.props,
            [name]: ajaxDate[key]
          };
        }
      });

      return data;
    },
    // 设置select或是checkbox的options
    setOptions (data, ajaxDate, fn) {
      data.forEach(current => {
        // eslint-disable-next-line no-mixed-operators
        // 这里的type是外面传进来的，我这里不能写死是select或是checkbox
        // 现在有个严重的bug就是你只能设置select和checkbox，其他组件的接口返回的选项数据就不能用了，比如select是tree的数据接口
        // eslint-disable-next-line no-mixed-operators
        if (current.value.type === 'select' && !current.value.props.value || current.value.type === 'checkbox' && !current.value.props.value) {
          let key = current.value.directives.filter(item => item.name === 'decorator');

          key = key.length != 0 ? _.isArray(key[0].value) ? key[0].value[0] : '' : '';
          if (ajaxDate[key]) {
            current.value.props.options = fn ? fn(ajaxDate[key]) : ajaxDate[key];
          }
        }
      });
      return data;
    },
    detailData () {
      // 把数据分为请求和不请求的
      let partition = _.partition(this.defaultInit(), (v) => {
        return v.api;
      });

      let p = partition[0].map(current => current.api(current.data));
      // 通过api来拿值

      Promise.all(p).then(dataAll => {
        partition[0].forEach((current, index) => {
          let d = current.format(_.maybe(dataAll[index].data).join());
          let s = this.setDetail(this.s, d);

          this.$set(this.s, s);
        });
      });
    },
    // 详情页回显数据
    setDetail (data, ajaxDate) {
      let result = [];

      data.forEach(current => {
        let v = ajaxDate[current.value.key];

        // 处理key的层级
        let dot = current.value.key ? current.value.key.split('.') : [];

        let r = dot.reduce((a, b) => {
          return a.map(current => {
            return current ? current[b] : '';
          });
        }, _.maybe(ajaxDate));

        current.value.value = _.isFunction(current.value.customRender) ? current.value.customRender.bind(this)(v) : r.join();
        result.push(current);
      });
      return result;
    },
    // 动态设置某个组件的数据
    setComponent (decorator, fn) {
      if (_.isArray(decorator)) {
        decorator.forEach(current => {
          this.displayComponent(current, fn);
        });
      } else if (_.isString(decorator)) this.displayComponent(decorator, fn);
    },
    displayComponent (decorator, fn) {
      // 是因为各种数据的操作都在一个总的数据源上所以牵一发而动全身吗？如果我把数据分成每个组件独立的，我改的时候是改那个单独的数据，而不是this.s这个总的数据，我猜测就不会有之前的显示影藏造成的数据丢失和组件接口重复请求了
      if (this.s.some((current, index, arr) => {
        if (current.id === decorator) {
          fn(current);
          return true;
        } else {
          return false;
        }
      })) {
        let t = this.s;

        this.s = [];
        this.s = t;

        this.$set(this.s, this.s);
        this.$forceUpdate();
      }
    },
    // 添加谓词函数
    componentConfig () {
      _.forEach(this.allComponent, current => {
        this[`is${current.name}`] = function (item) {
          return item.value.type === current.name;
        };
      });
    },
    // 避免复制vonode节点
    clone (data) {
      Object.keys(data).forEach((current, key) => {
        if (_.isObject(data[current])) {
          data[current] = !data[current].tag ? this.clone({...data[current]}) : data[current];
        } else if (_.isArray(data[current])) {
          data[current] = this.clone([...data[current]]);
        }
      });
      return data;
    },
    renderComponent (fn = _.identity) {
      let cName = Object.keys(this.allComponent);
      let nc = [];

      this.s.forEach(item => {
        cName.some(current => {
          if (this[`is${this.allComponent[current].name}`](item)) {
            item = this.clone({...item});
            // vnode不能用这个方法克隆
            // item = _.cloneDeep(item);
            // 删除type，以免再帮到组件上的时候和自带的type冲突
            delete item.value.type;

            this.addOn(item);

            if (item.isShow !== false) {
              nc.push(fn(this.allComponent[current].bind(this, item.value), item));
            }
            return true;
          }
        });
      });
      return nc;
    },
    // 添加自定义事件
    addOn (item) {
      // 单个组件
      if (item.value.event) {
        this.getOn(item.value);
      } else {
        // 多个组件
        for (let key in item.value) {
          let current = item.value[key];

          if (_.isObject(current) && _.isArray(current.event)) {
            this.getOn(current);
          }
        }
      }
    },
    getOn (item) {
      this.type !== 'detail' ? this.noDetailOn(item) : this.detailOn(item);
    },
    noDetailOn (item) {
      let o = {};
      let decoratorName = item.directives.filter(current => current.name === 'decorator')[0].value[0];

      item.event.forEach(current => {
        o[current] = (...val) => {
          this.$emit.apply(this, [`${decoratorName}:${current}`].concat(val));
        };
      });
      item.on = o;
    },
    detailOn (item) {
      let o = {};

      item.event.forEach(current => {
        o[current] = (...val) => {
          this.$emit.apply(this, [`${item.key}:${current}`].concat(val));
        };
      });
      item.on = o;
    },
    r () {
      let d = {
        props: {
          source: this.s || [],
          p: this.p,
          initFetch: this.initFetch
        }
      };

      if (this.type === 'search') {
        return <formSearch {...d}></formSearch>;
      } else if (this.type === 'submit') {
        return <formSubmit {...d}></formSubmit>;
      } else if (this.type === 'detail') {
        d.props.column = this.column;
        return <formDetail {...d}></formDetail>;
      }
    }
  },
  render (h) {
    return this.r();
  }
};
</script>