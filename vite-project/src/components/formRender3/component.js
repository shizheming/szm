// 地址选择器
import AreaStreet from '@/components/areaStreet/areaSelect';
import AreaChoose from '@/widgets/form/areaChoose.vue';
import Area from '@/widgets/form/area';
import Area3 from '@/widgets/form/area3';
import UploaderImg from '@/widgets/form/uploaderImg';
import {Sketch} from 'vue-color';
import moment from 'moment';
import goodsComponnents from './goodsComponents';
import outerSelectCenter from './outerSelectCenter';

function getD (day) {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds);

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();

  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + '-' + tMonth + '-' + tDate;
}

function doHandleMonth (month) {
  var m = month;

  if (month.toString().length == 1) {
    m = '0' + month;
  }
  return m;
}

export default {
  ...goodsComponnents,
  ...outerSelectCenter,
  // input框
  input (data) {
    return <a-input allow-clear={true} {...data}/>;
  },
  // input数值框
  inputNumber (data) {
    return <a-input-number {...data}/>;
  },
  // select选择器
  select (data) {
    return <a-select allowClear={true} {...data}/>;
  },
  // 带select选择器的input框
  selectInput (data) {
    return <a-input-group {...data.group}>
      <a-select {...data.select}></a-select>
      <a-input {...data.input} allow-clear={true}/>
    </a-input-group>;
  },
  // 日期区间选择器
  rangePicker (data) {
    return <a-range-picker {...data} />;
  },
  // 日期区间选择器带7天和30天
  rangePickerClick (data) {
    let {directives: [name]} = data;
    let getDay = (day) => {
      this.form.setFieldsValue({
        [name.value[0]]: [moment(getD(day), 'YYYY-MM-DD'), moment().date(new Date().getDate() + 1)]
      });
    };

    return (
      <div>
        <a-range-picker {...data} />
        <a-button
          style="margin-left: 10px;"
          onClick={() => getDay(-7)}
        >近7天
        </a-button>
        <a-button
          style="margin-left: 10px;"
          onClick={() => getDay(-30)}
        >近30天
        </a-button>
      </div>
    );
  },
  // 日期选择器
  datePicker (data) {
    return <a-date-picker {...data} />;
  },
  // 带2个的input框-最小值-最大值
  inputInput (data) {
    return <a-input-group {...data.group}>
      <a-input {...data.inputLeft}/>
      <a-input {...data.inputMiddle}/>
      <a-input {...data.inputRight}/>
    </a-input-group>;
  },
  // 带2个的input框-最小值-最大值
  inputInputNumber (data) {
    return <a-input-group {...data.group}>
      <a-input-number {...data.inputLeft}/>
      <a-input-number {...data.inputMiddle}/>
      <a-input-number {...data.inputRight}/>
    </a-input-group>;
  },
  // 颜色设置
  inputColor (data) {
    let g = this.form.getFieldsValue([data.directives[0].value[0]])[data.directives[0].value[0]];

    if (this.componentData.inputColorVisibile === undefined) {
      // 初始数据
      this.$set(this.componentData, 'inputColorVisibile', false);
      this.$set(this.componentData, 'cacheColor', '');
      this.$set(this.componentData, 'color', {
        hex: '#194d33',
        hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
        hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
        rgba: {r: 25, g: 77, b: 51, a: 1},
        a: 1
      });
    }
    if (this.componentData.cacheColor || g) {
      this.$set(this.componentData, 'color', this.componentData.cacheColor || g);
    }
        
    data.icon && (data.icon.on = {
      click: () => {
        this.$set(this.componentData, 'inputColorVisibile', !this.componentData.inputColorVisibile);
      }
    });
    return <div>
      <a-input {...{
        ...data,
        scopedSlots: {
          addonAfter: () => {
            return <a-icon type="setting" {...data.icon} />;
          }
        }
      }}></a-input>
      {this.componentData.inputColorVisibile && <Sketch
        value={this.componentData.color}
        onInput={(val) => {
          this.componentData.cacheColor = val;
          this.form.setFieldsValue({
            [data.directives[0].value[0]]: val.hex
          });
        }}
      />}
    </div>;
  },
  // 4个select的地址选择
  areaChoose (data) {
    return <AreaChoose {...data}/>;
  },
  // 地址选择器
  areaStreet (data) {
    return <AreaStreet {...data}/>;
  },

  area3 (data) {
    return <Area3 {...data}/>;
  },
  // 单项选择器
  radio (data) {
    return <a-radio-group {...data}/>;
  },
  checkbox (data) {
    return <a-checkbox-group {...data} />;
  },
  // 文本框
  textarea (data) {
    return <a-textarea {...data}/>;
  },
  span (data) {
    return <span {...data}>{data.value}</span>;
  },
  spanButton (data) {
    let b = {
      on: data.on
    };

    delete data.on;
    return <span {...data}>{data.value}<a-button {...b}>修改</a-button></span>;
  },
  treeselect (data) {
    // 自定义treeSelect数据
    return <a-tree-select showSearch={true} treeNodeFilterProp="title" {...data}></a-tree-select>;
  },
  area (data) {
    // 固定数据省市区 treeDate
    return <Area {...data} />;
  },

  uploaderImg (data) {
    return <UploaderImg {...data}/>;
  },

  aa () {
    return 99;
  }
    
};