import Area from '@/widgets/form/area';

export default {
  // input框
  input (data) {
    return <a-input allow-clear={true} {...data}/>;
  },
  // input数值框
  inputNumber (data) {
    return <a-input-number style={{width: '100%'}} {...data}/>;
  },
  // select选择器
  select (data) {
    return <a-select allowClear={true} {...data}/>;
  },
  // 日期区间选择器
  rangePicker (data) {
    return <a-range-picker {...data} />;
  },
  // 日期选择器
  datePicker (data) {
    return <a-date-picker {...data} />;
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
  area (data) {
    // 固定数据省市区 treeDate
    return <Area {...data} />;
  },
  inputPs (data) {
    return (
      <div style={{position: 'relative'}}>
        <a-input allow-clear={true} {...data} style={{display: 'inline-block'}}/>
        <span style={{color: '#999', position: 'absolute', right: '-410px', width: '400px'}}>{data.props.ps}</span>
      </div>
    );
  },
  checkboxAll (data) {
    return <hm-checkbox-all {...data}/>;
  },
};