已经封装过的组件
a-button
a-cascader
a-checkbox
a-checkbox-group
a-date-picker
a-range-picker
a-form
a-radio
a-radio-group
a-rate
a-time-picker
a-time-range-picker
a-tree-select
a-input
a-input-number
a-input-search
a-select
a-switch

组件优化的地方（不是核心，只是为了方便而写的）
datePicker和timePicker组件默认输出的是时间戳，后端要的秒的形式
rangePicker组件默认输出的是时间戳，后端要的秒的形式，在原来绑定的key上加了start和end
如你绑定的key是time，最后输出的是2个字段time_start和time_end
input都加了叉叉删除按钮
textarea添加了自适应高度，叉叉删除按钮
select添加了搜索功能，叉叉删除按钮
treeSelect添加了叉叉，全部展开

button默认primary类型

悟出一个道理
html是肉体
数据是灵魂