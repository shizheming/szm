<template>
    <div>
        hi
        <div id="consumptionRecord"></div>
        123
    </div>
</template>

<script>
import echarts from 'echarts';


export default {
    data () {
        return {
            option: {
                title: {
                    text: '2018年消费记录',
                    subtext: '2017年人民币兑美元平均汇率 1:6.7518'
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    type: 'bar',
                    data: [1304, 3118, 7890, 7816, 4239, 4540, 8853, 15993, 7935, 20568, 27906, 0],
                }]
            }
        };
    },
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('consumptionRecord'));
        // 绘制图表
        myChart.setOption(this.option);
    },
    components: {

    }
}
</script>

<style>
    #consumptionRecord {
        width: 100%;
        height: 600px;
    }
</style>
