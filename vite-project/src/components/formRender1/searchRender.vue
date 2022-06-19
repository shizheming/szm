<script>
import AreaStreet from '@/components/areaStreet/areaSelect';
import WidgetCategory from '@/widgets/form/category';
import moment from 'moment';
import _ from '@/widgets/tool';

// 零食
import ManageApi from '@/api/order/manage';

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      // 零食
      bl: true
    };
  },
  props: ['formData', 'type'],
  watch: {},
  components: {
    AreaStreet,
    WidgetCategory
  },
  methods: {
    itemProps (current, addProps = {}) {
      return {
        props: {
          cols: current.cols || '24',
          label: current.label,
          ...addProps
        }
      };
    },
    baseProps (current, type) {
      var p = {
        input (current) {
          return {
            placeholder: current.placeholder,
            disabled: current.disabled
          };
        },
        select (current) {
          return {
            placeholder: current.placeholder,
            mode: current.mode,
            tokenSeparators: current.tokenSeparators,
            disabled: current.disabled,
            options: current.value,
            allowClear: true,
            showSearch: current.showSearch,
            filterOption: current.filterOption,
            getPopupContainer () {
              return document.querySelector('.ant-layout-content');
            }
          };
        },
        radio (current) {
          return {
            options: current.value
          };
        },
        textarea (current) {
          return {
            autosize: {
              minRows: 2,
              maxRows: 6
            }
          };
        },
        rangePicker (current) {
          return {
            showTime: true,
            format: 'YYYY-MM-DD HH:mm:ss'
          };
        },
        inputGroupSelect (current) {
          return {
            options: current.value,
            getPopupContainer () {
              return document.querySelector('.ant-layout-content');
            }
          };
        },
        inputGroupInput (current) {
          return {
            placeholder: _.maybe(current.input)
              .map((item) => item.placeholder)
              .join(undefined),
            disabled: _.maybe(current.input)
              .map((item) => item.disabled)
              .join(undefined)
          };
        },
        areaStreet (current) {
          return {
            placeholder: current.placeholder,
            defaultArea: current.initialValue || []
          };
        },
        category (current) {
          return {};
        },
        inputGroupMin (current) {
          return {
            placeholder: current.placeholder,
            disabled: current.disabled
          };
        },
        inputGroupMax (current) {
          return {
            placeholder: _.maybe(current.input)
              .map((item) => item.placeholder)
              .join(undefined),
            disabled: _.maybe(current.input)
              .map((item) => item.disabled)
              .join(undefined)
          };
        }
      };

      return p[type](current);
    },
    baseDecoratorOne (current, addProps = {}) {
      return [
        {
          name: 'decorator',
          value: [
            current.decorator,
            {
              rules: current.rules,
              initialValue: current.initialValue,
              ...addProps
            }
          ]
        }
      ];
    },
    baseDecorator (current, type) {
      var d = {
        input: (current) => {
          return this.baseDecoratorOne(current);
        },
        select: (current) => {
          return this.baseDecoratorOne(current);
        },
        radio: (current) => {
          return this.baseDecoratorOne(current);
        },
        textarea: (current) => {
          return this.baseDecoratorOne(current);
        },
        rangePicker: (current) => {
          return this.baseDecoratorOne(current);
        },
        inputGroupSelect: (current) => {
          return this.baseDecoratorOne(current, {
            initialValue: current.value[0].value
          });
        },
        inputGroupInput: (current) => {
          return this.baseDecoratorOne(current.input);
        },
        areaStreet: (current) => {
          return this.baseDecoratorOne(current);
        },
        category: (current) => {
          return this.baseDecoratorOne(current);
        },
        inputGroupMin: (current) => {
          return this.baseDecoratorOne(current);
        },
        inputGroupMax: (current) => {
          return this.baseDecoratorOne(current.input);
        }
      };

      return d[type](current);
    },
    componentsProps (current, type, addProps) {
      var p = this.baseProps(current, type);
      var d = this.baseDecorator(current, type);

      return {
        props: {
          ...p
        },
        directives: d
      };
    },
    componentsEvent (current, type) {
      return {
        change: () => {
          if (type === 'input') {
            this.inputChange(current.decorator);
          } else if (type === 'select') {
            this.selectChange(current.decorator);
          } else if (type === 'radio') {
            this.radioChange(current.decorator);
          } else if (type === 'textarea') {
            this.textareaChange(current.decorator);
          }
        },
        'area:change': (value) => {
          this.areaChange(value);
        }
      };
    },
    componentsAll (current, type = '', addProps) {
      type = type.split('|');
      var on =
        type.length === 2
          ? {
            [type[1]]: this.componentsEvent(current, type[0])[type[1]]
          }
          : {};

      return {
        ...this.componentsProps(current, type[0], addProps),
        on: {
          ...on
        }
      };
    },

    aInput (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-input {...this.componentsAll(current, 'input|change')} />
          </hm-form-item>
        )
      );
    },
    aSelect (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-select
              {...this.componentsAll(current, 'select|change')}
            ></a-select>
          </hm-form-item>
        )
      );
    },
    aRadio (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-radio-group
              {...this.componentsAll(current, 'radio|change')}
            ></a-radio-group>
          </hm-form-item>
        )
      );
    },
    aTextarea (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-textarea
              {...this.componentsAll(current, 'textarea|change')}
            ></a-textarea>
          </hm-form-item>
        )
      );
    },
    aRangePicker (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-range-picker
              {...this.componentsAll(current, 'rangePicker')}
              {...{
                style: {
                  width: '50%'
                },
                props: {
                  showTime: {
                    defaultValue: [
                      moment('00:00:00', 'HH:mm:ss'),
                      moment('23:59:59', 'HH:mm:ss')
                    ]
                  }
                }
              }}
            />
            <a-button
              style="margin-left: 10px;"
              onClick={() => this.getDay(-7, current.decorator)}
            >
              近7天
            </a-button>
            <a-button
              style="margin-left: 10px;"
              onClick={() => this.getDay(-30, current.decorator)}
            >
              近30天
            </a-button>
          </hm-form-item>
        )
      );
    },
    aInputGroup (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-input-group compact>
              <a-select
                {...this.componentsAll(current, 'inputGroupSelect')}
              ></a-select>
              <a-input
                {...this.componentsAll(current, 'inputGroupInput')}
                style={{position: 'absolute', width: '90%'}}
              />
            </a-input-group>
          </hm-form-item>
        )
      );
    },
    aArea (current) {
      var d = this.componentsAll(current, 'areaStreet|area:change');
      var acg = {
        directives: d.directives
      };

      delete d.directives;
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <AreaStreet {...d} />
            <div style="height: 0; overflow: hidden">
              <a-checkbox-group {...acg} />
            </div>
          </hm-form-item>
        )
      );
    },
    category (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <widget-category {...this.componentsAll(current, 'category')} />
          </hm-form-item>
        )
      );
    },
    sizeValue (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            <a-input-group compact>
              <a-input
                {...this.componentsAll(current, 'inputGroupMin')}
                style={{width: '30%', textAlign: 'center'}}
              />
              <a-input
                style={{
                  width: '30px',
                  borderLeft: '0',
                  pointerEvents: 'none',
                  backgroundColor: '#fff'
                }}
                placeholder="~"
                disabled
              />
              <a-input
                {...this.componentsAll(current, 'inputGroupMax')}
                style={{width: '30%', textAlign: 'center', borderLeft: '0'}}
              />
            </a-input-group>
          </hm-form-item>
        )
      );
    },
    areaChoose (current) {
      return (
        current.isShow !== false && (
          <hm-form-item
            {...this.itemProps(current)}
            {...{
              attrs: {
                'data-name': current['data-name']
              }
            }}
          >
            {current.value.map((item, idx) => {
              return (
                <a-select
                  class="areaChoose"
                  placeholder={item.placeholder}
                  getPopupContainer={() => {
                    return document.querySelector('.ant-layout-content');
                  }}
                  options={item.option}
                  allowClear={true}
                  v-decorator={[`${item.decorator}`]}
                  onChange={(a, option) => this.cityChange(a, idx, option)}
                ></a-select>
              );
            })}
          </hm-form-item>
        )
      );
    },

    inputChange (decorator) {
      this.$emit('inputChange', decorator);
    },
    selectChange (decorator) {
      this.$emit('selectChange', decorator);
    },
    radioChange (decorator) {
      this.$emit('radioChange', decorator);
    },
    textareaChange (decorator) {
      this.$emit('textareaChange', decorator);
    },
    areaChange (value) {
      // 这个自定义事件自己有值传进来
      this.$emit('areaChange', value);
    },
    areaChooseChange (decorator) {
      this.$emit('areaChooseChange', decorator);
    },

    isInput (current) {
      return current.type === 'input';
    },
    isSelect (current) {
      return current.type === 'select';
    },
    isRadio (current) {
      return current.type === 'radio';
    },
    isTextarea (current) {
      return current.type === 'textarea';
    },
    isArea (current) {
      return current.type === 'AreaStreet';
    },
    isRangePicker (current) {
      return current.type === 'rangePicker';
    },
    isInputGroup (current) {
      return current.type === 'inputGroup';
    },
    isFormSearch (current) {
      return this.type === 'search';
    },
    isCategory (current) {
      return current.type === 'category';
    },
    isInputGroupSizeValue (current) {
      return current.type === 'inputGroupSizeValue';
    },
    isAreaChoose (current) {
      return current.type === 'area';
    },

    // 暂时应急下，之后变城市组件
    cityChange (id, index, option) {
      // option是undefined说明是点了xx
      if (option === undefined) {
        this.formData
          .filter((item) => item.type === 'area')[0]
          .value.forEach((current, idx) => {
            if (idx > index && idx < 4) {
              this.form.setFieldsValue({
                [current.decorator]: undefined
              });
              current.option = [];
            }
          });
      } else this.getCity(id, index);
    },
    getCity (id, index) {
      if (this.bl && index == 0) {
        index = 0;
        this.bl = false;
      } else ++index;
      if (index > 3) return;
      var area = this.formData.filter((current) => current.type === 'area')[0]
        .value;

      return ManageApi.getCity(id).then((data) => {
        area[index].option = data.data.map((current) => {
          return {
            label: current.name,
            value: current.id
          };
        });
      });
    },

    getDay (day, name) {
      (this.f || this.form).setFieldsValue({
        [name]: [
          moment(_.getDay(day), 'YYYY-MM-DD'),
          moment().date(new Date().getDate() + 1)
        ]
      });
    },

    formSeachChunk (result) {
      // 表单搜索布局数据分类
      if (this.isFormSearch()) {
        // result = _.chunk(result, 3);
        result.forEach((current, index, arr) => {
          // arr[index] = <a-row>{current}</a-row>;
          arr[index] = current;
        });
      }
      return result;
    },
    orderChunk (data) {
      var newResult = [];
      var num = 0;
      var currentArr = [];

      data.forEach((current, index) => {
        var on = num;

        num += Number(current.cols || 24);

        if (num < 24) {
          currentArr.push(current);
          if (index === data.length - 1) newResult.push(currentArr);
        } else if (num == 24) {
          currentArr.push(current);
          newResult.push(currentArr);
          currentArr = [];
          num = 0;
        } else {
          newResult.push(currentArr);
          currentArr = [current];
          num = Number(num - on);
          if (index === data.length - 1) newResult.push(currentArr);
        }
      });
      return newResult;
    },
    r () {
      var result = [];
      var formData = this.orderChunk(this.formData);

      formData.forEach((item) => {
        var arr = [];

        item.forEach((current, index) => {
          var dom;

          if (this.isInput(current)) {
            dom = this.aInput(current);
          } else if (this.isSelect(current)) {
            dom = this.aSelect(current);
          } else if (this.isRadio(current)) {
            dom = this.aRadio(current);
          } else if (this.isTextarea(current)) {
            dom = this.aTextarea(current);
          } else if (this.isArea(current)) {
            dom = this.aArea(current);
          } else if (this.isRangePicker(current)) {
            dom = this.aRangePicker(current);
          } else if (this.isInputGroup(current)) {
            dom = this.aInputGroup(current);
          } else if (this.isCategory(current)) {
            dom = this.category(current);
          } else if (this.isInputGroupSizeValue(current)) {
            dom = this.sizeValue(current);
          } else if (this.isAreaChoose(current)) {
            dom = this.areaChoose(current);
          }
          arr.push(dom);
        });
        result.push(arr);
      });
      return this.formSeachChunk(result);
    },

    init (param) {
      param.forEach((current) => {
        current.format = current.format || _.identity;
      });
      // 请字典求地址
      // 还有种没有请求
      // 不同字典接口获取不同的key，和不同的数据结构
      // 我现在就遇到3种
      /*
                {
                    data: {
                        aaa: [],
                        bbb: [],
                        ...
                    }
                }
            */
      /*
                {
                    data: []
                }
            */
      /*
                {
                    data: {
                        list: []
                    }
                }
            */
      // 把数据分为请求和不请求的
      var paramPartition = _.partition(param, (v) => {
        return v.api;
      });

      var p = paramPartition[0].map((current) => current.api(current.data));

      Promise.all(p).then((dataAll) => {
        paramPartition[0].forEach((current, index) => {
          // 通过api来拿数据
          var d = current.format(_.maybe(dataAll[index].data).join());
          var getOption = _.curryRight(_.showInfoAll)((value) => {
            return value.map((item) => {
              let v = current.keyValue(item);

              if (_.isFunction(v.label)) {
                v.label = v.label();
              }
              return v;
            });
          });

          this.$nextTick(() => {
            current.setValue(() => {
              return getOption(this.formData, d);
            });
          });
        });
      });

      // 通过自己传入值来当数据
      paramPartition[1].forEach((current) => {
        let getOption = _.curryRight(_.showInfoAll)((value) => {
          return value.map((item) => {
            return current.keyValue(item);
          });
        });

        this.$nextTick(() => {
          current.setValue(() => {
            return getOption(this.formData, current.format());
          });
        });
      });
    },

    search () {
      this.$emit('searchSubmit', this.form.getFieldsValue());
    }
  },
  created () {
    // 里面调init
    // this.init(fff)
  },
  render (h) {
    return this.type === 'submit' ? (
      <a-form form={this.form} style="overflow: hidden;" class="epForm">
        {this.r()}
      </a-form>
    ) : (
      <hm-form-search
        class="epForm"
        form={this.form}
        {...{on: {submit: this.search}}}
      >
        {this.r()}
      </hm-form-search>
    );
  }
};
</script>
<style lang="less">
.epForm {
  .ant-form-item-label {
    width: 160px;
  }
  .areaChoose {
    width: 120px;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>