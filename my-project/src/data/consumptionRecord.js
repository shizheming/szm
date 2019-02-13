export default {
    option: {
        title: {
            text: '',
            subtext: '',
            textStyle: {
                fontSize: 12
            }
        },
        legend: {
            data: ['吃饭', '用品'],
            icon: "circle",
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            x: 50,
            y: 60,
            x2: 0,
            y2: 20,
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: {
            type: 'bar',
            data: [],
        }
    },
    data: {
        2017: {
            title: {
                text: '2018年消费记录（2017年人民币兑美元平均汇率 1:6.7518）',
                subtext: '2018年消费总额：11W',
            },
            series: {
                data: [1304, 11647, 6743, 6816, 5439, 3823, 8850, 10231, 5935, 20840, 22202, 11563],
            }
        },
        2018: {
            title: {
                text: '2019年消费记录（2018年人民币兑美元平均汇率 xxxx）',
                subtext: '2019年消费总额：13423',
            },
            series: {
                data: [13423],
            }
        }
    },
    year: '',
    map: '',
}