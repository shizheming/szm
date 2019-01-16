export default {
    title: {
        text: '2018年消费记录（2017年人民币兑美元平均汇率 1:6.7518）',
        subtext: '2018年消费总额：11W',
        textStyle: {
            fontSize: 12
        }
    },
    legend: {
        data: ['吃饭', '用品']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params, ticket, callback) {
            var result = '';
            var monthlyConsumption = 0;
            params.forEach((a) => {
                if (a.value) {
                    result += a.seriesName + ':' + a.value + '<br>';
                    monthlyConsumption += a.value;
                }
            });
            return result + '总额：' + monthlyConsumption;
        }
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
        name: '吃饭',
        type: 'bar',
        stack: '总量',
        data: [997, 1422, 1740, 1176, 2132, 1132, 2328, 2767, 1461, 1866, 1613, 2971],
    }, {
        name: '用品',
        type: 'bar',
        stack: '总量',
        data: [307, 1725, 3650, 2960, 1003, 2691, 3020, 3281, 2950, 3857, 4997, 4233],
    }, {
        name: '娃娃',
        type: 'bar',
        stack: '总量',
        data: [, , 1353],
    }, {
        name: '红包',
        type: 'bar',
        stack: '总量',
        data: [, 8500],
    }, {
        name: '医院',
        type: 'bar',
        stack: '总量',
        data: [, , , 2680, 1104, , , 634, 146, 1380, 6117],
    }, {
        name: '泰迪熊吊饰',
        type: 'bar',
        stack: '总量',
        data: [, , , , 1200],
    }, {
        name: '乐高泰姬陵',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , 3502],
    }, {
        name: '海尔洗衣机',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , 1699],
    }, {
        name: '宽带',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , 1850],
    }, {
        name: '小米手机',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , 1378],
    }, {
        name: '苹果手机',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , 10999, 1799],
    }, {
        name: '保友座椅',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , 2738],
    }, {
        name: '爱多多喜饼',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , , 6486],
    }, {
        name: 'bobot扫地机器人',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , , 1190],
    }, {
        name: '戴尔显示器',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , , , 1499],
    }, {
        name: '小孩金器',
        type: 'bar',
        stack: '总量',
        data: [, , , , , , , , , , , 2860],
    }]
};