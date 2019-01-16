<template>
<div>
    <div id="consumptionRecord"></div>
</div>
</template>
<script>
import echarts from 'echarts';
import 'echarts/theme/macarons';
import data from '../data/consumptionChart';
export default {
    data() {
        return {
            data
        };
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        var consumptionRecordChart = echarts.init(document.getElementById('consumptionRecord'), 'macarons');
        // 绘制图表
        consumptionRecordChart.setOption(this.data);

        window.onresize = function(){
            consumptionRecordChart.resize();
        }
    },
    components: {

    }
}
</script>
<style lang="scss">
#consumptionRecord {
    width: 100%;
    height: 600px;
}
</style>